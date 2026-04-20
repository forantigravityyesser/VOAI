-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create Enums
DO $$ BEGIN
    CREATE TYPE public.subscription_tier AS ENUM ('Free', 'Pro', 'Business');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Profiles Table (linking to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  subscription_tier public.subscription_tier DEFAULT 'Free',
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_owner_access" ON public.profiles;
CREATE POLICY "profiles_owner_access" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- 2. Shops Table
CREATE TABLE IF NOT EXISTS public.shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  api_key_base TEXT,
  api_key_statistic TEXT,
  service_secret TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "shops_owner_access" ON public.shops;
CREATE POLICY "shops_owner_access" ON public.shops
  FOR ALL USING (auth.uid() = user_id);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  nm_id BIGINT,
  vendor_code TEXT,
  subject_id INT,
  brand TEXT,
  title TEXT,
  base_price DECIMAL,
  current_discount INT,
  kiz_marked BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "products_owner_access" ON public.products;
CREATE POLICY "products_owner_access" ON public.products
  FOR ALL USING (EXISTS (SELECT 1 FROM public.shops WHERE shops.id = shop_id AND shops.user_id = auth.uid()));

-- 4. Warehouse Stocks Table
CREATE TABLE IF NOT EXISTS public.warehouse_stocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  warehouse_name TEXT,
  quantity INT DEFAULT 0,
  in_way_to_client INT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.warehouse_stocks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stocks_owner_access" ON public.warehouse_stocks;
CREATE POLICY "stocks_owner_access" ON public.warehouse_stocks
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.shops s ON p.shop_id = s.id
    WHERE p.id = product_id AND s.user_id = auth.uid()
  ));

-- 5. Financial Reports Table
CREATE TABLE IF NOT EXISTS public.financial_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  rrd_id BIGINT,
  sale_date DATE,
  revenue DECIMAL(12,2),
  commission DECIMAL(12,2),
  logistics_cost DECIMAL(12,2),
  storage_cost DECIMAL(12,2),
  penalties DECIMAL(12,2),
  net_profit DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reports_owner_access" ON public.financial_reports;
CREATE POLICY "reports_owner_access" ON public.financial_reports
  FOR ALL USING (EXISTS (SELECT 1 FROM public.shops WHERE shops.id = shop_id AND shops.user_id = auth.uid()));

-- 6. Knowledge Base Table
CREATE TABLE IF NOT EXISTS public.knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1024),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. AI Insights Cache Table
CREATE TABLE IF NOT EXISTS public.ai_insights_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  context_hash TEXT NOT NULL,
  insight_text TEXT,
  embedding vector(1024),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.ai_insights_cache ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "insights_owner_access" ON public.ai_insights_cache;
CREATE POLICY "insights_owner_access" ON public.ai_insights_cache
  FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_metadata ON public.products USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_reports_sale_date ON public.financial_reports (sale_date);

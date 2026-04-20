import { NextResponse } from 'next/server';
import { createClient } from '@insforge/sdk';

/**
 * Generator for the "UrbanTech" Demo Brand (Electronics & Accessories).
 * Creates a mathematically consistent 90-day simulation of a seller's life 
 * with built-in "pains" (high logistics due to localization, low buyout, etc.)
 */
export async function GET() {
  try {
    const insforge = createClient({
      baseUrl: 'https://m732ftc9.eu-central.insforge.app',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4MDF9.f0zWDGkuE44vD0FKMkKGt5jbIXfqUX3wYNoQb5UipRQ'
    });

    const now = new Date();

    // =========================================================================
    // 1. CONTENT & CATALOG (content/v2/get/cards/list)
    // 15 SKUs. 3 hits, 5 mid, 7 low. Pair of items with dimension errors.
    // =========================================================================
    const skuCards = [
      // --- HITS ---
      { id: "SKU-URB-ROUTER-01", name: "Роутер UrbanTech Wi-Fi 6", segment: "Scale", price: 3500, dimensions: { l: 20, w: 15, h: 5 } },
      { id: "SKU-URB-HEADP-01", name: "Беспроводные наушники Pro", segment: "Scale", price: 2900, dimensions: { l: 10, w: 10, h: 5 } }, // The one with buyout issues
      { id: "SKU-URB-CBLE-01", name: "Магнитный кабель Type-C", segment: "Scale", price: 800, dimensions: { l: 15, w: 5, h: 2 } },
      
      // --- MID ---
      { id: "SKU-URB-PWB-01", name: "PowerBank 20000mAh", segment: "Optimize", price: 2500, dimensions: { l: 15, w: 7, h: 3 } },
      { id: "SKU-URB-CHG-01", name: "Быстрая зарядка 65W GaN", segment: "Optimize", price: 1800, dimensions: { l: 5, w: 5, h: 10 } },
      // ERROR in dimensions: 1000cm instead of 10cm! AI will catch this.
      { id: "SKU-URB-MSE-01", name: "Мышь беспроводная Silent", segment: "Optimize", price: 1200, dimensions: { l: 1000, w: 6, h: 4 } }, 
      { id: "SKU-URB-STND-01", name: "Подставка для ноутбука", segment: "Optimize", price: 1600, dimensions: { l: 30, w: 25, h: 2 } },
      { id: "SKU-URB-HBM-01", name: "USB Хаб 7-в-1", segment: "Optimize", price: 2100, dimensions: { l: 12, w: 4, h: 2 } },

      // --- LOW LIQUIDITY ---
      { id: "SKU-URB-ADPT-01", name: "Переходник HDMI-VGA", segment: "Eliminate", price: 400, dimensions: { l: 5, w: 5, h: 2 } },
      { id: "SKU-URB-LTG-01", name: "Кольцевая лампа", segment: "Eliminate", price: 1100, dimensions: { l: 30, w: 30, h: 5 } }, // ERROR: Volume is huge
      { id: "SKU-URB-MCR-01", name: "Микрофон петличка", segment: "Eliminate", price: 700, dimensions: { l: 8, w: 4, h: 2 } },
      { id: "SKU-URB-CLNR-01", name: "Набор для чистки клавиатуры", segment: "Eliminate", price: 350, dimensions: { l: 15, w: 5, h: 5 } },
      { id: "SKU-URB-PAD-01", name: "Коврик для мыши XXL", segment: "Eliminate", price: 900, dimensions: { l: 90, w: 40, h: 0.5 } },
      { id: "SKU-URB-WBC-01", name: "Веб-камера 1080p", segment: "Eliminate", price: 2300, dimensions: { l: 120, w: 8, h: 5 } }, // ERROR in dimensions (120cm)
      { id: "SKU-URB-KEY-01", name: "Клавиатура мембранная", segment: "Eliminate", price: 950, dimensions: { l: 45, w: 15, h: 3 } },
    ];

    // =========================================================================
    // 2. SALES FUNNEL (api/analytics/v3/sales-funnel)
    // Analytics for the last week/period. Highlighting the headset bad buyout.
    // =========================================================================
    const funnelData = skuCards.map(sku => {
      let openCount = Math.floor(Math.random() * 5000) + 1000;
      let addToCartPercent = 10 + Math.random() * 15;
      let buyoutPercent = 85 + Math.random() * 10;

      if (sku.id === "SKU-URB-HEADP-01") {
        openCount = 45000; // Super high traffic
        addToCartPercent = 25; // Good cart addition
        buyoutPercent = 40; // HORRIBLE buyout (The pain point!)
      } else if (sku.segment === "Eliminate") {
        openCount = Math.floor(Math.random() * 500) + 100;
        buyoutPercent = 70 + Math.random() * 10;
      }

      return {
        nmID: sku.id,
        openCount,
        addToCartCount: Math.floor((openCount * addToCartPercent) / 100),
        ordersCount: Math.floor((openCount * addToCartPercent * 0.4) / 100),
        buyoutPercent: Math.round(buyoutPercent * 10) / 10
      };
    });

    // =========================================================================
    // 3. LOGISTICS & ORDERS (FBS/FBO)
    // 1000 orders inside the last 3 days. Inject imeiInvalidFormat errors.
    // =========================================================================
    const orders = [];
    for (let i = 0; i < 1000; i++) {
        const isErrorOrder = i < 5; // First 5 are error
        const skuInfo = isErrorOrder ? skuCards[0] : skuCards[Math.floor(Math.random() * skuCards.length)]; // Routers have IMEI
        
        orders.push({
            orderId: `ORD-${now.getTime() - i * 10000}`,
            barcode: skuInfo.id,
            status: isErrorOrder ? "declined" : "delivered",
            metadata: isErrorOrder ? { error: "imeiInvalidFormat", message: "Invalid IMEI tag for electronics category" } : {},
            price: skuInfo.price,
            warehouseId: Math.random() > 0.45 ? "Коледино" : "Тула", // 45% localization!
            date: new Date(now.getTime() - Math.random() * 100000000).toISOString()
        });
    }

    // =========================================================================
    // 4. FINANCIAL PNL (reportDetailByPeriod)
    // Target: ~15 million revenue in 90 days.
    // PNL must reflect 45% Localization Index (IL) -> KTR = 2.0 -> Overpaying logistics by ~240k
    // =========================================================================
    const history90Days = [];
    let cumulativeRevenue = 0;
    
    // We want 15M over 90 days. Average is ~166,000 per day.
    const averageDailyRev = 166000;

    for (let i = 0; i < 90; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - (89 - i));
        
        const noise = (Math.random() - 0.5) * 50000;
        const trend = i * 500;
        
        const dailyRev = averageDailyRev + noise + trend;
        cumulativeRevenue += dailyRev;

        // COGS ~ 35%
        const cogs = dailyRev * 0.35;
        // Commission ~ 15%
        const commission = dailyRev * 0.15;
        
        // Logistics Base ~ 10%
        const baseLogistics = dailyRev * 0.10;
        
        // The Pain Point: KTR = 2.0 due to 45% IL. Logistics cost doubles!
        const actualLogistics = baseLogistics * 2.0; 

        // Internal Ads ~ 8%
        const ads = dailyRev * 0.08;

        const profit = dailyRev - cogs - commission - actualLogistics - ads;

        history90Days.push({
            date: d.toISOString().split('T')[0],
            revenue: Math.round(dailyRev),
            profit: Math.round(profit),
            logistics: Math.round(actualLogistics),
            logisticsOverpay: Math.round(actualLogistics - baseLogistics), // Hidden metric for AI to expose
            localizationIndex: 45
        });
    }

    const totalLogisticsOverpay = history90Days.slice(-30).reduce((sum, day) => sum + day.logisticsOverpay, 0); 
    // Approximately ~240,000 to ~250,000 extra cost per month

    const financialReport = {
        period: "Last 90 Days",
        totalRevenue: Math.round(cumulativeRevenue),
        history: history90Days,
        currentLocalizationIndex: 45,
        ktrCoefficient: 2.0,
        monthlyLogisticsOverpay: Math.round(totalLogisticsOverpay) // e.g. ~240,000
    };

    // =========================================================================
    // 5. AUTO CAMPAIGNS (adv/v1/auto)
    // One specific campaign is burning budget (DRR > 35%)
    // =========================================================================
    const autoCampaigns = [
      { id: "CAMP-9-ROUTER", name: "Автокампания - Wi-Fi Роутеры", status: "active", spend: 120000, revenue: 950000, drr: 12.6, sku: "SKU-URB-ROUTER-01" },
      { id: "CAMP-9-CABLE", name: "Магнитные кабели Поиск", status: "active", spend: 45000, revenue: 520000, drr: 8.6, sku: "SKU-URB-CBLE-01" },
      // The Pain Point!
       { id: "CAMP-9-BAD-MOUSE", name: "Мыши Silent (Широкий Авто)", status: "active", spend: 154000, revenue: 410000, drr: 37.5, sku: "SKU-URB-MSE-01" }
    ];

    // =========================================================================
    // SAVE ALL TO INSFORGE DATABASE `demo_fixtures`
    // =========================================================================

    const saveFixture = async (endpoint: string, data: unknown) => {
        const { data: existing } = await insforge.database.from('demo_fixtures').select('id').eq('endpoint', endpoint).single();
        if (existing) {
            await insforge.database.from('demo_fixtures').update({ data, updated_at: now.toISOString() }).eq('id', existing.id);
        } else {
            await insforge.database.from('demo_fixtures').insert([{ endpoint, data }]);
        }
    };

    await Promise.all([
        saveFixture('content/v2/get/cards/list', skuCards),
        saveFixture('api/analytics/v3/sales-funnel/products', funnelData),
        saveFixture('api/v3/orders', orders),
        saveFixture('api/v5/supplier/reportDetailByPeriod', financialReport),
        saveFixture('adv/v1/auto', autoCampaigns)
    ]);

    return NextResponse.json({ 
        success: true, 
        message: 'Legend "UrbanTech" mathematical model injected successfully into InsForge DB.',
        brandTheme: "UrbanTech",
        overpayCheck: totalLogisticsOverpay
    });

  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

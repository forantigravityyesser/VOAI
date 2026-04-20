import { insforge } from '@/lib/insforge';

export const apiInterceptor = {
  /**
   * Universal fetcher that acts as an interceptor.
   * If the user is in demo mode, it fetches fixtures from InsForge DB.
   * Otherwise, it would fetch from real Wildberries API.
   */
  async fetch<T>(endpoint: string, realApiCall?: () => Promise<T>): Promise<T> {
    try {
      // 1. Get current authenticated user
      const { data: { user } } = await insforge.auth.getUser();

      // For unauthenticated users or local dev without session, we might default to demo mode
      // Let's assume we fallback to demo mode
      let isDemoMode = true;

      if (user) {
        // 2. Check user profile for demo mode status
        const { data: profile } = await insforge.database.from('profiles')
          .select('is_demo_mode')
          .eq('id', user.id)
          .single();

        if (profile !== null && profile.is_demo_mode !== undefined) {
           isDemoMode = profile.is_demo_mode;
        }
      }

      // 3. Routing (Interceptor Logic)
      if (isDemoMode) {
        console.log(`[Interceptor] Demo Mode active. Fetching fixture for ${endpoint}`);
        const { data: fixture, error: dbError } = await insforge.database.from('demo_fixtures')
          .select('data')
          .eq('endpoint', endpoint)
          .single();

        if (dbError || !fixture) {
          console.warn(`[Interceptor] Missing fixture for ${endpoint}. Fallback required.`);
          // If no fixture exists, we throw error or return empty object
          throw new Error('Fixture not found');
        }

        return fixture.data as T;
      }

      // 4. Real Call (if demo mode is off)
      console.log(`[Interceptor] Real Mode active. Sending request to WB API...`);
      if (realApiCall) {
         return await realApiCall();
      }

      throw new Error("Real API call is not implemented for this endpoint yet.");
    } catch (e) {
      console.error(`[Interceptor] Error fetching ${endpoint}:`, e);
      throw e;
    }
  }
};

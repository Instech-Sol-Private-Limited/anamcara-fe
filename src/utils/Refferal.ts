import supabase from '../config/supabase';

export interface ReferralData {
    id: string;
    referrer_id: string;
    referred_id: string;
    referral_code: string;
    created_at: string;
    updated_at: string;
    referred_user?: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}

export interface ReferralStats {
    referralCode: string;
    totalReferrals: number;
}

class ReferralService {
    // Generate referral link
    generateReferralLink(referralCode: string): string {
        const baseUrl = typeof window !== 'undefined' 
            ? window.location.origin 
            : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        
        return `${baseUrl}/auth/register?ref=${referralCode}`;
    }

    // Get referral stats for a user using the new view
    async getReferralStats(userId: string): Promise<ReferralStats | null> {
        try {
            const { data, error } = await supabase
                .from('referral_stats')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('Error fetching referral stats:', error);
                return null;
            }

            return {
                referralCode: data.referral_code || '',
                totalReferrals: data.total_referrals || 0
            };
        } catch (error) {
            console.error('Unexpected error fetching referral stats:', error);
            return null;
        }
    }

    // Get user's referrals with details
    async getUserReferrals(userId: string, limit: number = 10): Promise<ReferralData[]> {
        try {
            const { data, error } = await supabase
                .from('referrals')
                .select(`
                    *,
                    referred_user:profiles!referrals_referred_id_fkey(
                        id,
                        email,
                        first_name,
                        last_name
                    )
                `)
                .eq('referrer_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching user referrals:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Unexpected error fetching user referrals:', error);
            return [];
        }
    }

    // Create a referral when someone signs up with a referral code
    async createReferral(referralCode: string, referredUserId: string): Promise<boolean> {
        try {
            // Use the database function to process referral
            const { data, error } = await supabase
                .rpc('process_referral', {
                    p_referral_code: referralCode,
                    p_referred_user_id: referredUserId
                });

            if (error) {
                console.error('Error creating referral:', error);
                return false;
            }

            return !!data;
        } catch (error) {
            console.error('Unexpected error creating referral:', error);
            return false;
        }
    }

    // Validate referral code
    async validateReferralCode(referralCode: string): Promise<boolean> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('referral_code', referralCode)
                .single();

            return !error && !!data;
        } catch (error) {
            console.error('Error validating referral code:', error);
            return false;
        }
    }

    // Get referral code from URL params
    getReferralCodeFromUrl(): string | null {
        if (typeof window === 'undefined') return null;
        
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('ref');
    }

    // Store referral code in localStorage for later use
    storeReferralCode(referralCode: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('referral_code', referralCode);
        }
    }

    // Get stored referral code
    getStoredReferralCode(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('referral_code');
        }
        return null;
    }

    // Clear stored referral code
    clearStoredReferralCode(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('referral_code');
        }
    }

    // Ensure user has a referral code (useful for existing users)
    async ensureUserHasReferralCode(userId: string): Promise<string | null> {
        try {
            const { data, error } = await supabase
                .rpc('ensure_user_has_referral_code', { user_id: userId });

            if (error) {
                console.error('Error ensuring referral code:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Unexpected error ensuring referral code:', error);
            return null;
        }
    }
}

const referralService = new ReferralService();
export default referralService;
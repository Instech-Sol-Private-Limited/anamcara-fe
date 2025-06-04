// utils/anamcoins.ts
import supabase from "../config/supabase";

export interface AnamCoinsData {
    id: string;
    user_id: string;
    total_coins: number;
    available_coins: number; // coins that can be spent
    spent_coins: number; // coins already spent
    created_at: string;
    updated_at: string;
}

export interface AnamCoinsHistory {
    id: string;
    user_id: string;
    coins_earned: number;
    coins_spent: number;
    transaction_type: 'earned' | 'spent' | 'redeemed';
    description: string;
    soulpoints_used?: number; // for redemption transactions
    created_at: string;
}

export interface RedemptionResponse {
    success: boolean;
    message: string;
    data?: {
        coinsEarned: number;
        soulpointsUsed: number;
        newSoulpointsBalance: number;
        newAnamCoinsBalance: number;
    };
}

class AnamCoinsService {
    // Conversion formula: 100 SP = 5 AC (1 SP = 0.05 AC)
    private readonly SP_TO_AC_RATIO = 0.05;
    private readonly MINIMUM_SP_FOR_REDEMPTION = 100;

    // Get user's AnamCoins data
    async getUserAnamCoins(userId: string): Promise<{success: boolean, data?: AnamCoinsData, error?: string}> {
        try {
            const { data, error } = await supabase
                .from('anamcoins')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error fetching AnamCoins:', error);
                return { success: false, error: error.message };
            }

            // If no record exists, create one
            if (!data) {
                const newRecord = await this.createAnamCoinsRecord(userId);
                if (newRecord.success) {
                    return { success: true, data: newRecord.data };
                }
                return { success: false, error: newRecord.error };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error in getUserAnamCoins:', error);
            return { success: false, error: 'Failed to fetch AnamCoins data' };
        }
    }

    // Create initial AnamCoins record for new user
    private async createAnamCoinsRecord(userId: string): Promise<{success: boolean, data?: AnamCoinsData, error?: string}> {
        try {
            const { data, error } = await supabase
                .from('anamcoins')
                .insert({
                    user_id: userId,
                    total_coins: 0,
                    available_coins: 0,
                    spent_coins: 0
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating AnamCoins record:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error in createAnamCoinsRecord:', error);
            return { success: false, error: 'Failed to create AnamCoins record' };
        }
    }

    // Get AnamCoins transaction history
    async getAnamCoinsHistory(userId: string, limit: number = 20): Promise<{success: boolean, data: AnamCoinsHistory[], error?: string}> {
        try {
            const { data, error } = await supabase
                .from('anamcoins_history')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching AnamCoins history:', error);
                return { success: false, data: [], error: error.message };
            }

            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Error in getAnamCoinsHistory:', error);
            return { success: false, data: [], error: 'Failed to fetch history' };
        }
    }

    // Calculate how many AnamCoins can be earned from SoulPoints
    calculateAnamCoinsFromSoulPoints(soulpoints: number): number {
        const eligibleSP = Math.floor(soulpoints / this.MINIMUM_SP_FOR_REDEMPTION) * this.MINIMUM_SP_FOR_REDEMPTION;
        return Math.floor(eligibleSP * this.SP_TO_AC_RATIO);
    }

    // Calculate maximum SoulPoints that can be redeemed
    calculateMaxRedeemableSoulPoints(soulpoints: number): number {
        return Math.floor(soulpoints / this.MINIMUM_SP_FOR_REDEMPTION) * this.MINIMUM_SP_FOR_REDEMPTION;
    }

    // Redeem SoulPoints for AnamCoins
    async redeemSoulPointsForAnamCoins(userId: string, soulpointsToRedeem: number): Promise<RedemptionResponse> {
        try {
            // Validate redemption amount
            if (soulpointsToRedeem < this.MINIMUM_SP_FOR_REDEMPTION) {
                return {
                    success: false,
                    message: `Minimum ${this.MINIMUM_SP_FOR_REDEMPTION} SoulPoints required for redemption`
                };
            }

            if (soulpointsToRedeem % this.MINIMUM_SP_FOR_REDEMPTION !== 0) {
                return {
                    success: false,
                    message: `SoulPoints must be in multiples of ${this.MINIMUM_SP_FOR_REDEMPTION}`
                };
            }

            // Get current user soulpoints
            const { data: soulpointsData, error: spError } = await supabase
                .from('soulpoints')
                .select('points')
                .eq('user_id', userId)
                .single();

            if (spError) {
                return { success: false, message: 'Failed to fetch current SoulPoints' };
            }

            if (!soulpointsData || soulpointsData.points < soulpointsToRedeem) {
                return { success: false, message: 'Insufficient SoulPoints balance' };
            }

            // Calculate AnamCoins to earn
            const coinsToEarn = Math.floor(soulpointsToRedeem * this.SP_TO_AC_RATIO);

            // Start transaction
            const { data, error } = await supabase.rpc('redeem_soulpoints_for_anamcoins', {
                p_user_id: userId,
                p_soulpoints_to_redeem: soulpointsToRedeem,
                p_anamcoins_to_earn: coinsToEarn
            });

            if (error) {
                console.error('Redemption error:', error);
                return { success: false, message: 'Redemption failed. Please try again.' };
            }

            return {
                success: true,
                message: `Successfully redeemed ${soulpointsToRedeem} SoulPoints for ${coinsToEarn} AnamCoins!`,
                data: {
                    coinsEarned: coinsToEarn,
                    soulpointsUsed: soulpointsToRedeem,
                    newSoulpointsBalance: soulpointsData.points - soulpointsToRedeem,
                    newAnamCoinsBalance: data?.new_anamcoins_balance || 0
                }
            };

        } catch (error) {
            console.error('Error in redeemSoulPointsForAnamCoins:', error);
            return { success: false, message: 'An unexpected error occurred' };
        }
    }

    // Spend AnamCoins (for purchases, etc.)
    async spendAnamCoins(userId: string, amount: number, description: string): Promise<{success: boolean, message: string}> {
        try {
            // Get current balance
            const balanceResult = await this.getUserAnamCoins(userId);
            if (!balanceResult.success || !balanceResult.data) {
                return { success: false, message: 'Failed to fetch current balance' };
            }

            if (balanceResult.data.available_coins < amount) {
                return { success: false, message: 'Insufficient AnamCoins balance' };
            }

            // Execute spending transaction
            const { error } = await supabase.rpc('spend_anamcoins', {
                p_user_id: userId,
                p_amount: amount,
                p_description: description
            });

            if (error) {
                console.error('Spending error:', error);
                return { success: false, message: 'Failed to process transaction' };
            }

            return { 
                success: true, 
                message: `Successfully spent ${amount} AnamCoins on ${description}` 
            };

        } catch (error) {
            console.error('Error in spendAnamCoins:', error);
            return { success: false, message: 'An unexpected error occurred' };
        }
    }

    // Get conversion rates and info
    getConversionInfo() {
        return {
            spToAcRatio: this.SP_TO_AC_RATIO,
            minimumSpForRedemption: this.MINIMUM_SP_FOR_REDEMPTION,
            anamcoinsPerMinimumRedemption: this.MINIMUM_SP_FOR_REDEMPTION * this.SP_TO_AC_RATIO
        };
    }
}

export default new AnamCoinsService();
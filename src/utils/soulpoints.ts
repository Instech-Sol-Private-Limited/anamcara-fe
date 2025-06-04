// utils/soulpoints.ts
import supabase from "../config/supabase";

export interface AnamcoinsData {
  id: string;
  user_id: string;
  balance: number;
  total_earned: number;
  created_at: string;
  updated_at: string;
}

export interface AnamcoinsHistory {
  id: string;
  user_id: string;
  action: string;
  amount: number;
  description: string;
  created_at: string;
}

export interface SoulpointsData {
  id: string;
  user_id: string;
  points: number;
  level: number;
  soul_title: string;
  created_at: string;
  updated_at: string;
  ranking?: number;
}

export interface SoulpointsHistory {
  id: string;
  user_id: string;
  action: string;
  points_earned: number;
  description: string;
  created_at: string;
}

export interface UserStats {
  points: number;
  level: number;
  soul_title: string;
  ranking: number;
  anamcoin_balance: number;        
  anamcoin_total_earned: number;  
  total_threads: number;
  total_comments: number;
  badges_count: number;
  next_level_points: number;       
  progress_to_next_level: number;  
}
export interface AllUserBadges {
  badge_id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  background: string;
  category: string;
  is_achieved: boolean;
  is_active: boolean;
  achieved_at: string | null;
}


export async function getUserSoulpoints(userId: string): Promise<{
  success: boolean;
  data: SoulpointsData | null;
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('soulpoints')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return {
      success: true,
      data: data || null
    };
  } catch (error: any) {
    console.error('Error fetching soulpoints:', error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
}


export async function getSoulpointsHistory(userId: string, limit: number = 10): Promise<{
  success: boolean;
  data: SoulpointsHistory[];
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('soulpoints_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      data: data || []
    };
  } catch (error: any) {
    console.error('Error fetching soulpoints history:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}


export async function getUserStats(userId: string): Promise<{
  success: boolean;
  data: UserStats | null;
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .rpc('get_user_stats', { p_user_id: userId });

    if (error) throw error;

    return {
      success: true,
      data: data[0] || null
    };
  } catch (error: any) {
    console.error('Error fetching user stats:', error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
}


export async function getSoulpointsLeaderboard(limit: number = 100): Promise<{
  success: boolean;
  data: any[];
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('user_soulpoints_ranking')
      .select('*')
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      data: data || []
    };
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}


export async function awardSoulpoints(
  userId: string, 
  points: number, 
  action: string, 
  description?: string
): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const { error } = await supabase
      .rpc('add_soulpoints', {
        p_user_id: userId,
        p_points: points,
        p_action: action,
        p_description: description
      });

    if (error) throw error;

    return {
      success: true,
      message: `Awarded ${points} soulpoints successfully`
    };
  } catch (error: any) {
    console.error('Error awarding soulpoints:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getUserAnamcoins(userId: string): Promise<{
  success: boolean;
  data: AnamcoinsData | null;
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('anamcoins')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return {
      success: true,
      data: data || null
    };
  } catch (error: any) {
    console.error('Error fetching anamcoins:', error);
    return {
      success: false,
      data: null,
      message: error.message
    };
  }
}

export async function getAnamcoinsHistory(userId: string, limit: number = 10): Promise<{
  success: boolean;
  data: AnamcoinsHistory[];
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('anamcoins_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      data: data || []
    };
  } catch (error: any) {
    console.error('Error fetching anamcoins history:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}

export async function spendAnamcoins(
  userId: string, 
  amount: number, 
  action: string, 
  description?: string
): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .rpc('spend_anamcoins', {
        p_user_id: userId,
        p_amount: amount,
        p_action: action,
        p_description: description
      });

    if (error) throw error;

    return {
      success: data, // The function returns boolean
      message: data ? 'Anamcoins spent successfully' : 'Insufficient balance'
    };
  } catch (error: any) {
    console.error('Error spending anamcoins:', error);
    return {
      success: false,
      message: error.message
    };
  }
}


export async function getAnamcoinsLeaderboard(limit: number = 100): Promise<{
  success: boolean;
  data: any[];
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('anamcoin_leaderboard')
      .select('*')
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      data: data || []
    };
  } catch (error: any) {
    console.error('Error fetching anamcoin leaderboard:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}
export async function getAllUserBadges(userId: string): Promise<{
  success: boolean;
  data: AllUserBadges[];
  message?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select(`
        id,
        name,
        description,
        icon,
        color,
        background,
        category,
        user_badges!left(
          user_id,
          is_active,
          earned_at
        )
      `);

    if (error) throw error;

    // Transform the data to match the expected format
    const transformedData: AllUserBadges[] = data.map(badge => {
      const userBadge = badge.user_badges.find((ub: any) => ub.user_id === userId);
      
      return {
        badge_id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
        background: badge.background,
        category: badge.category || 'general',
        is_achieved: !!userBadge,
        is_active: userBadge?.is_active ?? false,
        achieved_at: userBadge?.earned_at || null
      };
    });

    // Sort: achieved badges first, then by earned date, then by name
    transformedData.sort((a, b) => {
      if (a.is_achieved && !b.is_achieved) return -1;
      if (!a.is_achieved && b.is_achieved) return 1;
      if (a.is_achieved && b.is_achieved) {
        if (a.achieved_at && b.achieved_at) {
          return new Date(b.achieved_at).getTime() - new Date(a.achieved_at).getTime();
        }
      }
      return a.name.localeCompare(b.name);
    });

    return {
      success: true,
      data: transformedData
    };
  } catch (error: any) {
    console.error('Error fetching all user badges:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}
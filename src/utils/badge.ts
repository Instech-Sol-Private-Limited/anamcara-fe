import supabase from "../config/supabase";
import { UserBadge } from "../types/badges";

export async function getUserBadges(userId: string): Promise<{
    success: boolean;
    data: { badges: UserBadge[] };
    message?: string;
}> {
    try {
        const { data, error } = await supabase
            .from('user_badges')
            .select(`
                earned_at,
                badges (
                id,
                name,
                description,
                icon,
                color,
                background
                )
            `).eq('user_id', userId);

        if (error) {
            throw error;
        }

        const badges: UserBadge[] = (data ?? [])
            .filter(item => !!item.badges)
            .map((item: any) => ({
                id: item.badges.id,
                name: item.badges.name,
                description: item.badges.description,
                icon: item.badges.icon,
                color: item.badges.color,
                background: item.badges.background,
                earned_at: item.earned_at
            }));

        return {
            success: true,
            data: { badges }
        };
    } catch (error: any) {
        console.error('Error fetching user badges:', error);
        return {
            success: false,
            data: { badges: [] },
            message: error.message || 'Failed to fetch badges'
        };
    }
}

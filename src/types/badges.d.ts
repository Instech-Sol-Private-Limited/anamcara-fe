export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    background: string;
}

export interface UserBadge extends Badge {
    earned_at: string;
}

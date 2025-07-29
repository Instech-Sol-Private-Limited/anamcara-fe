import config from '../config/config';
import supabase from '../config/supabase';

type UserRole = 'superadmin' | 'user' | 'guest';

interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
    role: UserRole;
    referral_code?: string | null;
    created_at: string;
    updated_at: string;
}

const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    referralCode?: string | null
) => {
    try {
        const redirectTo = `${config.siteUrl}/auth/verify-email/`;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectTo,
                data: {
                    first_name: firstName,
                    last_name: lastName
                }
            },
        });

        if (error) {
            return {
                status: false,
                message: `Error: ${error}`
            };
        }

        let isVerified = false;
        if (Array.isArray(data.user?.identities)) {
            if (data.user.identities.length === 0) {
                isVerified = true;
            } else {
                isVerified = data.user.identities.some(
                    identity => identity.identity_data?.email_verified === true
                );
            }
        }

        if (referralCode && data.user) {
            try {
                await supabase.rpc('process_referral', {
                    p_referral_code: referralCode,
                    p_referred_user_id: data.user.id
                });
            } catch (referralError) {
                console.error('Referral processing error:', referralError);
            }

            try {
                const { default: referralService } = await import('./Refferal');
                referralService.clearStoredReferralCode();
            } catch (e) {
                console.error('Error clearing referral code:', e);
            }
        }

        return {
            status: isVerified ? 'verified' : 'registered',
            message: isVerified
                ? 'Email is already registered!'
                : 'Registration successful! Please check your email to verify your account.',
            email
        };

    } catch (err: any) {
        console.error('Registration error:', err);
        return {
            status: 'error',
            message: err.message || 'Registration failed. Please try again.'
        };
    }
};

const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        if (!data?.user || !data?.session) {
            return {
                success: false,
                message: 'Authentication succeeded but session or user data is missing.',
            };
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            return {
                success: false,
                message: 'User authenticated, but profile could not be fetched.',
            };
        }

        // Ensure user has a referral code after login
        if (!profile.referral_code) {
            try {
                await supabase.rpc('ensure_user_has_referral_code', { user_id: data.user.id });
            } catch (err) {
                console.warn('Failed to ensure referral code on login:', err);
            }
        }

        return {
            success: true,
            data: {
                session: data.session,
                profile,
            },
        };
    } catch (err: any) {
        return { success: false, message: err.message || "Unexpected error during sign in" };
    }
};

const verifyEmail = async (email: string) => {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (user?.email === email && user?.email_confirmed_at) {
            return { success: true, message: 'Email already verified' };
        }

        const redirectTo = `${import.meta.env.VITE_SITE_URL}/auth/verify-email/`;
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: redirectTo
            }
        });

        if (error) throw error;

        return { success: true, message: 'Verification email resent successfully' };
    } catch (error: any) {
        console.error('Email verification error:', error);
        return {
            success: false,
            message: error.message || 'Failed to verify email'
        };
    }
};

const resendVerificationEmail = async (email: string) => {
    try {
        const redirectTo = `${import.meta.env.VITE_SITE_URL}/auth/verify-email`;

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: redirectTo
            }
        });

        if (error) throw error;

        return {
            success: true,
            message: 'Verification email resent successfully'
        };
    } catch (error: any) {
        console.error('Resend verification error:', error);
        return {
            success: false,
            message: error.message || 'Failed to resend verification email'
        };
    }
};

// Oauth signin
const signInWithGoogle = async () => {
    try {
        const redirectTo = `${window.location.origin}/membership`;
        return await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo },
        });
    } catch (err: any) {
        return { error: err.message || "Unexpected error during Google Sign In" };
    }
};

// sign out
const signOut = async () => {
    try {
        return await supabase.auth.signOut();
    } catch (err: any) {
        return { error: err.message || "Unexpected error during sign out" };
    }
};

// get profile
const getProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (err: any) {
        console.error("Error fetching profile:", err.message);
        return null;
    }
};

// get session
const getSession = async () => {
    try {
        console.log('called')
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error || !session) {
            return { success: false, message: "No session found!" };
        }

        return { success: true, data: session };
    } catch (err: any) {
        return { success: false, message: err.message || "Unexpected error getting session" };
    }
};

// get user
const getUser = async () => {
    try {
        return await supabase.auth.getUser();
    } catch (err: any) {
        return { error: err.message || "Unexpected error getting user" };
    }
};

// reset password email
const sendResetPasswordEmail = async (email: string) => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${config.siteUrl}/auth/reset-password`
        });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return { 
            success: true,
            message: "Password reset email sent - check your inbox"
        };
    } catch (err: any) {
        return { 
            success: false, 
            message: err.message || "Failed to send reset email" 
        };
    }
};

// reset password
const resetPassword = async (newPassword: string) => {
    try {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: 'Password updated successfully!',
            data,
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            message: err.message || "Unexpected error during password reset"
        };
    }
};

// auth state change
const onAuthStateChange = (
    callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
) => {
    return supabase.auth.onAuthStateChange(callback);
};

export {
    signIn,
    signInWithGoogle,
    signOut,
    getProfile,
    getUser,
    getSession,
    onAuthStateChange,
    sendResetPasswordEmail,
    verifyEmail,
    resendVerificationEmail,
    resetPassword,
    signUp
};



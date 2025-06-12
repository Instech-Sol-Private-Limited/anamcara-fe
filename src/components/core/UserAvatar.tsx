import { FaRegUser } from 'react-icons/fa';

type UserAvatarProps = {
  avatarUrl?: string;
  firstName?: string;
  size?: number;
  className?: string;
  auraClass?: string; 
};

export default function UserAvatar({
  avatarUrl,
  firstName,
  size = 48,
  className = '',
}: UserAvatarProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-black/10 dark:bg-white/10 flex items-center justify-center ${className}  `}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={firstName || 'User'}
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <FaRegUser className="w-2/3 h-2/3 text-black/30 dark:text-white/30" />
      )}
    </div>
  );
}
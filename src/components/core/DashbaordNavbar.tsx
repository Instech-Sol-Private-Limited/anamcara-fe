import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { PiUserCircleDashed } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthProvider';
import PrimaryButton from '../addons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useUserAura } from "../../context/UserAuraContext";
import UserAvatar from './UserAvatar';
import { auraMap } from '../../constants';
import { UserBadge } from '../../types/badges';
import { getUserBadges } from '../../utils/badge';

const SOUL_TITLE_NAMES = [
  'Wanderer', 'Light Seeker', 'Insight Whisperer', 'Pathfinder',
  'Soul Contributor', 'Harmonic Voice', 'Wisdom Weaver',
  'Echo Guide', 'Anamfriend', 'Elder Soul'
];

const getSoulTitleAura = (badges: UserBadge[]) => {
  const soulTitleBadge = badges.find(badge => SOUL_TITLE_NAMES.includes(badge.name));
  if (!soulTitleBadge) return '';

  return auraMap[soulTitleBadge.color] || '';
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { auraClass, setAuraClass } = useUserAura();
  const { accessToken, loading, logout, userData } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const { userId } = useAuth();

  const placeholders = [
    "Search Threads...",
    "Search Trending Topics...",
    "Search Solutions...",
  ];

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchUserBadges = async () => {
    try {
      const response = await getUserBadges(userId);

      if (response.success) {
        setBadges(response.data.badges);
      }

    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserBadges()
    }
  }, [userId])

  useEffect(() => {
    const aura = getSoulTitleAura(badges);
    setAuraClass(aura);
  }, [badges, setAuraClass]);

  useEffect(() => {
    if (searchValue.length > 0) return;

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [searchValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`bg-main border-b border-b-pre/60 shadow-[2px_0px_10px] shadow-pre/20 fixed top-0 left-0 w-full h-[70px] px-4 md:px-6 lg:px-8 flex items-center md:gap-6 gap-3 justify-between z-[15]`}>
      <Link to="/" className="text-pre lg:text-xl md:text-lg font-mowaq sm:text-[16px] text-sm font-bold logo-anim">
        ANAMCARA
      </Link>

      <div className="relative w-full max-w-2xl overflow-hidden rounded-full border border-pre/30 shadow-[0px_0px_10px] shadow-pre/40">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="md:h-5 md:w-5 sm:w-4 sm:h-4 h-3 w-3 text-" />
        </div>

        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder=""
          className="block w-full md:pl-10 sm:pl-7 pl-5 md:pr-3 pr-2 py-2 md:text-sm text-xs bg-main border-none placeholder-black/60 dark:placeholder-white/60 text-black dark:text-white outline-none"
        />
        <AnimatePresence mode="wait">
          {searchValue.length === 0 && (
            <motion.div
              key={currentPlaceholderIndex}
              className="absolute inset-y-0 left-10 flex items-center pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => searchInputRef.current?.focus()}
            >
              <span className="text-black/80 dark:text-white/80 md:text-sm sm:text-xs text-[10px] text-nowrap">
                {placeholders[currentPlaceholderIndex]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center md:gap-5 gap-3">
        <div className="relative" ref={userMenuRef}>
          {loading ? (
            <div className='py-2'>
              <div className="md:w-7 md:h-7 w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
            </div>
          ) : (
            !accessToken ?
              <PrimaryButton
                text={"Sign in"}
                onClick={() => navigate("/login")}
                className='!bg-pre border-2 !py-2 border-pre !text-white !font-bold'
              />
              : (
                <button
                  className="flex items-center text-sm rounded-full cursor-pointer"
                  onClick={toggleUserMenu}
                >
                  <div className={`relative md:w-8 md:h-8 w-6 h-6 !rounded-full cursor-pointer overflow-hidden flex items-center justify-center transition-all duration-300 ${auraClass} `}>
                    {userData?.avatar_url && userData?.first_name ? (
                      <UserAvatar
                        avatarUrl={userData.avatar_url}
                        firstName={userData.first_name}
                        auraClass={auraClass}
                        size={32}
                        className="md:w-8 md:h-8 w-6 h-6"
                      />
                    ) : (
                      <PiUserCircleDashed className="h-6 w-6 text-pre transition-all duration-300 hover:text-pre" />
                    )}
                  </div>

                  <div className='px-3 text-left md:block hidden'>
                    <p className="md:text-xs font-medium text-text-secondary capitalize">{userData?.first_name}{userData?.last_name ? ` ${userData.last_name}` : ''}</p>
                    <p className="md:text-[10px] text-black/80 dark:text-white/80 truncate">{userData?.email}</p>
                  </div>
                </button>
              )
          )}

          {isUserMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-fit z-40 rounded-md bg-main shadow-[0px_0px_10px] shadow-pre/40 animate-scaleIn">
              <div className="py-1" role="menu">
                <div className="px-4 md:py-3 py-2 border-b border-primary-two  md:hidden">
                  <p className="md:text-sm text-xs font-medium text-text-secondary capitalize">{userData?.first_name}{userData?.last_name ? ` ${userData.last_name}` : ''}</p>
                  <p className="md:text-xs text-[10px] text-black/80 dark:text-white/80 truncate">{userData?.email}</p>
                </div>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }} className="flex w-full items-center px-4 py-2 md:text-sm sm:text-xs text-[10px] text-black/60 dark:text-white/60 hover:bg-pre/20 hover:text-black hover:dark:text-white transition-all duration-300 cursor-pointer"
                >
                  <FiLogOut className="mr-3 lg:text-xl md:text-lg text-[16px] text-black/80 dark:text-white/80" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
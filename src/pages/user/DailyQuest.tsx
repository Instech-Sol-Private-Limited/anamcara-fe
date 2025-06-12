import { useState, useEffect } from 'react';
import { FaCheckCircle, FaLock, FaGift, FaFire, FaStar, FaCoins, FaUserPlus, FaGamepad, FaTrophy, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { LoadingOutlined } from '@ant-design/icons';

interface DailyQuest {
  id: number;
  title: string;
  description: string;
  reward: number;
  rewardType: 'soulpoints' | 'anamcoins' | 'xp';
  icon: any;
  isCompleted: boolean;
  
  progress?: {
    current: number;
    target: number;
  };
}

const DailyQuestsPage = () => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [streak, setStreak] = useState(0);
  const [claimedToday, setClaimedToday] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      generateRandomQuests();
      setStreak(Math.floor(Math.random() * 7));
      setClaimedToday(Math.random() > 0.5);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateRandomQuests = () => {
    const possibleQuests = [
      {
        title: 'Play 3 Matches',
        description: 'Complete 3 matches in any game mode',
        reward: 50,
        rewardType: 'soulpoints',
        icon: FaGamepad
      },
      {
        title: 'Get 5 Kills',
        description: 'Eliminate 5 opponents in battle',
        reward: 75,
        rewardType: 'soulpoints',
        icon: FaFire
      },
      {
        title: 'Top 10 Finish',
        description: 'Finish in top 10 in any match',
        reward: 100,
        rewardType: 'soulpoints',
        icon: FaTrophy
      },
      {
        title: 'Daily Login',
        description: 'Log in to claim your reward',
        reward: 25,
        rewardType: 'anamcoins',
        icon: FaGift
      },
      {
        title: 'Deal 500 Damage',
        description: 'Deal 500 damage to enemies',
        reward: 80,
        rewardType: 'soulpoints',
        icon: FaShieldAlt
      },
      {
        title: 'Revive a Teammate',
        description: 'Revive a teammate in squad mode',
        reward: 60,
        rewardType: 'soulpoints',
        icon: FaUserPlus
      },
      {
        title: 'Headshot Expert',
        description: 'Get 3 headshot kills',
        reward: 90,
        rewardType: 'soulpoints',
        icon: FaStar
      },
      {
        title: 'Survival Time',
        description: 'Survive for 30 minutes total',
        reward: 70,
        rewardType: 'soulpoints',
        icon: FaCoins
      },
      {
        title: 'Win a Match',
        description: 'Be the last one standing',
        reward: 150,
        rewardType: 'soulpoints',
        icon: FaTrophy
      },
      {
        title: 'Weekly Streak',
        description: `Maintain your ${streak + 1}-day streak`,
        reward: streak * 20 + 50,
        rewardType: 'anamcoins',
        icon: FaFire
      }
    ];

    const shuffled = [...possibleQuests].sort(() => 0.5 - Math.random());
    const selectedQuests = shuffled.slice(0, 10).map((quest, index) => ({
      ...quest,
      id: index + 1,
      isCompleted: Math.random() > 0.7,
      isLocked: index > 0 && Math.random() > 0.7,
      progress: {
        current: Math.floor(Math.random() * quest.reward),
        target: quest.reward
      }
    }));

    setQuests(selectedQuests);
  };

  const claimReward = (questId: number) => {
    setQuests(quests.map(quest => 
      quest.id === questId ? { ...quest, isCompleted: true } : quest
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px sm:50px sm:50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <div className="relative">
              <LoadingOutlined
                style={{ fontSize: window.innerWidth < 640 ? 36 : 48, color: '#00FFFF' }}
                spin
              />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
            </div>
            <div className="space-y-2 mt-2">
              <p className="text-cyan-400 font-mono text-lg sm:text-xl font-bold tracking-wider">LOADING DAILY QUESTS</p>
              <div className="flex items-center justify-center space-x-1">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${delay}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(window.innerWidth < 640 ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#FF6B00] to-[#FFD700]"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      animation: 'pulse 2s ease-in-out infinite',
                      boxShadow: '0 0 15px rgba(255, 107, 0, 0.4)',
                    }}
                  />
                  <div
                    className="absolute inset-[3px] sm:inset-[4px] bg-slate-900 flex items-center justify-center overflow-hidden"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    <FaTrophy className="text-amber-400 text-xl sm:text-2xl z-10" />
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 tracking-wider">
                  DAILY QUESTS
                </h1>
                <div className="text-amber-300 text-xs sm:text-sm font-mono mt-1 opacity-80">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <div className="bg-slate-900/90 border border-amber-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-lg">
                <div className="text-amber-400 font-mono text-xs space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <FaFire className="text-xs" />
                    <span>STREAK: {streak} DAYS</span>
                  </div>
                  <div className={claimedToday ? 'text-green-400' : 'text-amber-400'}>
                    {claimedToday ? 'TODAYS_REWARD_CLAIMED' : 'REWARD_AVAILABLE'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Rewards Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
                <FaFire className="text-white text-xs sm:text-sm" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-wider">STREAK_REWARDS</h2>
              <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
          </div>

          <div className="bg-slate-900/90 border-2 border-slate-600/50 rounded-lg backdrop-blur-lg p-4 sm:p-6">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 pb-4">
  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
    <div 
      key={day} 
      className={`h-24 sm:h-32 rounded-lg border-2 ${day <= streak ? 'border-green-500/50 bg-green-500/10' : day === streak + 1 ? 'border-amber-500/50 bg-amber-500/10' : 'border-slate-600/50 bg-slate-800/50'} flex flex-col items-center justify-center p-2 sm:p-3 relative w-full`}
    >
      {day <= streak ? (
        <FaCheckCircle className="text-green-400 text-xl absolute top-2 right-2" />
      ) : null}
      <div className={`text-base sm:text-2xl font-mono font-bold ${day <= streak ? 'text-green-400' : day === streak + 1 ? 'text-amber-400' : 'text-slate-400'}`}>
        DAY {day}
      </div>
      <div className="mt-1 sm:mt-2 text-center">
        <div className={`text-xs font-mono ${day <= streak ? 'text-green-300' : day === streak + 1 ? 'text-amber-300' : 'text-slate-400'}`}>
          {day * 25} {day % 3 === 0 ? 'AC' : 'SP'}
        </div>
        {day === 7 && (
          <div className="text-xs font-mono text-amber-300 mt-1">BONUS</div>
        )}
      </div>
      {day === streak + 1 && !claimedToday && (
        <button className="mt-1 sm:mt-2 px-2 py-1 text-xs font-mono rounded bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 transition-colors">
          CLAIM
        </button>
      )}
    </div>
  ))}
</div>
            <div className="mt-4 text-slate-400 text-xs font-mono">
              💡 Log in daily to maintain your streak and earn bigger rewards!
            </div>
          </div>
        </div>

        {/* Quest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {quests.map((quest) => (
  <div 
    key={quest.id} 
    className={`relative group bg-slate-900/90 border-2 ${quest.isCompleted ? 'border-green-500/50' : 'border-amber-500/50'} rounded-lg backdrop-blur-lg transition-all duration-300 hover:shadow-xl ${quest.isCompleted ? 'hover:shadow-green-500/10' : 'hover:shadow-amber-500/10'} p-4`}
  >
    {/* Completed overlay */}
    {quest.isCompleted && (
      <div className="absolute top-2 right-2 z-10">
        <FaCheckCircle className="text-green-400 text-xl" />
      </div>
    )}

    <div className="relative z-0">
      {/* Quest header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${quest.isCompleted ? 'bg-green-500/20 border-green-500/30' : 'bg-amber-500/20 border-amber-500/30'} border`}>
          <quest.icon className={`text-lg ${quest.isCompleted ? 'text-green-400' : 'text-amber-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm sm:text-base font-bold font-mono truncate ${quest.isCompleted ? 'text-green-400' : 'text-white'}`}>
            {quest.title}
          </h3>
          <p className="text-slate-400 text-xs font-mono">{quest.description}</p>
        </div>
      </div>

      {/* Progress bar */}
      {quest.progress && !quest.isCompleted && (
        <div className="mb-3">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-amber-300">PROGRESS</span>
            <span className="text-slate-400">{Math.min(quest.progress.current, quest.progress.target)}/{quest.progress.target}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" 
              style={{ width: `${Math.min(100, (quest.progress.current / quest.progress.target) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Reward section */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${quest.isCompleted ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'} border`}>
            +{quest.reward} {quest.rewardType === 'soulpoints' ? 'SP' : quest.rewardType === 'anamcoins' ? 'AC' : 'XP'}
          </div>
        </div>
        <button
          onClick={() => !quest.isCompleted && claimReward(quest.id)}
          disabled={quest.isCompleted}
          className={`px-3 py-1 rounded text-xs font-mono transition-all ${quest.isCompleted 
            ? 'bg-green-500/20 text-green-400 border-green-500/30 cursor-default' 
            : 'bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/30'}`}
        >
          {quest.isCompleted ? 'CLAIMED' : 'CLAIM'}
        </button>
      </div>
    </div>

    {/* Cyberpunk corners */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/50"></div>
  </div>
))}
        </div>

        
      </div>
    </div>
  );
};

export default DailyQuestsPage;
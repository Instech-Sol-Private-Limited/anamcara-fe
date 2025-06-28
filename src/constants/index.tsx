export const surveryData = {
    "tf": [
        {
            "question": "Apple products are superior to others.",
            "answers": ["True", "False"]
        },
        {
            "question": "McDonald's is the best fast-food chain.",
            "answers": ["True", "False"]
        },
        {
            "question": "Blue is the most calming color.",
            "answers": ["True", "False"]
        },
        {
            "question": "Coca-Cola tastes better than Pepsi.",
            "answers": ["True", "False"]
        },
        {
            "question": "Nike makes the best athletic shoes.",
            "answers": ["True", "False"]
        },
        {
            "question": "Red cars get pulled over more.",
            "answers": ["True", "False"]
        }
    ],
    "mcq": [
        {
            "question": "Which color will you most definitely choose?",
            "answers": ["Red", "Green", "Yellow", "Blue"]
        },
        {
            "question": "Which fruit do you prefer?",
            "answers": ["Apple", "Banana", "Mango", "Orange"]
        },
        {
            "question": "What's your favorite programming language?",
            "answers": ["JavaScript", "Python", "C++", "Java"]
        },
        {
            "question": "Which hobby do you enjoy the most?",
            "answers": ["Reading", "Gaming", "Cooking", "Traveling"]
        },
        {
            "question": "Which coffee type do you prefer??",
            "answers": ["Espresso", "Latte", "Cappuccino", "Americano"]
        },
        {
            "question": "What's the most useful language?",
            "answers": ["Mandarin", "Spanish", "English", "Arabic"]
        }
    ],
    "lastQuestion": {
        "question": "Who would you rather save?",
        "answers": ["Self", "Partner", "Friend", "Parents"]
    }
}

export const navlinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Our Solutions", path: "/solutions" },
    { name: "Features", path: "/features" },
    { name: "Blogs", path: "/blogs", hasDropdown: false },
    { name: "Membership", path: "/membership" },
    { name: "Reach Out", path: "/reachout" },
];

export const dropdownLinks = [
    { name: "Blog Hub", path: "/resources/blogs" },
    { name: "Video Vault", path: "/resources/videos" },
    { name: "Press Release", path: "/resources/press" },
    { name: "Case Studies", path: "/resources/case-studies" },
    { name: "Research & Insights", path: "/resources/research" },
];

export const mockLeaderboardData = {
    'soul-of-fame': [
        { rank: 1, name: 'CryptoKing', points: 125000, location: 'New York', level: 95, region: 'america' },
        { rank: 2, name: 'SoulMaster', points: 118500, location: 'London', level: 89, region: 'europe' },
        { rank: 3, name: 'DigitalGuru', points: 112000, location: 'Tokyo', level: 87, region: 'asia' },
        { rank: 4, name: 'BlockchainPro', points: 105000, location: 'Singapore', level: 84, region: 'asia' },
        { rank: 5, name: 'MetaExplorer', points: 98500, location: 'Dubai', level: 82, region: 'asia' },
        { rank: 6, name: 'TechNinja', points: 95000, location: 'San Francisco', level: 80, region: 'america' },
        { rank: 7, name: 'CodeMaster', points: 92000, location: 'Berlin', level: 78, region: 'europe' },
        { rank: 8, name: 'DataWizard', points: 89000, location: 'Seoul', level: 76, region: 'asia' },
        { rank: 9, name: 'AIExpert', points: 86000, location: 'Toronto', level: 74, region: 'america' },
        { rank: 10, name: 'WebGuru', points: 83000, location: 'Mumbai', level: 72, region: 'asia' },
        { rank: 11, name: 'CloudChamp', points: 80000, location: 'Sydney', level: 70, region: 'oceania' },
        { rank: 12, name: 'DevLegend', points: 77000, location: 'Paris', level: 68, region: 'europe' }
    ],
    'weekly-earners': [
        { rank: 1, name: 'WeeklyChamp', soulPoints: 8500, anamCoins: 2100, growth: '+25%' },
        { rank: 2, name: 'FastRiser', soulPoints: 7800, anamCoins: 1950, growth: '+18%' },
        { rank: 3, name: 'ConsistentGamer', soulPoints: 7200, anamCoins: 1800, growth: '+15%' },
        { rank: 4, name: 'PointHunter', soulPoints: 6900, anamCoins: 1725, growth: '+12%' },
        { rank: 5, name: 'SteadyEarner', soulPoints: 6500, anamCoins: 1625, growth: '+10%' },
        { rank: 6, name: 'GrowthSeeker', soulPoints: 6200, anamCoins: 1550, growth: '+8%' },
        { rank: 7, name: 'ProgressMaker', soulPoints: 5900, anamCoins: 1475, growth: '+7%' },
        { rank: 8, name: 'EarnMaster', soulPoints: 5600, anamCoins: 1400, growth: '+6%' },
        { rank: 9, name: 'RewardHunter', soulPoints: 5300, anamCoins: 1325, growth: '+5%' },
        { rank: 10, name: 'CoinCollector', soulPoints: 5000, anamCoins: 1250, growth: '+4%' },
        { rank: 11, name: 'TokenEarner', soulPoints: 4700, anamCoins: 1175, growth: '+3%' },
        { rank: 12, name: 'ValueBuilder', soulPoints: 4400, anamCoins: 1100, growth: '+2%' }
    ],
    'top-engagers': [
        { rank: 1, name: 'SocialBuzz', posts: 145, replies: 289, reactions: 1250, engagement: 1684, period: 'all-time' },
        { rank: 2, name: 'CommunityLead', posts: 132, replies: 245, reactions: 1180, engagement: 1557, period: 'all-time' },
        { rank: 3, name: 'ActiveUser', posts: 128, replies: 234, reactions: 1090, engagement: 1452, period: 'monthly' },
        { rank: 4, name: 'Influencer', posts: 115, replies: 198, reactions: 980, engagement: 1293, period: 'monthly' },
        { rank: 5, name: 'Networker', posts: 108, replies: 176, reactions: 890, engagement: 1174, period: 'weekly' },
        { rank: 6, name: 'Connector', posts: 95, replies: 165, reactions: 820, engagement: 1080, period: 'weekly' },
        { rank: 7, name: 'Communicator', posts: 88, replies: 154, reactions: 750, engagement: 992, period: 'all-time' },
        { rank: 8, name: 'Collaborator', posts: 82, replies: 143, reactions: 680, engagement: 905, period: 'monthly' },
        { rank: 9, name: 'TeamPlayer', posts: 75, replies: 132, reactions: 610, engagement: 817, period: 'weekly' },
        { rank: 10, name: 'Helper', posts: 68, replies: 121, reactions: 540, engagement: 729, period: 'all-time' },
        { rank: 11, name: 'Supporter', posts: 61, replies: 110, reactions: 470, engagement: 641, period: 'monthly' },
        { rank: 12, name: 'Contributor', posts: 54, replies: 99, reactions: 400, engagement: 553, period: 'weekly' }
    ],
    'wealthiest-souls': [
        { rank: 1, name: 'CoinCollector', anamCoins: 50000, portfolio: '$125,000', growth: '+32%', period: 'all-time' },
        { rank: 2, name: 'WealthBuilder', anamCoins: 45000, portfolio: '$112,500', growth: '+28%', period: 'all-time' },
        { rank: 3, name: 'InvestmentPro', anamCoins: 42000, portfolio: '$105,000', growth: '+25%', period: 'monthly' },
        { rank: 4, name: 'CryptoWhale', anamCoins: 38000, portfolio: '$95,000', growth: '+22%', period: 'monthly' },
        { rank: 5, name: 'TokenMaster', anamCoins: 35000, portfolio: '$87,500', growth: '+20%', period: 'weekly' },
        { rank: 6, name: 'AssetKing', anamCoins: 32000, portfolio: '$80,000', growth: '+18%', period: 'weekly' },
        { rank: 7, name: 'ValueCreator', anamCoins: 29000, portfolio: '$72,500', growth: '+16%', period: 'all-time' },
        { rank: 8, name: 'FortuneMaker', anamCoins: 26000, portfolio: '$65,000', growth: '+14%', period: 'monthly' },
        { rank: 9, name: 'RichTrader', anamCoins: 23000, portfolio: '$57,500', growth: '+12%', period: 'weekly' },
        { rank: 10, name: 'MoneyMagnet', anamCoins: 20000, portfolio: '$50,000', growth: '+10%', period: 'all-time' },
        { rank: 11, name: 'WealthWizard', anamCoins: 17000, portfolio: '$42,500', growth: '+8%', period: 'monthly' },
        { rank: 12, name: 'CashChamp', anamCoins: 14000, portfolio: '$35,000', growth: '+6%', period: 'weekly' }
    ],
    'soul-title-ladder': [
        { rank: 1, name: 'LegendaryMaster', level: 100, title: 'Soul Legend', progress: 100, levelRange: 'level-80-100' },
        { rank: 2, name: 'EliteChampion', level: 97, title: 'Soul Elite', progress: 97, levelRange: 'level-80-100' },
        { rank: 3, name: 'MasterGamer', level: 94, title: 'Soul Master', progress: 94, levelRange: 'level-80-100' },
        { rank: 4, name: 'ExpertPlayer', level: 91, title: 'Soul Expert', progress: 91, levelRange: 'level-80-100' },
        { rank: 5, name: 'AdvancedUser', level: 88, title: 'Soul Advanced', progress: 88, levelRange: 'level-80-100' },
        { rank: 6, name: 'ProGamer', level: 85, title: 'Soul Pro', progress: 85, levelRange: 'level-80-100' },
        { rank: 7, name: 'SkilledPlayer', level: 75, title: 'Soul Skilled', progress: 75, levelRange: 'level-60-79' },
        { rank: 8, name: 'CompetentUser', level: 70, title: 'Soul Competent', progress: 70, levelRange: 'level-60-79' },
        { rank: 9, name: 'IntermediatePlayer', level: 65, title: 'Soul Intermediate', progress: 65, levelRange: 'level-60-79' },
        { rank: 10, name: 'RegularGamer', level: 60, title: 'Soul Regular', progress: 60, levelRange: 'level-60-79' },
        { rank: 11, name: 'BasicUser', level: 50, title: 'Soul Basic', progress: 50, levelRange: 'level-40-59' },
        { rank: 12, name: 'BeginnerPlayer', level: 45, title: 'Soul Beginner', progress: 45, levelRange: 'level-40-59' }
    ]
};

export const tabs = [
    { id: 'soul-of-fame', label: 'Overall Soul of Fame', icon: '🔥', color: 'from-orange-500/20 to-red-500/20' },
    { id: 'weekly-earners', label: 'Weekly Top Earners', icon: '🔥', color: 'from-green-500/20 to-emerald-500/20' },
    { id: 'top-engagers', label: 'Top Engagers', icon: '💬', color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 'wealthiest-souls', label: 'Wealthiest Souls', icon: '🌕', color: 'from-yellow-500/20 to-amber-500/20' },
    { id: 'soul-title-ladder', label: 'Soul Title Ladder', icon: '🏆', color: 'from-purple-500/20 to-indigo-500/20' }
];

export const filterOptions = {
    'soul-of-fame': ['worldwide', 'asia', 'country', 'city'],
    'weekly-earners': ['this-week', 'last-week', 'monthly'],
};

export const auraMap: { [key: string]: string } = {
    'text-black/80 dark:text-white/80': `
    relative overflow-visible
    ring-2 ring-pre/80
    shadow-[0_0_15px_5px] shadow-pre/50
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-pre/60 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-teal-300/40 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-pre/70
  `,
    'text-yellow-400': `
    relative overflow-visible
    ring-1 ring-yellow-400/90
    shadow-[0_0_15px_5px] shadow-yellow-400/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-yellow-400/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-yellow-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-yellow-400/80
  `,
    'text-blue-400': `
    relative overflow-visible
    ring-2 ring-blue-500/90
    shadow-[0_0_15px_5px] shadow-blue-500/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-blue-500/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-blue-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-blue-500/80
  `,
    'text-purple-400': `
    relative overflow-visible
    ring-2 ring-purple-500/90
    shadow-[0_0_15px_5px] shadow-purple-500/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-purple-500/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-purple-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-purple-500/80
  `,
    'text-red-400': `
    relative overflow-visible
    ring-2 ring-rose-500/90
    shadow-[0_0_20px_8px] shadow-rose-500/70
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-rose-500/80 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-rose-300/60 after:animate-fiery-flicker
    hover:shadow-[0_0_25px_10px] hover:shadow-rose-500/90
  `,
    'text-pink-400': `
    relative overflow-visible
    ring-2 ring-pink-500/90
    shadow-[0_0_15px_5px] shadow-pink-500/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-pink-500/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-pink-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-pink-500/80
  `,
    'text-orange-400': `
    relative overflow-visible
    ring-2 ring-orange-500/90
    shadow-[0_0_20px_8px] shadow-orange-500/70
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-orange-500/80 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-orange-300/60 after:animate-fiery-flicker
    hover:shadow-[0_0_25px_10px] hover:shadow-orange-500/90
  `,
    'text-green-400': `
    relative overflow-visible
    ring-2 ring-emerald-500/90
    shadow-[0_0_15px_5px] shadow-emerald-500/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-emerald-500/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-emerald-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-emerald-500/80
  `,
    'text-indigo-400': `
    relative overflow-visible
    ring-2 ring-indigo-500/90
    shadow-[0_0_15px_5px] shadow-indigo-500/60
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-indigo-500/70 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-indigo-300/50 after:animate-fiery-flicker
    hover:shadow-[0_0_20px_8px] hover:shadow-indigo-500/80
  `,
    'text-yellow-500': `
    relative overflow-visible
    ring-2 ring-amber-500/90
    shadow-[0_0_20px_8px] shadow-amber-500/70
    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-amber-500/80 before:animate-fiery-pulse
    after:absolute after:inset-0 after:rounded-full after:border after:border-amber-300/60 after:animate-fiery-flicker
    hover:shadow-[0_0_25px_10px] hover:shadow-amber-500/90
  `
  ,
  'text-gray-400': `
  relative overflow-visible
  ring-2 ring-gray-400/90
  shadow-[0_0_15px_5px] shadow-gray-400/60
  before:absolute before:inset-0 before:rounded-full before:border-2 before:border-gray-400/70 before:animate-fiery-pulse
  after:absolute after:inset-0 after:rounded-full after:border after:border-gray-300/50 after:animate-fiery-flicker
  hover:shadow-[0_0_20px_8px] hover:shadow-gray-400/80
`,
};
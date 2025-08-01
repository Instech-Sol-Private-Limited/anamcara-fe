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
};
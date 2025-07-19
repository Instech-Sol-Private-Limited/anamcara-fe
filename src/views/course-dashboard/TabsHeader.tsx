import React from "react";

export type TabItem = {
    id: string;
    icon: React.ReactNode;
    label: string;
    count?: number;
    showCount?: boolean;
    visible?: boolean;
};

interface TabsHeaderProps {
    tabs: TabItem[];
    activeTab: string;
    setActiveTab: (value: any) => void;
    mainColor?: string; 
    activeTextColor?: string; 
    inactiveTextColor?: string;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    mainColor = "#8b5cf6",
    activeTextColor = "#ffffff",
    inactiveTextColor = "#9ca3af",
}) => {
    const visibleTabs = tabs.filter((tab) => tab.visible !== false);
    const tabIndex = visibleTabs.findIndex((tab) => tab.id === activeTab);
    const tabCount = visibleTabs.length;

    // Convert hex to RGB for opacity control
    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    const mainRgb = hexToRgb(mainColor);

    return (
        <div
            className="flex items-center gap-1 mb-6 skew-x-[-27deg] p-1 rounded-xl relative w-full overflow-x-auto no-scrollbar"
            style={{
                backgroundColor: `rgba(${mainRgb}, 0.1)`,
                boxShadow: `0px 0px 16px rgba(${mainRgb}, 0.1)`
            }}
        >
            {/* Sliding Background */}
            <div
                className="absolute top-1 bottom-1 rounded-lg transition-all duration-300 transform"
                style={{
                    left: `calc(${tabIndex} * 100% / ${tabCount})`,
                    width: `calc(100% / ${tabCount} - 4px)`,
                    background: `linear-gradient(to right, rgba(${mainRgb}, 0.2), rgba(${mainRgb}, 0.1))`,
                    border: `1px solid rgba(${mainRgb}, 0.3)`
                }}
            />

            {visibleTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="group relative flex-1 flex items-center cursor-pointer justify-center skew-x-[30deg] px-4 py-4 rounded-lg transition-all duration-300"
                    style={{
                        color: activeTab === tab.id ? activeTextColor : inactiveTextColor,
                        fontWeight: activeTab === tab.id ? "600" : "400"
                    }}
                >
                    <div className="relative flex items-center justify-center w-full h-6 overflow-hidden">
                        {/* Icon (and count if shown) */}
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${activeTab === tab.id ? "transform-none" : "group-hover:-translate-y-6"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {tab.icon}
                                {tab.showCount && tab.count !== undefined && (
                                    <div
                                        className="px-2 py-1 rounded-full text-xs font-bold transition-all duration-300"
                                        style={{
                                            backgroundColor: activeTab === tab.id
                                                ? `rgba(${mainRgb}, 0.3)`
                                                : `rgba(${mainRgb}, 0.1)`,
                                            color: activeTab === tab.id ? mainColor : inactiveTextColor,
                                            border: activeTab === tab.id ? `1px solid rgba(${mainRgb}, 0.5)` : "none"
                                        }}
                                    >
                                        {tab.count.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Label (and count if not shown with icon) */}
                        {activeTab !== tab.id && (
                            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-6 group-hover:translate-y-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {tab.label}
                                    </span>
                                    {!tab.showCount && tab.count !== undefined && (
                                        <div
                                            className="px-2 py-1 rounded-full text-xs font-bold"
                                            style={{
                                                backgroundColor: `rgba(${mainRgb}, 0.1)`,
                                                color: inactiveTextColor
                                            }}
                                        >
                                            {tab.count.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default TabsHeader;
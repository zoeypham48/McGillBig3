import { useState } from "react";

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("timer");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <nav className="bg-white shadow-lg fixed bottom-0 w-full py-2 px-4 z-10 border-t border-gray-200">
      <div className="flex justify-around items-center">
        <button 
          onClick={() => handleTabClick("timer")}
          className={`flex flex-col items-center p-2 ${activeTab === "timer" ? "text-[#ED1B2F]" : "text-gray-500"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">Timer</span>
        </button>
        
        <button 
          onClick={() => handleTabClick("info")}
          className={`flex flex-col items-center p-2 ${activeTab === "info" ? "text-[#ED1B2F]" : "text-gray-500"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">Info</span>
        </button>
        
        <button 
          onClick={() => handleTabClick("history")}
          className={`flex flex-col items-center p-2 ${activeTab === "history" ? "text-[#ED1B2F]" : "text-gray-500"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">History</span>
        </button>
        
        <button 
          onClick={() => handleTabClick("settings")}
          className={`flex flex-col items-center p-2 ${activeTab === "settings" ? "text-[#ED1B2F]" : "text-gray-500"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  );
}

'use client'

import Image from "next/image";
import { useState } from "react";
import OverviewTab from "@/components/Overview";
import TransactionsTab from "@/components/Transaction";
import Header from "@/components/Header";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} searchQuery={searchQuery} />
      <main id="main-content"  className="min-h-[calc(100vh-4rem)]">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-1 sm:space-x-5">
              <h1 className="text-lg sm:text-2xl font-bold text-primary">
                Wallet Ledger
              </h1>
              <button className="p-1">
                <Image
                  src="/images/caret-down.png"
                  alt="Dropdown"
                  width={10}
                  height={10}
                />
              </button>
              <div className="flex items-center p-1 border-transparent bg-gray-100 border rounded-lg">
                <Image
                  src="/images/Status Dot.png"
                  alt="Status"
                  width={5}
                  height={5}
                />
                <span className="text-xs sm:text-sm pl-1 font-medium">Active</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-3">
              <button className="px-2 py-1 sm:px-3 sm:py-1.5 bg-share text-black text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors">
                Share
              </button>
              <button className="p-1 sm:p-1.5">
                <Image
                  src="/images/iconButtonOutlinedStandard.png"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center">
              <Image
                src="/images/Profile pictures.png"
                alt="Profile pictures"
                width={70}
                height={40}
              />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm sm:text-base text-gray-600 font-normal">
                Ava, Liam, Noah and +12 others
              </span>
            </div>
          </div>
          
          <div className="border-b border-gray-200 mb-6 mt-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "overview"
                    ? "border-text-tab text-tab"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "transactions"
                    ? "border-text-tab text-tab"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Transactions
              </button>
            </nav>
          </div>
          
          <div className="tab-content">
            {activeTab === "overview" && <OverviewTab searchQuery={searchQuery} />}
            {activeTab === "transactions" && <TransactionsTab searchQuery={searchQuery} />}
          </div>
        </div>
      </main>
    </>
  );
}
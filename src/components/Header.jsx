import React from "react";
import { Search, Plus, Sparkles } from "lucide-react";

const Header = ({ searchTerm, setSearchTerm, onCreateNote }) => {
  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-4 sm:p-6 mb-8 border border-white/30 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side - Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Evernotes
          </h1>
        </div>

        {/* Right Side - Search Bar + Add Button */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 sm:w-80 pl-12 pr-4 py-3 backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-300/50 text-gray-700 placeholder-gray-500 shadow-lg transition-all duration-300"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={onCreateNote}
            className="group relative backdrop-blur-lg bg-gradient-to-r from-purple-400/80 to-pink-400/80 hover:from-purple-500/90 hover:to-pink-500/90 text-white p-4 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <div className="relative">
              <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
              <div className="absolute inset-0 w-6 h-6 bg-white/20 rounded-full blur group-hover:animate-ping"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  return (
      <div className="flex items-center border border-[#E3EAE5] bg-bg-light-green rounded-full px-4 py-3 w-full shadow-sm">
          <Search className="text-gray-400" size={20} />
          <input
              type="text"
              placeholder="Buscar ferramenta"
              className="w-full bg-transparent outline-none px-2 text-gray-700"
              onChange={(e) => onSearch(e.target.value)}
          />
      </div>
  );
};

export default SearchBar;
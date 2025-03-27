import React, { useState } from "react";
import Hero from "./Hero.jsx";
import SearchBar from "./SearchBar.jsx";
import PopularTriggers from "./PopularTriggers.jsx";
import PopularActions from "./PopularActions.jsx";
import FAQ from "../FAQ.jsx";
import ToolGridWithCategoryFilter from "./ToolGridWithCategoryFilter.jsx";

const ArchivePosts = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500">Nenhuma ferramenta encontrada</p>
    );
  }

  return (
    <div>
      <Hero />
      <section className="w-full flex flex-col items-center pb-10">
        <div className="w-full max-w-[1280px]">
          <div className="mt-[40px]">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col">
          <ToolGridWithCategoryFilter searchQuery={searchQuery} />
        </div>
      </section>
      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1200px] w-full flex flex-col">
          <PopularTriggers />
        </div>
      </section>
      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1200px] w-full flex flex-col">
          <PopularActions />
        </div>
      </section>
      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1200px] w-full flex flex-col">
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default ArchivePosts;

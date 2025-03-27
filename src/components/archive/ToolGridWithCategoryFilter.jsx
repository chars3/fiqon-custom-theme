import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const ToolGridWithCategoryFilter = ({ searchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  // Fechar dropdown clicando fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar ferramentas
  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/apps");
        const data = await res.json();
        setAllTools(data);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  // Buscar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://fiqon-backup.local/wp-json/wp/v2/app-category"
        );
        const data = await res.json();
        setCategories([{ id: null, name: "Todas" }, ...data]);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  // Contador de categorias
  useEffect(() => {
    const counts = {};
    allTools.forEach((app) => {
      if (Array.isArray(app["app-category"])) {
        app["app-category"].forEach((catId) => {
          counts[catId] = (counts[catId] || 0) + 1;
        });
      }
    });
    counts["all"] = allTools.length;
    setCategoryCounts(counts);
  }, [allTools]);

  // Filtro por categoria e busca
  useEffect(() => {
    setLoading(true);
    let filtered = [...allTools];

    if (selectedCategory) {
      filtered = filtered.filter((app) =>
        app["app-category"]?.includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((tool) => {
        const appTitle = tool.acf?.app_title || "";
        const appName = tool.title?.rendered || "";
        return (
          appTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setTools(filtered);
    setLoading(false);
  }, [selectedCategory, searchQuery, allTools]);

  // Render cards
  const renderTools = () => {
    if (loading) {
      return (
        <p className="col-span-full text-center">Carregando ferramentas...</p>
      );
    }
    if (tools.length === 0) {
      return (
        <p className="col-span-full text-center">
          Nenhuma ferramenta encontrada
        </p>
      );
    }
    return tools.map((tool, index) => (
      <a
        key={index}
        href={tool.link}
        className="text-center p-2 hover:opacity-90 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
          alt={tool.acf?.app_title || tool.title?.rendered || "Ferramenta"}
          className="w-[120px] h-[120px] mx-auto object-contain"
        />
        <p className="mt-2 text-text-100">
          {tool.acf?.app_title || tool.title?.rendered}
        </p>
      </a>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Select mobile/tablet */}
      <h3 className="text-text-100 font-sans font-[500]">POR CATEGORIA</h3>
      <div className="block md:hidden relative z-10 mb-4" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-gray-100 rounded-full px-4 py-2 flex justify-between items-center text-sm text-text-100 font-medium outline-none"
        >
          <span>
            {categories.find((cat) => cat.id === selectedCategory)?.name ??
              "Todas"}{" "}
            (
            {selectedCategory === null
              ? categoryCounts["all"] || 0
              : categoryCounts[selectedCategory] || 0}
            )
          </span>
          {dropdownOpen ? (
            <ChevronUp className="w-4 h-4 text-text-200" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-200" />
          )}
        </button>

        {dropdownOpen && (
          <ul className="absolute left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-md max-h-[300px] overflow-y-auto overflow-x-hidden w-full">
            {categories.map((category) => (
              <li
                key={category.id ?? "null"}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setDropdownOpen(false);
                }}
                className={`px-4 py-2 text-sm text-text-100 hover:bg-gray-100 cursor-pointer break-words ${
                  selectedCategory === category.id
                    ? "font-semibold text-primary"
                    : ""
                }`}
              >
                {category.name} (
                {category.id === null
                  ? categoryCounts["all"] || 0
                  : categoryCounts[category.id] || 0}
                )
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista lateral desktop */}
      <div className="hidden md:block p-4 w-1/4">
        <h3 className="text-text-100 font-sans font-[500] mb-2 border-b border-stroke-green-200 pb-2">
          POR CATEGORIA
        </h3>
        <div className="px-2 pt-2">
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex font-sans justify-between items-center text-text-100 cursor-pointer hover:text-green-600 ${
                  selectedCategory === category.id
                    ? "text-text-green font-bold"
                    : ""
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-[4px] text-text-100">
                  {category.id === null
                    ? categoryCounts["all"] || 0
                    : categoryCounts[category.id] || 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid de ferramentas */}
      <div className="flex flex-col md:w-3/4 w-full">
        {/* Mobile com scroll */}
        <div className="md:hidden p-4 max-h-[500px] overflow-y-auto overflow-x-hidden w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {renderTools()}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block p-4">
          <div className="grid grid-cols-5 gap-4">{renderTools()}</div>
        </div>

        {/* Footer box */}
        <div className="bg-bg-light-green p-4 rounded-lg mt-4">
          <p className="font-bold text-text-300">
            Não encontrou a ferramenta que procura?
          </p>
          <p className="text-text-200 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur. Dictumst sit mattis risus
            leo risus cras.
          </p>
          <a
            href="https://doc.clickup.com/31083618/d/h/xmk32-86893/760bc715a491aac"
            className="text-text-green text-[14px] font-[500] flex items-center mt-2"
            target="_blank"
          >
            Conectar ferramenta <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolGridWithCategoryFilter;

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const ToolGridWithCategoryFilter = ({ searchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar apps
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
        const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/app-category");
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

  useEffect(() => {
    setLoading(true);

    let filtered = [...allTools];

    if (selectedCategory) {
      filtered = filtered.filter(
        (app) =>
          app["app-category"] && app["app-category"].includes(selectedCategory)
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

  return (
    <div className="flex gap-4">
      {/* Filtro de Categoria */}
      <div className="p-4 w-1/4">
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

      {/* Grid de Ferramentas */}
      <div className="flex flex-col w-3/4">
        <div className="grid grid-cols-5 gap-4 p-4 w-full">
          {loading ? (
            <p className="col-span-5 text-center">Carregando ferramentas...</p>
          ) : tools.length > 0 ? (
            tools.map((tool, index) => (
              <div key={index} className="text-center p-2">
                <img
                  src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
                  alt={
                    tool.acf?.app_title || tool.title?.rendered || "Ferramenta"
                  }
                  className="w-[142px] h-[142px] mx-auto"
                />
                <p className="mt-2 text-text-100">
                  {tool.acf?.app_title || tool.title?.rendered}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-5 text-center">
              Nenhuma ferramenta encontrada
            </p>
          )}
        </div>
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

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const ToolGrid = ({ selectedCategory, searchQuery }) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchTools = async () => {
          setLoading(true);
          try {
              const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100");
              const data = await res.json();

              let filteredTools = data;

              // FILTRO POR CATEGORIA
              if (selectedCategory && selectedCategory !== "Todas") {
                  filteredTools = filteredTools.filter(app =>
                      app.categories && app.categories.includes(selectedCategory)
                  );
              }

              // FILTRO POR BUSCA
              if (searchQuery.trim() !== "") {
                  filteredTools = filteredTools.filter(app =>
                      (app.title?.rendered?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                      (app.acf?.app_title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
                  );
              }

              setTools(filteredTools);
          } catch (error) {
              console.error("Erro ao buscar ferramentas:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchTools();
  }, [selectedCategory, searchQuery]);

  return (
      <div className="flex flex-col border w-3/4">
          <div className="grid grid-cols-5 gap-4 p-4 w-full">
              {loading ? (
                  <p className="col-span-5 text-center">Carregando ferramentas...</p>
              ) : tools.length > 0 ? (
                  tools.map((tool, index) => (
                      <div key={index} className="text-center p-2">
                          <img
                              src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
                              alt={tool.acf?.app_title || tool.title || "Ferramenta"}
                              className="w-[122px] h-[122px] mx-auto"
                          />
                          <p className="mt-2">{tool.acf?.app_title || tool.title}</p>
                      </div>
                  ))
              ) : (
                  <p className="col-span-5 text-center">Nenhuma ferramenta encontrada</p>
              )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <p className="font-bold text-gray-800">Não encontrou a ferramenta que procura?</p>
              <p className="text-gray-600 text-sm mt-1">
                  Lorem ipsum dolor sit amet consectetur. Dictumst sit mattis risus leo risus cras.
              </p>
              <a
                  href="#"
                  className="text-green-600 font-semibold flex items-center mt-2"
              >
                  Conectar ferramenta <ArrowRight className="ml-2" size={16} />
              </a>
          </div>
      </div>
  );
};

export default ToolGrid;
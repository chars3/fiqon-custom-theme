import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";

const ConnectTools = () => {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [appName, setAppName] = useState("a ferramenta");
  const [appLogo, setAppLogo] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null); // ← ferramenta clicada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/apps");
        const data = await res.json();

        const slug = window.location.pathname.split("/").filter(Boolean).pop();
        const matchingApp = data.find((app) => app.slug === slug);

        console.log(matchingApp);

        if (matchingApp) {
          const name =
            matchingApp.acf?.app_title || matchingApp.title?.rendered || slug;
          const logo =
            matchingApp.acf?.app_logo?.url || "https://placehold.co/80";

          setAppName(name);
          setAppLogo(logo);
        }

        const formattedTools = data.map((app) => ({
          name: app.acf?.app_title || app.title?.rendered || "Sem nome",
          icon: app.acf?.app_logo?.url || "https://placehold.co/64",
        }));

        setTools(formattedTools);
        setFilteredTools(formattedTools);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(query)
    );
    setFilteredTools(filtered);
  }, [searchQuery, tools]);

  return (
    <div className="text-center mt-12">
      <h2 className="text-green-600 text-2xl font-bold">
        Conecte qualquer ferramenta ao {appName}
      </h2>

      {/* Conexão Visual */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <img
          src={appLogo || "https://placehold.co/80"}
          alt={appName}
          className="w-[120px] h-[120px] object-contain"
        />
        <ArrowRight className="w-8 h-8 text-gray-500" />
        {selectedTool ? (
          <img
            src={selectedTool.icon}
            alt={selectedTool.name}
            className="w-[120px] h-[120px] object-contain transition-all duration-200 ease-out scale-100 opacity-100"
          />
        ) : (
          <img
            src="https://placehold.co/80"
            alt="Adicionar"
            className="w-16 h-16 object-contain opacity-50"
          />
        )}
      </div>

      {/* Barra de busca */}
      <div className="flex justify-center mt-6 px-8">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full shadow-sm">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar ferramenta"
            className="w-full bg-transparent outline-none px-2 text-gray-700"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>

      {/* Lista de ferramentas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedTool(tool)} // ← clique define ferramenta
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-[120px] h-[120px] object-contain"
              />
              <p className="text-gray-800 text-sm mt-2">{tool.name}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500">
            Nenhuma ferramenta encontrada
          </p>
        )}
      </div>
    </div>
  );
};

export { ConnectTools };

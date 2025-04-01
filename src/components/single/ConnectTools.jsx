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
        const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps");
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

        const formattedTools = data
          .map((app) => ({
            name: app.acf?.app_title || app.title?.rendered || "Sem nome",
            icon: app.acf?.app_logo?.url || "https://placehold.co/64",
            link: app.link || "#",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

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
      <h2 className="text-primary text-[26px] font-bold">
        Conecte qualquer ferramenta ao {appName}
      </h2>

      {/* Conexão Visual */}
      <div className="flex justify-center items-center mt-6">
        <img
          src={appLogo || "https://placehold.co/80"}
          alt={appName}
          className="w-24 md:w-[140px] md:h-[140px] object-contain"
        />
        {/* <ArrowRight className="w-8 h-8 text-gray-500" /> */}
        <img
          className="w-14 md:w-32"
          src="https://fiqon.com.br/wp-content/uploads/2025/03/Group-48095517.png"
          alt="Seta"
        />
        {selectedTool ? (
          <a href={selectedTool.link}>
            <img
              src={selectedTool.icon}
              alt={selectedTool.name}
              className="w-24 md:w-[140px] md:h-[140px] object-contain transition-all duration-200 ease-out scale-100 opacity-100"
            />
          </a>
        ) : (
          <img
            src="https://fiqon.com.br/wp-content/uploads/2025/03/Mask-group.png"
            alt="Adicionar"
            className="w-20 md:w-[140px] md:h-[140px] object-contain"
          />
        )}
      </div>

      {/* Barra de busca */}
      <div className="flex justify-center mt-6 md:px-8">
        <div className="flex items-center border border-[#E3EAE5] bg-bg-light-green rounded-full px-4 py-3 w-full shadow-sm">
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
              onClick={() => setSelectedTool(tool)}
              className="text-center flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-[120px] h-[120px] object-contain"
              />
              <p className="text-text-100 text-sm">{tool.name}</p>
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

import React, { useEffect } from "react";
import { Search, ArrowRight, Zap } from "lucide-react";

const tempTriggers = [
  {
    icon: "https://via.placeholder.com/48",
    name: "Nova requisição",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Nova requisição",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Nova requisição",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Nova requisição",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Nova requisição",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
];

const PopularTriggers = ({ triggers = tempTriggers }) => {
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsRes = await fetch(
          "http://fiqon-backup.local/wp-json/wp/v2/apps"
        );
        const appsData = await appsRes.json();

        const categoryId = 142; // ID da categoria "Inteligência Artificial"
        const filteredApps = appsData.filter(
          (app) =>
            app["app-category"] && app["app-category"].includes(categoryId)
        );

        console.log("Apps filtrados (Inteligência Artificial):", filteredApps);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {/* Título */}
      <h2 className="text-green-600 text-xl font-bold flex items-center">
        Gatilhos populares <Zap className="ml-2" size={20} />
      </h2>

      {/* Barra de busca */}
      {/* <div className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-sm mt-4">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por gatilho"
          className="w-full bg-transparent outline-none px-2 text-gray-700"
        />
      </div> */}

      {/* Informação de exibição */}
      {/* <div className="flex justify-end">
        <p className="text-gray-500 text-sm mt-2">
          Exibindo 1 - 5 de 1000 gatilhos por popularidade
        </p>
      </div> */}

      {/* Lista de gatilhos */}
      <div className="mt-4 space-y-3">
        {triggers.map((trigger, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-sm"
          >
            <img
              src={trigger.icon}
              alt={trigger.name}
              className="w-12 h-12 rounded-md"
            />
            <div className="ml-4 flex-1">
              <p className="font-bold text-gray-800">{trigger.name}</p>
              <p className="text-gray-600 text-sm">{trigger.description}</p>
            </div>
            <button className="border border-green-600 text-green-600 px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition">
              Testar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTriggers;

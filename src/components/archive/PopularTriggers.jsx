import React, { useEffect } from "react";
import { Search, ArrowRight, Zap } from "lucide-react";

const tempTriggers = [
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/WEBHOOK.png",
    name: "Webhook",
    description:
      "O Webhook é um dos gatilhos mais versáteis, permitindo que sua integração seja ativada sempre que um evento específico ocorre em outro sistema",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/AGENDAMENTO.png",
    name: "Agendamento",
    description:
      "O gatilho de Agendamento é ideal para integrações que precisam ser executadas em intervalos regulares, sem depender de eventos externos.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/EVOLUTION-API.png",
    name: "Evolution Api ",
    description:
      "Construa integrações com base em eventos específicos dentro do Evolution Api, através de configurações diretas e rápidas.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/META.png",
    name: "Nova requisição",
    description:
      "Este gatilho é ativado toda vez que um novo lead é gerado através de um formulário de leads associado a uma página no Meta Ads.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/GOOGLE-ADS.png",
    name: "Google Ads",
    description:
      "Este gatilho é ativado toda vez que um novo lead é gerado através de um formulário de leads vinculado à sua conta de anúncios no Google Ads.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API.png",
    name: "Z-APl",
    description:
      "Construa integrações com base em eventos específicos dentro do Z-API, através de configurações diretas e rápidas.",
  },
];

const PopularTriggers = ({ triggers = tempTriggers }) => {
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsRes = await fetch(
          "https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100"
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
    <div className="bg-[#F6F6F7] p-6 rounded-[20px]">
      {/* Título */}
      <h2 className="text-primary text-3xl font-bold flex items-center">
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
      <div className="mt-6 space-y-3">
        {triggers.map((trigger, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 md:flex-row md:items-center bg-white p-4 pr-8 rounded-xl border border-stroke shadow-sm"
          >
            <img
              src={trigger.icon}
              alt={trigger.name}
              className="w-20 h-20 rounded-md"
            />
            <div className="md:ml-4 flex-1">
              <p className="font-medium text-text-300">{trigger.name}</p>
              <p className="text-text-100 font-normal text-sm mt-2">{trigger.description}</p>
            </div>
            <button className="w-24 border border-[#018562] text-[#018562]  py-1 rounded-xl hover:bg-primary focus:bg-primary hover:text-white transition">
              <a href="https://fiqon.app/">Testar</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTriggers;

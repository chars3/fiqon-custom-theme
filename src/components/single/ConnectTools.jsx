import React, { useState } from "react";
import { Search } from "lucide-react";

const tempTools = [
  { icon: "https://placehold.co/64", name: "ActiveCampaign" },
  { icon: "https://placehold.co/64", name: "Brevo" },
  { icon: "https://placehold.co/64", name: "Chatbots" },
  { icon: "https://placehold.co/64", name: "ChatGPT" },
  { icon: "https://placehold.co/64", name: "ClickUp" },
  { icon: "https://placehold.co/64", name: "Conta Azul" },
  { icon: "https://placehold.co/64", name: "Google Drive" },
  { icon: "https://placehold.co/64", name: "Google Sheets" },
  { icon: "https://placehold.co/64", name: "HubSpot CRM" },
  { icon: "https://placehold.co/64", name: "RD Station CRM" },
  { icon: "https://placehold.co/64", name: "RD Station Marketing" },
  { icon: "https://placehold.co/64", name: "Slack" },
  { icon: "https://placehold.co/64", name: "Trello" },
  { icon: "https://placehold.co/64", name: "Z-API" },
];

const ConnectTools = ({ tools = tempTools }) => {
  return (
    <div className="text-center mt-12">
      <h2 className="text-green-600 text-2xl font-bold">
        Conecte qualquer ferramenta ao Active Campaign
      </h2>
      
      {/* Conexão Visual */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <img src="https://placehold.co/80" alt="ActiveCampaign" className="w-16 h-16" />
        <span className="text-3xl font-bold text-gray-500">→</span>
        <img src="https://placehold.co/80" alt="Adicionar" className="w-16 h-16" />
      </div>
      
      {/* Barra de busca */}
      <div className="flex justify-center mt-6 px-8">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full shadow-sm">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar ferramenta"
            className="w-full bg-transparent outline-none px-2 text-gray-700"
          />
        </div>
      </div>
      
      {/* Lista de ferramentas */}
      <div className="grid grid-cols-7 gap-6 mt-6">
        {tools.map((tool, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <img src={tool.icon} alt={tool.name} className="w-16 h-16" />
            <p className="text-gray-800 text-sm mt-2">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ConnectTools };

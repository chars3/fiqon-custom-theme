import React from "react";
import { Search, Settings } from "lucide-react";

const tempActions = [
  {
    icon: "https://via.placeholder.com/48",
    name: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla."
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla."
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla."
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla."
  },
  {
    icon: "https://via.placeholder.com/48",
    name: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla."
  }
];

const PopularActions = ({ actions = tempActions }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {/* Título */}
      <h2 className="text-green-600 text-xl font-bold flex items-center">
        Ações populares <Settings className="ml-2" size={20} />
      </h2>
      
      {/* Barra de busca */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-sm mt-4">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por ação"
          className="w-full bg-transparent outline-none px-2 text-gray-700"
        />
      </div>
      
      {/* Informação de exibição */}
      <div className="flex justify-end">
        <p className="text-gray-500 text-sm mt-2">
          Exibindo 1 - 5 de 5000 ações por popularidade
        </p>
      </div>
      
      {/* Lista de ações */}
      <div className="mt-4 space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <img src={action.icon} alt={action.name} className="w-12 h-12 rounded-md" />
            <div className="ml-4 flex-1">
              <p className="font-bold text-gray-800">{action.name}</p>
              <p className="text-gray-600 text-sm">{action.description}</p>
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

export default PopularActions;
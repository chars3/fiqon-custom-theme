import React, { useState } from "react";

const tempTriggers = [
  { icon: "https://placehold.co/48", title: "Negócio atualizado", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Negócio adicionado", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Nota adicionada ao negócio", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Negócio adicionado ao Pipeline", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Estágio de negócio criado", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Nova tarefa de negócio criada", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Tarefa de negócio concluída", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Tarefa de negócio concluída", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Adicionado à lista", app_name: "ActiveCampaign" },
];

const tempActions = [
  { icon: "https://placehold.co/48", title: "Criar novo contato", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Atualizar contato", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Adicionar nota ao contato", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Adicionar contato à lista", app_name: "ActiveCampaign" },
  { icon: "https://placehold.co/48", title: "Criar nova tarefa", app_name: "ActiveCampaign" },
];

const Possibilities = ({ triggers = tempTriggers, actions = tempActions }) => {
  const [activeTab, setActiveTab] = useState("triggers");

  return (
    <div className="text-center">
      <h2 className="text-green-600 text-2xl font-bold">Veja todas as possibilidades</h2>
      <p className="text-gray-700 mt-2">
        Confira o que é possível fazer unindo <span className="font-bold">{triggers[0]?.app_name}</span> e FiqOn
      </p>
      
      {/* Tabs */}
      <div className="relative flex justify-center items-center mt-4 pb-2">
        <div className="absolute w-full h-0.5 bg-dashed border-t border-dashed border-green-600"></div>
        <div className="relative z-10 flex space-x-4 px-2">
          <button
            className={`px-4 py-1 rounded-full ${activeTab === "triggers" ? "bg-green-600 text-white" : "border border-gray-300 bg-white text-gray-700"}`}
            onClick={() => setActiveTab("triggers")}
          >
            GATILHOS {triggers.length}
          </button>
          <button
            className={`px-4 py-1 rounded-full ${activeTab === "actions" ? "bg-green-600 text-white" : "border border-gray-300 bg-white text-gray-700"}`}
            onClick={() => setActiveTab("actions")}
          >
            AÇÕES {actions.length}
          </button>
        </div>
      </div>
      
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {(activeTab === "triggers" ? triggers : actions).map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-center">
            <img src={item.icon} alt={item.title} className="w-10 h-10 mr-4" />
            <p className="text-gray-800 font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Possibilities };
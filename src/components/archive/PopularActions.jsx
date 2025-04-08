import React from "react";
import { Search, Settings } from "lucide-react";

const tempActions = [
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/SHEETS.png",
    name: "Adicionar linha na planilha",
    description:
      "Acrescenta uma linha com valores no final da planilha do Google Sheets.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API-1.png",
    name: "Enviar texto simples",
    description:
      "Envie textos simples via WhatsApp! Você pode incrementá-los utilizando a formatação de texto e emojis.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API-1.png",
    name: "Enviar áudio",
    description:
      "Ação responsável por enviar áudios para os seus chats no WhatsApp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/GPT.png",
    name: "Criar uma Thread",
    description:
      "Cria uma thread para conversa com assistente do ChatGPT.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/CLICKUP-1.png",
    name: "Criar tarefa",
    description:
      "Criar uma tarefa no ClickUp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/EVOLUTION-API-1.png",
    name: "Enviar Anexo",
    description:
      "Ação que envia anexos para um contato no WhatsApp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/ASAAS.png",
    name: "Atualizar cadastro do cliente",
    description:
      "Ação que atualiza o cadastro de um cliente no Asaas.",
  },
];

const PopularActions = ({ actions = tempActions }) => {
  return (
    <div className="bg-[#F6F6F7] p-6 rounded-[20px]">
      {/* Título */}
      <h2 className="text-primary text-3xl font-bold flex items-center">
        Ações populares <Settings className="ml-2" size={20} />
      </h2>

      {/* Lista de ações */}
      <div className="mt-6 space-y-3">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 md:flex-row md:items-center bg-white p-4 pr-8 rounded-xl border border-stroke shadow-sm"
          >
            <img
              src={action.icon}
              alt={action.name}
              className="w-20 h-20 rounded-md"
            />
            <div className="md:ml-4 flex-1">
              <p className="font-medium text-text-300">{action.name}</p>
              <p className="text-text-100 font-normal text-sm mt-2">
                {action.description}
              </p>
            </div>
            <button className="w-24 border border-[#018562] text-[#018562] py-1 rounded-xl hover:bg-primary focus:bg-primary hover:text-white transition">
              <a href="https://fiqon.app/">Testar</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActions;

import React from "react";
import { Search, Settings } from "lucide-react";

const tempActions = [
  {
    icon: "https://placehold.co/48",
    name: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://placehold.co/48",
    name: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://placehold.co/48",
    name: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://placehold.co/48",
    name: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
  },
  {
    icon: "https://placehold.co/48",
    name: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel mattis ipsum tristique semper volutpat id fringilla.",
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
            <button className="w-24 border border-[#018562] text-[#018562] py-1 rounded-xl hover:bg-primary hover:text-white transition">
              Testar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActions;

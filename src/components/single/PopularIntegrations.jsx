import React from "react";
import { ArrowRight } from "lucide-react";

const tempIntegrations = [
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  },
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  },
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  }
];

const PopularIntegrations = ({ integrations = tempIntegrations }) => {
  return (
    <div className="text-center mt-12">
      <h2 className="text-green-600 text-2xl font-bold">Integrações populares</h2>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {integrations.map((integration, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <img src={integration.sourceIcon} alt="Source" className="w-12 h-12" />
              <ArrowRight className="text-gray-500" size={20} />
              {integration.targetIcons.map((icon, idx) => (
                <>
                  <img key={idx} src={icon} alt="Target" className="w-10 h-10" />
                  {idx !== integration.targetIcons.length - 1 && <ArrowRight className="text-gray-500" size={20} />}
                </>
              ))}
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">{integration.title}</h3>
            <p className="text-gray-700 text-sm mt-2">{integration.description}</p>
            <a href="#" className="text-green-600 font-semibold flex items-center mt-4">
              Criar a partir do template <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PopularIntegrations };
import React from "react";
import { Rocket, CreditCard } from "lucide-react";

const HeroSinglePost = ({ post }) => {
  const { acf } = post;

  return (
    <div className="bg-gradient-to-r from-green-100 to-gray-100 pt-16 pb-24 flex items-center justify-center">
      <div className="w-full max-w-[1280px] flex flex-col md:flex-rol justify-between px-[24px] md:px-[40px] xl:px-[60px]">
        {/* Texto e chamada para ação */}
        <div className="max-w-xl">
          <h1 className="text-[32px] leading-[48px] font-bold text-text-300">
            Integrar o <span className="text-primary">{acf.app_title}</span>{" "}
            aos seus sistemas nunca foi tão simples!
          </h1>
          <p className="text-text-200 mt-4">
            Integre agora o {acf.app_title} com seus demais sistemas e coloque
            tarefas no piloto automático! Plataforma gratuita. Webhooks
            gratuitos.
          </p>

          {/* Botão */}
          <button className="cursor-pointer mt-10 w-[464px] bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
            Integrar {acf.app_title}
          </button>

          {/* Benefícios */}
          <div className="flex items-center mt-6 space-x-6 text-text-100 text-sm">
            <span className="flex items-center">
              <Rocket className="text-text-100 mr-2" size={18} />É
              gratuito, por tempo ilimitado
            </span>
            <span className="flex items-center">
              <CreditCard className="text-gray-600 mr-2" size={18} />
              Não precisa de cartão de crédito
            </span>
          </div>
        </div>

        {/* Imagem */}
        <div className="w-[50%] flex justify-center items-center">
          <img
            src={acf.app_logo?.url}
            alt={acf.app_title}
            className="w-full h-[284px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSinglePost;

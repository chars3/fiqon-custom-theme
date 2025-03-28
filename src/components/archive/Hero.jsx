import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[500px] text-center relative">
      {/* Versão mobile */}
      <div
        className="block md:hidden absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://fiqon.com.br/wp-content/uploads/2025/03/hero-archive-bg.png')"
        }}
      ></div>

      {/* Versão desktop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://fiqon.com.br/wp-content/uploads/2025/03/Frame-48096813-2.png')"
        }}
      ></div>

      {/* Conteúdo do Hero */}
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-[40px] font-bold text-text-300">
            Lorem ipsum dolor sit amet consectetur.{" "}
            <span className="text-primary">In urna.</span>
          </h1>
          <p className="mt-8 text-text-100 text-sm md:text-lg">
            Lorem ipsum dolor sit amet consectetur. Magna ut vitae sem nunc
            odio id turpis ut. Nibh etiam eu magnis est cras phasellus amet
            sed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
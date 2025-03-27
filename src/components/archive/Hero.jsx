import React from "react";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://fiqon.com.br/wp-content/uploads/2025/03/Frame-48096813-2.png')" }}
    >
      {/* Conteúdo do Hero */}
      <div className="max-w-2xl px-6">
        <h1 className="text-3xl md:text-[40px] font-bold text-text-300">
          Lorem ipsum dolor sit amet consectetur. <span className="text-primary">In urna.</span>
        </h1>
        <p className="mt-8 text-text-100 text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur. Magna ut vitae sem nunc odio id turpis ut. 
          Nibh etiam eu magnis est cras phasellus amet sed.
        </p>
      </div>
    </div>
  );
};

export default Hero;
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "Como eu começo a integrar com a FiqOn?",
    answer: "É muito simples! Basta criar a sua conta e explorar as possibilidades a partir do plano gratuito.",
  },
  {
    question: "Quantas ações eu preciso?",
    answer: "Depende do seu fluxo de automação e necessidades específicas.",
  },
  {
    question: "O que é uma ação?",
    answer: "Uma ação é um evento que ocorre dentro da plataforma, podendo ser um disparo, uma automação ou uma integração.",
  },
  {
    question: "O que é um middleware?",
    answer: "Middleware é um software que atua como um intermediário entre sistemas, facilitando a comunicação entre eles.",
  },
  {
    question: "O que é um gatilho?",
    answer: "Um gatilho é um evento que inicia uma automação, podendo ser uma ação específica dentro de um software integrado.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-center text-[32px] font-bold text-text-200">Perguntas frequentes</h2>
      <div className="mt-10">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`py-6 ${index !== faqs.length - 1 ? 'border-b-2 border-stroke-green-200' : ''}`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className="font-semibold text-text-300">{faq.question}</p>
              {openIndex === index ? (
                <X className="text-primary" size={20} />
              ) : (
                <Plus className="text-primary" size={20} />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-6">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

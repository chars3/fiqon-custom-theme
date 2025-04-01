import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "Como eu começo a integrar com a FiqOn?",
    answer: "É muito simples! Basta criar a sua conta e explorar as possibilidades a partir do plano gratuito.",
  },
  {
    question: "Quantas ações eu preciso?",
    answer: "Isso varia conforme a quantidade de integrações criadas dentro da plataforma e o volume de dados que serão movimentados entre elas.",
  },
  {
    question: "O que é uma operação?",
    answer: "É a resposta executada em um sistema após um gatilho ser acionado. Por exemplo, quando um evento ocorre em um sistema de origem, a operação é a tarefa realizada no sistema de destino, como enviar dados, criar um registro ou atualizar informações.",
  },
  {
    question: "O que é um middleware?",
    answer: "É um software que atua como um intermediário, permitindo que diferentes sistemas ou aplicações se comuniquem e troquem dados entre si, facilitando a integração.",
  },
  {
    question: "O que é um gatilho?",
    answer: "É o evento que inicia uma automação em uma integração, como uma mudança em um sistema que aciona outra ação em um sistema integrado.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto md:p-6">
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

"use client";
import { useState } from "react";

export type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
};

export default function FAQSection({ 
  faqs, 
  title = "Preguntas Frecuentes", 
  subtitle = "Encuentra respuestas rápidas a tus dudas" 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-gray-500 font-medium text-lg">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                  ? 'border-yellow-500 bg-yellow-50/20 shadow-md transform scale-[1.01]' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50/50 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors ${isOpen ? 'text-yellow-700' : 'text-gray-800 group-hover:text-blue-900'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Icono de "+" animado */}
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen 
                    ? 'bg-yellow-500 text-white rotate-45 shadow-sm' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${
                    isOpen 
                    ? 'pb-6 opacity-100 max-h-96 translate-y-0' 
                    : 'max-h-0 opacity-0 overflow-hidden pb-0 -translate-y-2'
                  }`}
                >
                  <div className="h-px w-full bg-gray-100 mb-4"></div>
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

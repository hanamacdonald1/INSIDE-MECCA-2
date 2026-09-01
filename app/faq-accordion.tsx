"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({ items }: { items: [string, string][] }) {
  // Store set of open question indices. By default, first item is open for preview.
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-4xl divide-y divide-stone-800 border-y border-stone-800 my-8" id="faq-accordion">
      {items.map(([question, answer], index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={question}
            className="transition-colors duration-150 hover:bg-stone-900/40"
          >
            <button
              type="button"
              id={`faq-btn-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-ans-${index}`}
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between gap-4 py-5 px-3 md:px-4 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2"
            >
              <span className="font-serif text-lg md:text-xl text-stone-100 group-hover:text-red-400 transition-colors">
                {question}
              </span>
              <span
                className={`p-1.5 rounded-full bg-stone-800 text-stone-300 group-hover:bg-stone-700 transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180 text-red-400 bg-stone-800" : ""
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-ans-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                className="px-3 md:px-4 pb-6 pt-1 text-stone-300 text-sm md:text-base leading-relaxed max-w-3xl"
              >
                <p className="m-0 text-stone-300">{answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

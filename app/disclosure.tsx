"use client";

import React, { useState, useRef, useEffect } from "react";

interface DisclosureProps {
  summary: React.ReactNode;
  summaryClassName?: string;
  children: React.ReactNode;
  contentClassName?: string;
  containerClassName?: string;
  id: string;
}

export function Disclosure({ summary, summaryClassName, children, contentClassName, containerClassName, id }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    
    function handleClickOutside(e: MouseEvent) {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={containerClassName} ref={containerRef} data-state={isOpen ? "open" : "closed"}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}
        className={summaryClassName}
      >
        {summary}
      </button>
      
      <div 
        id={id} 
        className={contentClassName}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {isOpen && children}
      </div>
    </div>
  );
}

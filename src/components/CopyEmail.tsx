import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CopyEmailProps {
  textClassName?: string;
}

export const CopyEmail: React.FC<CopyEmailProps> = React.memo(({ textClassName = "text-zinc-500 dark:text-zinc-400" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('esteban.vidal.valencia@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center gap-2 focus:outline-none">
      <span className={`text-xs font-medium tracking-wide select-all hover:text-zinc-900 dark:hover:text-white transition-colors cursor-text ${textClassName}`}>
        esteban.vidal.valencia@gmail.com
      </span>
      <motion.button 
        onClick={handleCopy} 
        whileHover={{ scale: 1.1, opacity: 0.85 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none" 
        aria-label="Copiar correo"
      >
        <div className="relative w-[16px] h-[16px]">
          {copied ? (
            <Check size={16} strokeWidth={1.5} className="absolute inset-0 text-emerald-500 transition-opacity duration-300 opacity-100" />
          ) : (
            <Copy size={16} strokeWidth={1.5} className="absolute inset-0 text-zinc-400 transition-opacity duration-300 opacity-100" />
          )}
        </div>
      </motion.button>
    </div>
  );
});

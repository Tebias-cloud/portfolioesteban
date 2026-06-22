import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailProps {
  textClassName?: string;
}

export const CopyEmail: React.FC<CopyEmailProps> = React.memo(({ textClassName = "text-zinc-600 dark:text-zinc-300" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('esteban.vidal.valencia@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center gap-2.5">
      <span className={`text-sm font-medium tracking-wide select-all hover:text-zinc-900 dark:hover:text-white transition-colors cursor-text ${textClassName}`}>
        esteban.vidal.valencia@gmail.com
      </span>
      <button 
        onClick={handleCopy} 
        className="flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer active:scale-90" 
        aria-label="Copiar correo"
      >
        <div className="relative w-4 h-4">
          {copied ? (
            <Check size={15} className="absolute inset-0 text-emerald-500 transition-opacity duration-300 opacity-100" />
          ) : (
            <Copy size={15} className="absolute inset-0 text-zinc-400 transition-opacity duration-300 opacity-100" />
          )}
        </div>
      </button>
    </div>
  );
});

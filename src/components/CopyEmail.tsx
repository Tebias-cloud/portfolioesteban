import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CopyEmailProps {
  textClassName?: string;
}

export const CopyEmail: React.FC<CopyEmailProps> = React.memo(({ textClassName = "text-zinc-500 dark:text-zinc-400" }) => {
  const [copied, setCopied] = useState(false);
  const email = 'esteban.vidal.valencia@gmail.com';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="group flex items-center gap-1 sm:gap-2">
      <a
        href={`mailto:${email}`}
        title={`Enviar correo a ${email}`}
        aria-label={`Enviar correo a ${email}`}
        className={`text-xs font-medium tracking-wide hover:text-zinc-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 rounded px-1 -mx-1 py-0.5 ${textClassName}`}
      >
        {email}
      </a>
      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
        aria-label={copied ? "Correo copiado en el portapapeles" : "Copiar correo electrónico"}
        title={copied ? "Copiado" : "Copiar correo"}
      >
        <div className="relative w-4 h-4">
          {copied ? (
            <Check size={16} strokeWidth={2} className="absolute inset-0 text-emerald-500 transition-opacity duration-200" />
          ) : (
            <Copy size={16} strokeWidth={1.75} className="absolute inset-0 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-opacity duration-200" />
          )}
        </div>
      </motion.button>
    </div>
  );
});

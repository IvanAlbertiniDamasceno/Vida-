import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      {label && <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>}
      <input 
        className={`w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm ${className}`}
        {...props}
      />
    </div>
  );
};

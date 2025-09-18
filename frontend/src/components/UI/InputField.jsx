import React from "react";

export default function InputField({ 
  type = "text", 
  placeholder, 
  icon: Icon ,
  onChange,
  value,
  name
}) {
  return (
    <div className="mb-4">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-4 h-4 text-textSecondary" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-3 rounded-lg bg-bgPrimary border border-border 
                     text-textPrimary focus:border-primary focus:ring-1 
                     focus:ring-[var(--bg-glass)] outline-none transition-skin 
                     placeholder-textSecondary/60 text-sm"
        />
      </div>
    </div>
  );
}

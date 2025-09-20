import React from "react";

export default function PlainInputField({
  type = "text",
  placeholder,
  onChange,
  value,
  name,
}) {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 rounded-lg bg-bgPrimary border border-border
                   text-textPrimary focus:border-primary focus:ring-1
                   focus:ring-[var(--bg-glass)] outline-none transition-skin
                   placeholder-textSecondary/60 text-sm"
      />
    </div>
  );
}

export const InfoDisplay = ({ icon: Icon, label, value, className = "" }) => (
  <div
    className={`flex items-start gap-3 p-4 rounded-lg bg-bgPrimary border border-border shadow-sm transition-all duration-300 ${className}`}
  >
    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10">
      <Icon className="h-5 w-5 text-accent" />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-textSecondary uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-textPrimary break-words">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);
"use client";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClasses =
    "px-12 py-2 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-[#F5BD19] text-black border border-[#F5BD19] hover:bg-[#F2B100] shadow-sm"
      : "bg-[#FBF7F0] text-gray-700 border border-[#F5BD19] hover:bg-[#F3EFEA]";

  return (
    <button {...props} className={`${baseClasses} ${styles} ${className}`}>
      {children}
    </button>
  );
}

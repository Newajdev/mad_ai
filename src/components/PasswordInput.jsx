import { useState } from "react";
import { Icon } from "@iconify/react";

export default function PasswordInput({
  label,
  value,
  onChange,
  showStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (pwd) => {
    if (!pwd) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 10) return 2;
    return 3;
  };

  const strength = getStrength(value);

  return (
    <div className="space-y-2">
      <label className="text-xs font-black tracking-widest text-gray-400 uppercase px-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          className="w-full bg-gray-100 border border-gray-200 rounded-2xl p-3 pr-12 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
        >
          <Icon
            icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
            width="18"
          />
        </button>
      </div>

      {showStrength && value && (
        <div className="flex gap-1 pt-1 px-1">
          {[1, 2, 3].map((lvl) => (
            <div
              key={lvl}
              className={`h-1 flex-1 rounded-full ${
                strength >= lvl
                  ? strength === 1
                    ? "bg-red-400"
                    : strength === 2
                    ? "bg-orange-400"
                    : "bg-green-400"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

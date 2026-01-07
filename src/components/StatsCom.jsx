import { Icon } from "@iconify/react";

export default function StatsCom({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-xl px-6 py-6 relative flex items-center">

      <div className="absolute left-6 h-12 flex items-center justify-center rounded-lg bg-background-main text-primary px-4">
        <p className="font-bold text-[25px]">
          {title}
        </p>
      </div>

      <div className="mx-auto">
        <h3 className="text-3xl font-bold text-primary">
          {value ?? "--"}
        </h3>
      </div>

      <div className="absolute right-6 h-12 w-14 flex items-center justify-center rounded-lg bg-background-main text-primary">
        <Icon icon={icon} width="40" height="40" />
      </div>

    </div>
  );
}

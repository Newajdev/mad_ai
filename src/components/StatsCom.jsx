import { Icon } from "@iconify/react";

export default function StatsCom({
  title,
  value,
  icon,
}) {
  return (
    <div className="
      relative
      bg-white
      shadow
      rounded-xl
      px-4 sm:px-6 md:px-9
      py-6 md:py-9
      flex
      flex-col sm:flex-row
      items-center
      justify-between
      gap-4
    ">

      {/* TITLE */}
      <div className="
        sm:absolute
        sm:left-6
        bg-background-main
        text-primary
        rounded-lg
        px-4
        py-2
        shadow
      ">
        <p className="font-bold text-lg sm:text-xl md:text-[25px] text-center sm:text-left">
          {title}
        </p>
      </div>

      {/* VALUE */}
      <div className="text-center sm:mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          {value ?? "--"}
        </h3>
      </div>

      {/* ICON */}
      <div className="
        sm:absolute
        sm:right-6
        bg-background-main
        text-primary
        rounded-lg
        h-12 w-12 md:h-14 md:w-14
        flex items-center justify-center
        shadow
      ">
        <Icon icon={icon} width="28" height="28" className="md:w-[40px] md:h-[40px]" />
      </div>

    </div>
  );
}

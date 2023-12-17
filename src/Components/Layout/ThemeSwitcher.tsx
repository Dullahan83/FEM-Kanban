import React from "react";
import useTheme from "../../Hooks/useTheme";
import { cn } from "../../Utils/func";

const ThemeSwitcher = () => {
  const { isDarkTheme, handleTheme } = useTheme();
  return (
    <div className="flex w-5/6 bg-bgLight dark:bg-bgDark py-[14px] self-center md:self-end items-center justify-center rounded-md">
      <img src="/assets/icon-light-theme.svg" alt="" />
      <button
        onClick={handleTheme}
        className={cn(
          ' h-5 w-10 bg-primary relative flex mx-6 after:transition-transform duration-500 p-[3px] rounded-full after:content-[""] after:absolute after:h-3.5 after:aspect-square after:rounded-full after:bg-white after:top-[3px] hover:bg-primary-hover',
          { " after:translate-x-5": isDarkTheme }
        )}
      ></button>
      <img src="/assets/icon-dark-theme.svg" alt="" />
    </div>
  );
};

export default ThemeSwitcher;

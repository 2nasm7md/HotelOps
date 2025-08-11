import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../Context/darkModeContext";

export default function DarkmodeToggle() {
  const { isDarkMode, DarkModeToggle } = useDarkMode();
  return (
    <ButtonIcon onClick={DarkModeToggle}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

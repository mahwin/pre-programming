import { createAction } from "@reduxjs/toolkit";

export const themeToggle = createAction<{ isDark: boolean }>("themeToggle");

"use client";

import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useContingentFull = () => {
  return useAtom(modalState);
};

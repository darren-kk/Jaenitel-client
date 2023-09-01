import { atom } from "jotai";

export const showMainDosAtom = atom(true);
export const postInfoAtom = atom({
  title: "",
  category: "",
  madeBy: "",
  contents: [{ textContent: "" }],
});

export const postsAtom = atom(null);

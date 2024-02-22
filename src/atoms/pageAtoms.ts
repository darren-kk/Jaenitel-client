import { atom } from "jotai";

export const currentPageAtom = atom<number>(1);
export const totalPageAtom = atom<number>(1);
export const postsPerPageAtom = atom<number>(10);

import { atom } from "jotai";

export const showModalAtom = atom(true);
export const isSignupAtom = atom(false);
export const userAtom = atom(null);

export const currentPageAtom = atom(1);
export const totalPageAtom = atom(1);
export const postsPerPageAtom = atom(10);

export const scrollRefAtom = atom(null);
export const videoRefAtom = atom(null);
export const titleRefAtom = atom(null);

export const showMainDosAtom = atom(true);
export const postInfoAtom = atom({
  title: "",
  category: "",
  madeBy: "",
  contents: [{ textContent: "" }],
});

export const postsAtom = atom(null);

export const messagesAtom = atom(null);
export const modalStateAtom = atom({
  isOpen: false,
  messageId: null,
});

export const chatRoomsAtom = atom(null);

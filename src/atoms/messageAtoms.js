import { atom } from "jotai";

export const messagesAtom = atom(null);
export const modalStateAtom = atom({
  isOpen: false,
  messageId: null,
});

export const messageNotificationAtom = atom(null);

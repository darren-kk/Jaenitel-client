import { atom } from "jotai";

interface Message {
  messageId: string;
}

interface ModalState {
  isOpen: boolean;
  messageId: string | null;
}

interface MessageNotification {
  sendFrom: string;
  sendTo: string;
}

type Messages = {
  [key: string]: Message;
};

export const messagesAtom = atom<Messages | null>(null);
export const modalStateAtom = atom<ModalState | null>({
  isOpen: false,
  messageId: null,
});

export const messageNotificationAtom = atom<MessageNotification | null>(null);

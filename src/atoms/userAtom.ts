import { atom } from "jotai";

interface User {
  email: string;
  nickname: string;
  password: string;
  receivedMessages: string[];
  sentMessages: string[];
  _id: string;
}

export const userAtom = atom<User | null>(null);

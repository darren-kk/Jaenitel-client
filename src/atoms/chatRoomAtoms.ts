import { atom } from "jotai";

interface ChatRoom {
  roomId: string;
  madeBy: string;
}

type ChatRooms = {
  [key: string]: ChatRoom;
};

export const chatRoomsAtom = atom<ChatRooms | null>(null);
export const showCreateChatRoomAtom = atom<boolean>(false);

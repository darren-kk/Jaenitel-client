import { atom } from "jotai";
import { RefObject } from "react";

export const scrollRefAtom = atom<RefObject<HTMLDivElement> | null>(null);
export const videoRefAtom = atom<RefObject<HTMLVideoElement> | null>(null);
export const titleRefAtom = atom<RefObject<HTMLElement> | null>(null);

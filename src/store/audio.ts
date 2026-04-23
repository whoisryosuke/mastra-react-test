import { atom } from "jotai";

export const audioContextStore = atom<AudioContext | null>(null);

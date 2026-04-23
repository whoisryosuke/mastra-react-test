import type { MidiNote } from "@/types/music";
import type { NoteType } from "tonal";

export type PianoRollNoteData = {
  note: MidiNote;
  metadata: NoteType;
};

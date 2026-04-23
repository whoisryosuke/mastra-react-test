import { audioContextStore } from "@/store/audio";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export type NoteWithOctave = {
  note: string;
  octave: number;
};

export const NOTES_ALL_IN_ORDER = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function calculateDetune(note: string, octave: number = 4) {
  const noteIndex = NOTES_ALL_IN_ORDER.findIndex(
    (searchNote) => searchNote == note,
  );
  const octaveOffset = (octave - 4) * 1200;
  return noteIndex * 100 + octaveOffset;
}

export function useNotePlayer() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [context, setContext] = useAtom(audioContextStore);

  const loadAudio = async () => {
    if (!context) return;
    const response = await fetch("music/piano/C4.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const newAudioBuffer = await context.decodeAudioData(arrayBuffer);
    setAudioBuffer(newAudioBuffer);

    return newAudioBuffer;
  };

  const play = async (notes: NoteWithOctave[]) => {
    // console.log("[NOTEPLAYER] trying to play...", notes, context);

    // No context? Create it
    let ctx = context;
    if (!context) {
      ctx = new AudioContext();
      setContext(ctx);
    }
    if (!ctx) return;

    // console.log("[NOTEPLAYER] got context", ctx, context);

    // No audio? Load it.
    // We have to wait for context to load, which requires user input,
    // which is why this is here.
    let buffer = audioBuffer;
    if (!audioBuffer) {
      const newBuffer = await loadAudio();
      if (newBuffer) buffer = newBuffer;
    }
    if (!buffer) return;

    // console.log("[NOTEPLAYER] got buffer", buffer, audioBuffer);

    // Loop through each note to play it
    notes.forEach(({ note, octave }) => {
      // Play audio
      const sourceNode = ctx.createBufferSource();
      sourceNode.buffer = buffer;
      // Pitch shift our audio to correct note
      sourceNode.detune.value = calculateDetune(note, octave);
      sourceNode.connect(ctx.destination);

      //   console.log("[NOTEPLAYER] playing note", note);

      sourceNode.start();
    });
  };

  return {
    play,
  };
}

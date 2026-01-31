import { create } from "zustand";

// TODO: Split into multiple stores, and make a telemetry store for telemetry data from web socket

interface ReplayState {
  isPlaying: boolean;
  currentReplayId: string | null;
  replayLength: number;
  progress: number;
  speed: number;
}

interface AppState {
  // WebSocket & Api Client ID
  clientId: string | null;
  setClientId: (id: string | null) => void;

  // Recording
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;

  // Stats panel
  isStatsOpen: boolean;
  setIsStatsOpen: (open: boolean) => void;
  toggleStats: () => void;

  // Replay state
  replay: ReplayState;
  setReplayPlaying: (playing: boolean) => void;
  setCurrentReplayId: (id: string | null) => void;
  setReplayLength: (length: number) => void;
  setReplayProgress: (progress: number) => void;
  setReplaySpeed: (speed: number) => void;
  resetReplay: () => void;
}

const initialReplayState: ReplayState = {
  isPlaying: false,
  currentReplayId: null,
  replayLength: 0,
  progress: 0,
  speed: 1,
};

export const useAppStore = create<AppState>((set) => ({
  // WebSocket & Api Client ID
  clientId: null,
  setClientId: (id) => set({ clientId: id }),

  // Recording
  isRecording: false,
  setIsRecording: (recording) => set({ isRecording: recording }),

  // Stats panel
  isStatsOpen: false,
  setIsStatsOpen: (open) => set({ isStatsOpen: open }),
  toggleStats: () => set((state) => ({ isStatsOpen: !state.isStatsOpen })),

  // Replay state. TODO - maybe change??
  replay: initialReplayState,
  setReplayPlaying: (playing) =>
    set((state) => ({ replay: { ...state.replay, isPlaying: playing } })),
  setCurrentReplayId: (id) =>
    set((state) => ({ replay: { ...state.replay, currentReplayId: id } })),
  setReplayLength: (length) =>
    set((state) => ({ replay: { ...state.replay, replayLength: length } })),
  setReplayProgress: (progress) =>
    set((state) => ({ replay: { ...state.replay, progress } })),
  setReplaySpeed: (speed) =>
    set((state) => ({ replay: { ...state.replay, speed } })),
  resetReplay: () => set({ replay: initialReplayState }),
}));

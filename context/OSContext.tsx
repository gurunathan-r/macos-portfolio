"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  AppID,
  MusicState,
  OSContextState,
  Song,
  WindowState,
} from "@/types/os";
import { songs } from "@/constants/songs";

const initialWindows: Record<AppID, WindowState> = {
  about: {
    id: "about",
    title: "About Me",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  },
  settings: {
    id: "settings",
    title: "Settings",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  },
  safari: {
    id: "safari",
    title: "Safari",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  },
  mail: {
    id: "mail",
    title: "Mail",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  },
  music: {
    id: "music",
    title: "Music",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  },
  mirroring: {
    id: "mirroring",
    title: "iPhone Mirroring",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
  },
};

const OSContext = createContext<OSContextState | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] =
    useState<Record<AppID, WindowState>>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>("about");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [wallpaper, setWallpaper] = useState(
    "https://4kwallpapers.com/images/walls/thumbs_2t/22674.jpg"
  );
  const [music, setMusic] = useState<MusicState>({
    isPlaying: false,
    currentSong: null,
    progress: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ---------------- MUSIC SETUP ---------------- */

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = 0.5;
      audio.loop = true;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setMusic((prev) => ({
            ...prev,
            progress: (audio.currentTime / audio.duration) * 100,
          }));
        }
      };

      audio.onended = () => {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        audio.src = randomSong.url || "";
        audio.play().catch(e => console.error("Auto-play failed", e));
        setMusic({
          isPlaying: true,
          currentSong: randomSong,
          progress: 0
        });
      };

      audioRef.current = audio;
    }
  }, []);

  /* ---------------- THEME ---------------- */

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = (newTheme: "dark" | "light") => {
    // ✅ Runtime guard only (NO type hacks)
    if (!("startViewTransition" in document)) {
      setTheme(newTheme);
      return;
    }

    const direction =
      newTheme === "dark" ? "transition-ltr" : "transition-rtl";
    document.documentElement.classList.add(direction);

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove(direction);
    });
  };

  /* ---------------- WINDOW MANAGEMENT ---------------- */

  const bringToFront = (id: AppID) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((w) => w.zIndex));
      return { ...prev, [id]: { ...prev[id], zIndex: maxZ + 1 } };
    });
  };

  const openWindow = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false },
    }));
    bringToFront(id);
  };

  const closeWindow = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const minimizeWindow = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    bringToFront(id);
  };

  const focusWindow = (id: AppID) => bringToFront(id);

  /* ---------------- MUSIC CONTROLS ---------------- */

  const toggleMusic = () => {
    if (!audioRef.current || !music.currentSong) return;

    if (music.isPlaying) {
      audioRef.current.pause();
      setMusic((prev) => ({ ...prev, isPlaying: false }));
    } else {
      audioRef.current.play();
      setMusic((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  const playSong = (song: Song) => {
    if (!audioRef.current) return;

    if (music.currentSong?.id === song.id && music.isPlaying) {
      audioRef.current.pause();
      setMusic((prev) => ({ ...prev, isPlaying: false }));
      return;
    }

    audioRef.current.src = song.url ?? "";
    audioRef.current.play();
    setMusic({ isPlaying: true, currentSong: song, progress: 0 });
  };

  const setMusicProgress = (progress: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;

    audioRef.current.currentTime =
      (progress / 100) * audioRef.current.duration;
    setMusic((prev) => ({ ...prev, progress }));
  };

  /* ---------------- PROVIDER ---------------- */

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        theme,
        wallpaper,
        music,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        setTheme: toggleTheme,
        setWallpaper,
        toggleMusic,
        playSong,
        setMusicProgress,
      }}
    >
      {children}
      <audio ref={audioRef} style={{ display: "none" }} />
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}

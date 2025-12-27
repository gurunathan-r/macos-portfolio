"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AppID, MusicState, OSContextState, Song, WindowState } from "@/types/os";

// Extend Document interface for View Transitions API
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      finished: Promise<void>;
    };
  }
}


const initialWindows: Record<AppID, WindowState> = {
    about: { id: "about", title: "About Me", isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1 },
    settings: { id: "settings", title: "Settings", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    safari: { id: "safari", title: "Safari", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    mail: { id: "mail", title: "Mail", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    music: { id: "music", title: "Music", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    mirroring: { id: "mirroring", title: "iPhone Mirroring", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

const OSContext = createContext<OSContextState | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
    const [windows, setWindows] = useState<Record<AppID, WindowState>>(initialWindows);
    const [activeWindowId, setActiveWindowId] = useState<AppID | null>("about");
    const [theme, setTheme] = useState<"dark" | "light">("light");
    const [wallpaper, setWallpaper] = useState("https://4kwallpapers.com/images/walls/thumbs_2t/22674.jpg");
    const [music, setMusic] = useState<MusicState>({ isPlaying: false, currentSong: null, progress: 0 });

    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.volume = 0.5;
            audioRef.current.loop = true; // Enable looping

            // Setup events
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current) {
                    setMusic(prev => ({ ...prev, progress: (audioRef.current!.currentTime / audioRef.current!.duration) * 100 }));
                }
            };
            // Removed onended handler to allow looping indefinitely
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

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

    const focusWindow = (id: AppID) => {
        bringToFront(id);
    };

    const toggleMusic = () => {
        if (audioRef.current && music.currentSong) {
            if (music.isPlaying) {
                audioRef.current.pause();
                setMusic(prev => ({ ...prev, isPlaying: false }));
            } else {
                audioRef.current.play();
                setMusic(prev => ({ ...prev, isPlaying: true }));
            }
        }
    };

    const playSong = (song: Song) => {
        if (audioRef.current) {
            if (music.currentSong?.id === song.id && music.isPlaying) {
                audioRef.current.pause();
                setMusic(prev => ({ ...prev, isPlaying: false }));
                return;
            }

            audioRef.current.src = song.url || "";
            audioRef.current.play();
            setMusic({ isPlaying: true, currentSong: song, progress: 0 });
        }
    };

    const setMusicProgress = (progress: number) => {
        if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
            audioRef.current.currentTime = (progress / 100) * audioRef.current.duration;
            setMusic(prev => ({ ...prev, progress }));
        }
    }

    const toggleTheme = (newTheme: "dark" | "light") => {
        // Fallback for browsers without View Transition API
        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        // Set direction class for CSS animation
        const direction = newTheme === 'dark' ? 'transition-ltr' : 'transition-rtl';
        document.documentElement.classList.add(direction);

        const transition = document.startViewTransition(() => {
            setTheme(newTheme);
        });

        // Clean up class after transition
        transition.finished.finally(() => {
            document.documentElement.classList.remove(direction);
        });
    };

    // Replace direct setTheme usage with this exposed function, or just use it internally if we expose setTheme.
    // Since we expose setTheme in the return, let's wrap it there or provide a separate function.
    // Actually, let's just replace the raw setTheme in the context value with this logic, 
    // BUT 'setTheme' signature in context is strict. 
    // Let's modify the Context Provider value to use this wrapper for 'setTheme'.

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
                setTheme: toggleTheme, // Use our wrapper
                setWallpaper,
                toggleMusic,
                playSong,
                setMusicProgress
            }}
        >
            {children}
            <audio ref={audioRef} style={{ display: 'none' }} />
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error("useOS must be used within an OSProvider");
    }
    return context;
}

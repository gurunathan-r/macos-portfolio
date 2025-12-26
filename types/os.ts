export type AppID = 'about' | 'settings' | 'safari' | 'mail' | 'music' | 'mirroring';

export interface WindowState {
    id: AppID;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

export interface MusicState {
    isPlaying: boolean;
    currentSong: Song | null;
    progress: number;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    duration: number;
    cover: string;
    url?: string;
}

export interface OSContextState {
    windows: Record<AppID, WindowState>;
    activeWindowId: AppID | null;
    theme: 'dark' | 'light';
    wallpaper: string;
    music: MusicState;
    openWindow: (id: AppID) => void;
    closeWindow: (id: AppID) => void;
    minimizeWindow: (id: AppID) => void;
    maximizeWindow: (id: AppID) => void;
    focusWindow: (id: AppID) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    setWallpaper: (url: string) => void;
    toggleMusic: () => void;
    playSong: (song: Song) => void;
    setMusicProgress: (progress: number) => void;
}

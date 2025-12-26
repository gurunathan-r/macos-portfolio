"use client";

import { useOS } from "@/context/OSContext";
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon } from "lucide-react";
import { Song } from "@/types/os";

const songs: Song[] = [
    { id: "1", title: "Spring Vibes", artist: "Lofi Beats", duration: 180, cover: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=400&h=400&fit=crop", url: "/assets/spring-lofi-vibes-lofi-music-340019.mp3" },
    { id: "2", title: "Study Calm", artist: "Chill Hop", duration: 200, cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop", url: "/assets/lofi-study-calm-peaceful-chill-hop-112191.mp3" },
    { id: "3", title: "Lofi Chill", artist: "Relaxation", duration: 210, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop", url: "/assets/lofi-lofi-chill-lofi-girl-456265.mp3" },
    { id: "4", title: "Ambient Flow", artist: "Lofi Girl", duration: 190, cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", url: "/assets/lofi-girl-lofi-ambient-music-365952.mp3" },
    { id: "5", title: "Background Beats", artist: "Focus", duration: 220, cover: "https://images.unsplash.com/photo-1482442120256-9c03866de390?w=400&h=400&fit=crop", url: "/assets/lofi-background-music-326931.mp3" },
    { id: "6", title: "Good Night", artist: "Cozy Vibes", duration: 240, cover: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop", url: "/assets/good-night-lofi-cozy-chill-music-160166.mp3" },
];

export default function Music() {
    const { music, playSong, toggleMusic } = useOS();

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold">Music</h1>
                <p className="text-sm text-gray-500">Library • All Songs</p>
            </div>

            {/* Song List */}
            <div className="flex-1 overflow-auto p-4 space-y-2">
                {songs.map((song) => (
                    <div
                        key={song.id}
                        onClick={() => playSong(song)}
                        className={`group flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${music.currentSong?.id === song.id ? "bg-gray-100 dark:bg-gray-800" : ""
                            }`}
                    >
                        <div className="w-10 h-10 rounded overflow-hidden mr-4 relative">
                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                            {music.currentSong?.id === song.id && music.isPlaying && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="flex gap-0.5 items-end h-3">
                                        <div className="w-0.5 h-3 bg-white animate-music-bar-1" />
                                        <div className="w-0.5 h-2 bg-white animate-music-bar-2" />
                                        <div className="w-0.5 h-1 bg-white animate-music-bar-3" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className={`font-medium ${music.currentSong?.id === song.id ? "text-pink-500" : ""}`}>
                                {song.title}
                            </div>
                            <div className="text-xs text-gray-500">{song.artist}</div>
                        </div>
                        <div className="text-xs text-gray-400">
                            {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Now Playing Footer */}
            <div className="h-20 bg-gray-100 dark:bg-[#252525] border-t border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between">
                {music.currentSong ? (
                    <>
                        <div className="flex items-center gap-3 w-1/3">
                            <img src={music.currentSong.cover} className="w-12 h-12 rounded shadow" />
                            <div className="min-w-0">
                                <div className="text-sm font-semibold truncate">{music.currentSong.title}</div>
                                <div className="text-xs text-gray-500 truncate">{music.currentSong.artist}</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-1/3">
                            <div className="flex items-center gap-6">
                                <SkipBack size={20} className="fill-current text-gray-400 hover:text-black dark:hover:text-white transition" />
                                <button onClick={toggleMusic} className="bg-white dark:bg-white text-black rounded-full p-2 shadow hover:scale-105 transition">
                                    {music.isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
                                </button>
                                <SkipForward size={20} className="fill-current text-gray-400 hover:text-black dark:hover:text-white transition" />
                            </div>
                        </div>

                        <div className="w-1/3" />
                    </>
                ) : (
                    <div className="flex items-center justify-center w-full text-gray-400 text-sm">
                        Select a song to play
                    </div>
                )}
            </div>

        </div>
    );
}

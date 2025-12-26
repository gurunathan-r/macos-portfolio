"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/context/OSContext";
import { Music as MusicIcon, Pause, Play, SkipForward } from "lucide-react";

export default function DynamicIsland() {
    const { music, toggleMusic } = useOS();

    return (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] flex justify-center">
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-black rounded-[20px] overflow-hidden text-white"
                style={{
                    height: music.isPlaying ? 160 : 35,
                    width: music.isPlaying ? 350 : 120, // Expanded vs Collapsed
                }}
            >
                <div className="relative h-full w-full p-4 flex flex-col justify-between">
                    {/* Collapsed State Content (Always visible roughly) or conditional */}
                    {!music.isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-between px-3"
                        >
                            <div className="w-1/3 bg-transparent" />
                            <div className="w-1/3 h-full" /> {/* Camera cutout area usually */}
                            <div className="w-1/3" />
                        </motion.div>
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {music.isPlaying && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col h-full w-full"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                                        {music.currentSong?.cover ? (
                                            <img src={music.currentSong.cover} alt="album" className="w-full h-full rounded-lg object-cover" />
                                        ) : (
                                            <MusicIcon className="text-pink-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold truncate">{music.currentSong?.title || "No Song"}</div>
                                        <div className="text-xs text-gray-400 truncate">{music.currentSong?.artist || "Unknown Artist"}</div>
                                    </div>
                                    <div className="animate-pulse">
                                        <div className="flex gap-1 items-end h-4">
                                            <div className="w-1 h-2 bg-green-400 animate-music-bar-1" />
                                            <div className="w-1 h-4 bg-green-400 animate-music-bar-2" />
                                            <div className="w-1 h-3 bg-green-400 animate-music-bar-3" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex items-end justify-center">
                                    <div className="w-full">
                                        {/* Progress Bar */}
                                        <div className="h-1 w-full bg-gray-600 rounded-full mb-4 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-white"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "45%" }}
                                            />
                                        </div>

                                        {/* Controls */}
                                        <div className="flex justify-center gap-8 items-center">
                                            <SkipForward className="rotate-180 fill-current w-6 h-6" />
                                            <Pause
                                                className="fill-current w-8 h-8 cursor-pointer"
                                                onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
                                            />
                                            <SkipForward className="fill-current w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

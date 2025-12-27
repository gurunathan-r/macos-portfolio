"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Lock, Smartphone, Camera, Phone, ChevronLeft, BatteryMedium, Signal, Wifi, BellOff, Flashlight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/context/OSContext";

export default function Mirroring() {
    const [state, setState] = useState<'connecting' | 'lock_screen' | 'camera' | 'phone'>('connecting');
    const [showLockedMessage, setShowLockedMessage] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setTimeout(() => setState('lock_screen'), 3000);
        const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(clockTimer);
        };
    }, []);

    const handleSwipeUp = (info: any) => {
        if (info.offset.y < -50) {
            setShowLockedMessage(true);
            setTimeout(() => setShowLockedMessage(false), 2000);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const { music } = useOS();

    return (
        <div className="h-full w-full bg-black flex flex-col items-center justify-center text-white relative overflow-hidden select-none font-sans">
            {/* Bezel / Dynamic Island Area (Simulated) */}
            <div className="absolute top-0 w-full h-8 z-50 flex justify-between items-center px-6 pt-2">
                <div className="text-xs font-medium w-1/3 pl-2 flex items-center gap-1">
                    {state !== 'connecting' && state !== 'lock_screen' && formatTime(currentTime)}
                    {state === 'lock_screen' && (
                        <>
                            <span>JT</span>
                            <BellOff size={10} fill="currentColor" />
                        </>
                    )}
                </div>
                <div className="w-1/3 flex justify-center z-50">
                    <motion.div
                        initial={false}
                        animate={{
                            width: music.isPlaying ? 120 : 96,
                            height: music.isPlaying ? 28 : 28,
                            borderRadius: 20
                        }}
                        className="bg-black flex items-center justify-center relative overflow-hidden transition-all duration-300 ease-spring"
                    >
                        {!music.isPlaying && <div className="w-24 h-7" />} {/* Static State */}

                        {music.isPlaying && (
                            <div className="flex items-center justify-between w-full px-2 gap-2">
                                <img src={music.currentSong?.cover} className="w-5 h-5 rounded-full animate-spin-slow" alt="cover" />
                                <div className="flex gap-0.5 items-end h-3 pb-1">
                                    <motion.div animate={{ height: [4, 12, 6, 12, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-0.5 bg-green-400 rounded-full" />
                                    <motion.div animate={{ height: [6, 16, 8, 14, 6] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }} className="w-0.5 bg-green-400 rounded-full" />
                                    <motion.div animate={{ height: [4, 10, 5, 12, 4] }} transition={{ repeat: Infinity, duration: 1.3, delay: 0.2 }} className="w-0.5 bg-green-400 rounded-full" />
                                    <motion.div animate={{ height: [5, 14, 7, 10, 5] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.3 }} className="w-0.5 bg-green-400 rounded-full" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
                <div className="w-1/3 flex justify-end gap-1.5 pr-2">
                    <Signal size={14} fill="currentColor" />
                    <Wifi size={14} />
                    <BatteryMedium size={14} />
                </div>
            </div>

            {/* Content */}
            <div className="w-full h-full relative">
                <AnimatePresence mode="wait">
                    {state === 'connecting' && (
                        <motion.div
                            key="connecting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center gap-6 bg-black"
                        >
                            <Smartphone size={64} className="text-gray-500 animate-pulse" strokeWidth={1} />
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-gray-400" size={20} />
                                <p className="text-sm text-gray-400 font-medium">Connecting to</p>
                                <p className="text-base font-semibold">Guru&apos;s iPhone 17 Pro</p>
                            </div>
                        </motion.div>
                    )}

                    {state === 'lock_screen' && (
                        <motion.div
                            key="lock_screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full relative bg-cover bg-center flex flex-col items-center pt-14 text-white"
                            style={{ backgroundImage: "url('https://www.iclarified.com/images/news/98545/469065/469065.jpg')" }} // User requested wallpaper
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            onDragEnd={(_, info) => handleSwipeUp(info)}
                        >
                            {/* Status Bar Override removed (handled in parent now) */}

                            <div className="flex flex-col items-center w-full mt-4">
                                <div className="text-lg font-medium text-white/90 drop-shadow-md mb-0">
                                    {currentTime.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                                </div>
                                <div className="text-[5.5rem] leading-none font-bold tracking-tighter text-white/40 drop-shadow-lg font-sans scale-y-[1.5] origin-top">
                                    {formatTime(currentTime)}
                                </div>
                            </div>

                            {/* Notifications / Center Space */}
                            <div className="flex-1 w-full flex items-center justify-center">
                                <AnimatePresence>
                                    {showLockedMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-2 shadow-xl border border-white/5"
                                        >
                                            <Lock size={16} />
                                            <span className="font-medium text-sm">iCloud Locked</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom Buttons */}
                            <div className="w-full px-12 pb-10 flex justify-between items-end relative z-20">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setState('phone'); }}
                                    className="w-12 h-12 rounded-full bg-gray-500/30 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition active:scale-95 border border-white/10 shadow-lg"
                                >
                                    <Phone size={20} fill="white" className="stroke-none" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setState('camera'); }}
                                    className="w-12 h-12 rounded-full bg-gray-500/30 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition active:scale-95 border border-white/10 shadow-lg"
                                >
                                    <Camera size={20} fill="white" className="stroke-none" />
                                </button>
                            </div>

                            {/* Home Bar */}
                            <div className="absolute bottom-2 w-32 h-1 bg-white rounded-full opacity-80" />
                        </motion.div>
                    )}

                    {state === 'camera' && (
                        <motion.div
                            key="camera"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="h-full w-full bg-black relative flex flex-col"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => { if (info.offset.x > 100) setState('lock_screen'); }}
                        >
                            {/* Viewfinder (Dummy) */}
                            <div className="flex-1 bg-[#1a1a1a] relative m-0 rounded-b-3xl overflow-hidden mt-12">
                                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
                                    <div className="border border-white/30" /> <div className="border border-white/30" /> <div className="border border-white/30" />
                                    <div className="border border-white/30" /> <div className="border border-white/30" /> <div className="border border-white/30" />
                                    <div className="border border-white/30" /> <div className="border border-white/30" /> <div className="border border-white/30" />
                                </div>
                                <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs font-mono text-yellow-500">
                                    AF-L
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="h-32 bg-black flex flex-col items-center justify-center gap-4 pb-6">
                                <div className="flex gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest">
                                    <span>Cinematic</span>
                                    <span>Video</span>
                                    <span className="text-yellow-500">Photo</span>
                                    <span>Portrait</span>
                                    <span>Pano</span>
                                </div>
                                <div className="flex items-center justify-between w-full px-8">
                                    <div className="w-12 h-12 bg-gray-800 rounded-md" /> {/* Gallery Preview */}
                                    <div className="w-16 h-16 rounded-full border-4 border-white bg-white active:scale-95 transition cursor-pointer shadow-lg" /> {/* Shutter */}
                                    <button onClick={() => setState('lock_screen')} className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
                                        <ChevronLeft /> {/* Back/Flip */}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {state === 'phone' && (
                        <motion.div
                            key="phone"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            className="h-full w-full bg-white dark:bg-black relative flex flex-col pt-12"
                        >
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
                                <button onClick={() => setState('lock_screen')} className="text-blue-500 flex items-center text-lg">
                                    <ChevronLeft /> Back
                                </button>
                                <span className="text-lg font-semibold ml-auto mr-auto pr-8">Emergency</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center pt-10 px-6">
                                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-gray-500">
                                    G
                                </div>
                                <h2 className="text-3xl font-bold mb-1">GURU</h2>
                                <p className="text-gray-500 text-lg mb-8">iPhone Owner</p>

                                <a
                                    href="tel:+919003015441"
                                    className="w-full bg-gray-100 dark:bg-[#1c1c1e] rounded-xl p-4 flex items-center justify-between mb-4 cursor-pointer active:bg-gray-200 dark:active:bg-[#2c2c2e] transition block text-inherit no-underline"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">mobile</span>
                                        <span className="text-blue-500 text-xl font-medium">+91 9003015441</span>
                                    </div>
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <Phone size={20} fill="white" />
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {state !== 'connecting' && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-50 pointer-events-none" />
                )}
            </div>
        </div>
    );
}

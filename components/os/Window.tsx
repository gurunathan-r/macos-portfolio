"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { AppID, WindowState } from "@/types/os";
import { useOS } from "@/context/OSContext";

interface WindowProps {
    windowState: WindowState;
    children: React.ReactNode;
}

export default function Window({ windowState, children }: WindowProps) {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOS();

    // Calculate approximate dock position based on App ID for the genie effect origin
    // In a real app we'd use getBoundingClientRect of the dock icon, but fixed values work for this demo
    const dockPositions: Record<AppID, number> = {
        about: -200,
        settings: -120,
        safari: -40,
        mail: 40,
        music: 120,
        mirroring: 200,
    };

    const exitX = dockPositions[windowState.id] || 0;

    return (
        <AnimatePresence>
            {windowState.isOpen && !windowState.isMinimized && (
                <motion.div
                    drag
                    dragMomentum={false}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: "-50%",
                        y: "50vh", // Start from bottom
                        marginLeft: exitX
                    }}
                    animate={{
                        opacity: 1,
                        scale: windowState.isMaximized ? 1 : 1,
                        width: windowState.isMaximized ? "100%" : (windowState.id === 'mirroring' ? "320px" : "800px"),
                        height: windowState.isMaximized ? "calc(100% - 32px)" : (windowState.id === 'mirroring' ? "680px" : "600px"),
                        x: windowState.isMaximized ? 0 : "-50%",
                        y: windowState.isMaximized ? 0 : "-50%",
                        marginLeft: 0, // Reset margin
                        borderRadius: windowState.isMaximized ? 0 : (windowState.id === 'mirroring' ? "48px" : "12px"),
                        top: windowState.isMaximized ? "32px" : "50%",
                        left: windowState.isMaximized ? 0 : "50%",
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0,
                        x: "-50%",
                        y: "50vh", // Exit to bottom
                        marginLeft: exitX
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                    style={{ zIndex: windowState.zIndex, position: 'absolute' }}
                    className="pointer-events-auto bg-white dark:bg-[#1e1e1e] shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80 select-none cursor-default"
                    onMouseDown={() => focusWindow(windowState.id)}
                >
                    {/* Title Bar */}
                    <div
                        className="h-10 bg-gray-100 dark:bg-[#2a2a2a] flex items-center px-4 justify-between select-none shrink-0"
                        onDoubleClick={() => maximizeWindow(windowState.id)}
                    >
                        <div className="flex space-x-2 group">
                            <button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeWindow(windowState.id);
                                }}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-[8px] text-transparent group-hover:text-black opacity-100 transition-all"
                            >
                                <X size={6} />
                            </button>
                            <button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    minimizeWindow(windowState.id);
                                }}
                                className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-[8px] text-transparent group-hover:text-black opacity-100 transition-all"
                            >
                                <Minus size={6} />
                            </button>
                            <button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    maximizeWindow(windowState.id);
                                }}
                                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-[8px] text-transparent group-hover:text-black opacity-100 transition-all"
                            >
                                {windowState.isMaximized ? <Minimize2 size={6} /> : <Maximize2 size={6} />}
                            </button>
                        </div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {windowState.title}
                        </div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto relative">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

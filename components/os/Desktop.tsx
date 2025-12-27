"use client";

import DynamicIsland from "./DynamicIsland";
import { useOS } from "@/context/OSContext";
import MenuBar from "@/components/os/MenuBar";
import Dock from "@/components/os/Dock";
import WindowManager from "@/components/os/WindowManager";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState, useRef } from "react";
import Notification from "@/components/os/Notification";

export default function Desktop() {
    const { wallpaper, music } = useOS();
    const isMobile = useIsMobile();
    const [notification, setNotification] = useState({ visible: false, title: "", message: "" });
    const hasShownBootNotification = useRef(false);

    useEffect(() => {
        if (!isMobile || hasShownBootNotification.current) return;

        const timer = setTimeout(() => {
            setNotification({ visible: true, title: "Tips", message: "Double tap anywhere on the app to close it." });
            const audio = new Audio('/assets/notification.mp3');
            audio.play().catch(e => console.log("Audio play failed (interaction required?)", e));
            hasShownBootNotification.current = true;

            setTimeout(() => {
                setNotification(prev => ({ ...prev, visible: false }));
            }, 6000); // Hide after 6s
        }, 1500); // Show after 1.5s delay

        return () => clearTimeout(timer);
    }, [isMobile]);

    // Music Notification
    useEffect(() => {
        if (music.currentSong && music.isPlaying) {
            setNotification({
                visible: true,
                title: "Now Playing",
                message: `${music.currentSong.title} - ${music.currentSong.artist}`
            });

            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, visible: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [music.currentSong]);

    useEffect(() => {
        if (!isMobile) return;

        const handleInteraction = () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.log("Fullscreen request failed", err);
                });
            }
        };

        // Attempt on first touch or click
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isMobile]);

    return (
        <div
            className="h-full w-full bg-cover bg-center overflow-hidden relative"
            style={{ backgroundImage: `url(${wallpaper})` }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <MenuBar />

            {/* OS Content Area */}
            <div className="absolute inset-0 pt-8 pb-20 pointer-events-none">
                <WindowManager />
            </div>

            <Notification
                visible={notification.visible}
                title={notification.title}
                message={notification.message}
                onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
            />

            <Dock />
        </div>
    );
}

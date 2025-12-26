"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { AppID } from "@/types/os";
import { useOS } from "@/context/OSContext";
import { Monitor, CreditCard, Chrome, Mail, Music, Smartphone, User } from "lucide-react"; // Icons for apps

function DockIcon({
    mouseX,
    id,
    title,
    icon,
}: {
    mouseX: any;
    id: AppID;
    title: string;
    icon: any;
}) {
    const { openWindow, windows } = useOS();
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square rounded-xl bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer relative group"
            onClick={() => openWindow(id)}
        >
            <span className="absolute -top-12 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {title}
            </span>
            {typeof icon === 'string' ? (
                <img src={icon} alt={title} className="w-full h-full object-cover rounded-xl" />
            ) : (
                <div className="w-1/2 h-1/2 flex items-center justify-center">
                    {/* Render Lucide icon as component */}
                    {(() => {
                        const Icon = icon;
                        return <Icon className="text-gray-800 dark:text-white w-full h-full" />;
                    })()}
                </div>
            )}
            {windows[id].isOpen && (
                <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full" />
            )}
        </motion.div>
    );
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
    const { theme } = useOS();

    const getIcon = (name: string) => {
        return theme === 'dark' ? `/assets/${name}-dark.png` : `/assets/${name}.png`;
    }

    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 flex h-16 items-end gap-4 rounded-2xl bg-white/20 px-4 pb-3 dark:bg-black/20 backdrop-blur-2xl border border-white/10 z-50"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            <DockIcon mouseX={mouseX} id="about" title="About Me" icon={getIcon('profile')} />
            <DockIcon mouseX={mouseX} id="settings" title="Settings" icon={getIcon('settings')} />
            <DockIcon mouseX={mouseX} id="safari" title="Safari" icon={getIcon('safari')} />
            <DockIcon mouseX={mouseX} id="mail" title="Mail" icon={getIcon('mail')} />
            <DockIcon mouseX={mouseX} id="music" title="Music" icon={getIcon('music')} />
            <DockIcon mouseX={mouseX} id="mirroring" title="iPhone Mirroring" icon={getIcon('mirroring')} />
        </div>
    );
}

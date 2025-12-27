"use client";

import DynamicIsland from "./DynamicIsland";
import { useOS } from "@/context/OSContext";
import MenuBar from "@/components/os/MenuBar";
import Dock from "@/components/os/Dock";
import WindowManager from "@/components/os/WindowManager";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Desktop() {
    const { wallpaper } = useOS();
    const isMobile = useIsMobile();

    return (
        <div
            className="h-full w-full bg-cover bg-center overflow-hidden relative"
            style={{ backgroundImage: `url(${wallpaper})` }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {!isMobile && <MenuBar />}

            {/* OS Content Area */}
            <div className={`absolute inset-0 pointer-events-none ${isMobile ? 'pt-0 pb-0' : 'pt-8 pb-20'}`}>
                <WindowManager />
            </div>

            <Dock />
        </div>
    );
}

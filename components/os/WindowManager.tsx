"use client";

import { useOS } from "@/context/OSContext";
import Window from "@/components/os/Window";
import About from "@/components/apps/About";
import Settings from "@/components/apps/Settings";
import Safari from "@/components/apps/Safari";
import Mail from "@/components/apps/Mail";
import Music from "@/components/apps/Music";
import Mirroring from "@/components/apps/Mirroring";

export default function WindowManager() {
    const { windows } = useOS();

    return (
        <>
            <Window windowState={windows.about}>
                <About />
            </Window>
            <Window windowState={windows.settings}>
                <Settings />
            </Window>
            <Window windowState={windows.safari}>
                <Safari />
            </Window>
            <Window windowState={windows.mail}>
                <Mail />
            </Window>
            <Window windowState={windows.music}>
                <Music />
            </Window>
            <Window windowState={windows.mirroring}>
                <Mirroring />
            </Window>
        </>
    );
}

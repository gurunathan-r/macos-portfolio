"use client";

import Desktop from "@/components/os/Desktop";
import BootScreen from "@/components/os/BootScreen";
import { useState } from "react";

export default function Home() {
    const [isBooting, setIsBooting] = useState(true);

    return (
        <main className="h-screen w-screen overflow-hidden">
            {isBooting ? (
                <BootScreen onComplete={() => setIsBooting(false)} />
            ) : (
                <Desktop />
            )}
        </main>
    );
}

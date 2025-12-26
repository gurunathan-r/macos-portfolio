"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple } from "lucide-react";

// Fake kernel logs to look like MacOS Verbose Boot
const BOOT_LOGS = [
    "root: xnu-8792.81.2~2/RELEASE_ARM64_T6000 arm64",
    "pmap_startup() init",
    "kext submap [0xfffffe0007464000 - 0xfffffe8007c64000], size 0x7800000",
    "disable_kalsr()",
    "sleh_init() complete",
    "IOAPIC: Version 0x20 Vectors 64:87",
    "ACPI: System State [S0 S3 S4 S5] (S3)",
    "AppleACPICPU: ProcessorId=1 LocalApicId=0 Enabled",
    "AppleACPICPU: ProcessorId=2 LocalApicId=2 Enabled",
    "AppleACPICPU: ProcessorId=3 LocalApicId=4 Enabled",
    "AppleACPICPU: ProcessorId=4 LocalApicId=6 Enabled",
    "security: SecPolicy: loaded policy",
    "AppleKeyStore: operation failed (pid: 0 sel: 7 ret: e00002c2",
    "AppleSMC: SMC Init Complete",
    "AppleFSCompressionTypeZlib kmod start",
    "AppleFSCompressionTypeLZVN kmod start",
    "AppleFSCompressionTypeDataless kmod start",
    "AppleThunderboltNHI: Thunderbolt 3 Support",
    "IOConsoleUsers: time(0) 0->0, lin 0, llk 1,",
    "IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, now 0, sm 0x0",
    "ARPT: 1.545781: AirPort_BrcmNIC::init: <airport_BrcmNIC_T>",
    "BTCOEXIST off",
    "BRCM tunables:",
    "  pullmode[1] txringsize[  256] txsendqsize[1024] reap[  256]",
    "  ts[131072] tc[131072] mute[   30] bf[  10] gtxt[   0] rom[   0]",
    "loginwindow[395]: Login Window Started Security Agent",
    "UserEventAgent[403]: Captive: [UserAgentStartup:158] UserAgent started",
    "Running fsck on the boot volume...",
    "fsck_apfs: volume is clean",
    "mount_apfs: mounted volume: /",
    "Selecting boot target...",
    "Booting...",
    "Welcome to customOS",
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [stage, setStage] = useState<"verbose" | "logo">("verbose");
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sequence 1: Verbose Logs
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex >= BOOT_LOGS.length) {
                clearInterval(interval);
                setTimeout(() => setStage("logo"), 800);
                return;
            }
            setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
            currentIndex++;

            // Auto scroll to bottom
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 120);

        return () => clearInterval(interval);
    }, []);

    // Sequence 2: Logo Progress Bar
    useEffect(() => {
        if (stage === "logo") {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + 2;
                    if (next >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setExiting(true), 500); // Trigger exit animation
                        return 100;
                    }
                    return next;
                });
            }, 60);

            return () => clearInterval(interval);
        }
    }, [stage]);

    // Sequence 3: Exit
    useEffect(() => {
        if (exiting) {
            const timer = setTimeout(onComplete, 1000); // Wait for fade out
            return () => clearTimeout(timer);
        }
    }, [exiting, onComplete]);

    return (
        <AnimatePresence>
            {!exiting && ( // Logic handled by animating opacity state instead of exit prop if simpler
                <motion.div
                    className="fixed inset-0 bg-black text-white z-[9999] overflow-hidden cursor-wait"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: exiting ? 0 : 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Stage 1: Verbose Mode */}
                    {stage === "verbose" && (
                        <div
                            ref={scrollRef}
                            className="h-full w-full p-2 md:p-10 font-mono text-xs md:text-sm leading-tight text-gray-300 overflow-y-auto"
                            style={{ fontFamily: "'Courier New', Courier, monospace" }}
                        >
                            {logs.map((log, i) => (
                                <div key={i} className="mb-0.5">{log}</div>
                            ))}
                        </div>
                    )}

                    {/* Stage 2: Apple Logo */}
                    {stage === "logo" && (
                        <motion.div
                            className="h-full w-full flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Apple size={100} className="text-white mb-16" fill="white" />

                            <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

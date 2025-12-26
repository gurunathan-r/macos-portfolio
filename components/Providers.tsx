"use client";

import { OSProvider } from "@/context/OSContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return <OSProvider>{children}</OSProvider>;
}

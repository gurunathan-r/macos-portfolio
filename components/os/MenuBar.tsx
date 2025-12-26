"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Apple, Battery, Wifi, Search, Control } from "lucide-react";

export default function MenuBar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-8 w-full bg-black/20 backdrop-blur-xl flex items-center px-4 justify-between text-white text-sm select-none z-50 fixed top-0 left-0">
            <div className="flex items-center gap-4">
                <Apple size={18} className="fill-current" />
                <span className="font-semibold">Portfolio</span>
                <div className="hidden md:flex gap-4 opacity-90">
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Go</span>
                    <span>Window</span>
                    <span>Help</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Battery size={18} />
                <Wifi size={18} />
                <Search size={16} />
                <span>{format(time, "EEE MMM d h:mm aa")}</span>
            </div>
        </div>
    );
}

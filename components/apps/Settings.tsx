"use client";

import { useOS } from "@/context/OSContext";
import { Moon, Sun } from "lucide-react";

const wallpapers = [
    "https://4kwallpapers.com/images/walls/thumbs_2t/22674.jpg", // Abstract Dark
    "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=3870", // Dark Mountain
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=3870", // Yosemite
    "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&q=80&w=3870", // Landscape
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2400", // Abstract Light
];

export default function Settings() {
    const { theme, setTheme, setWallpaper, wallpaper } = useOS();

    return (
        <div className="h-full bg-gray-50 dark:bg-[#1e1e1e] p-6 text-black dark:text-white overflow-auto">
            <h1 className="text-2xl font-bold mb-6">System Settings</h1>

            {/* Appearance */}
            <section className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Appearance</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-gray-800' : 'border-transparent bg-white dark:bg-gray-800 hover:bg-gray-100'}`}
                    >
                        <Sun size={24} />
                        <span className="text-sm">Light</span>
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${theme === 'dark' ? 'border-blue-500 bg-gray-800' : 'border-transparent bg-white dark:bg-gray-800 hover:bg-gray-100'}`}
                    >
                        <Moon size={24} />
                        <span className="text-sm">Dark</span>
                    </button>
                </div>
            </section>

            {/* Wallpaper */}
            <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Wallpaper</h2>
                <div className="grid grid-cols-2 gap-4">
                    {wallpapers.map((url, index) => (
                        <div
                            key={index}
                            onClick={() => setWallpaper(url)}
                            className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer ring-offset-2 ring-offset-gray-50 dark:ring-offset-[#1e1e1e] transition ${wallpaper === url ? 'ring-2 ring-blue-500' : 'hover:opacity-80'}`}
                        >
                            <img src={url} alt="Wallpaper" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

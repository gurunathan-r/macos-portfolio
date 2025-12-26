"use client";

import { useState } from "react";
import { Send, User, ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";

export default function Mail() {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const handleSend = () => {
        if (!subject && !body) return;

        const email = "gurunathan6002@gmail.com";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open default mail client
        window.location.href = mailtoLink;

        // Optional: clear form or show success feedback (not fully possible with mailto since we don't know if they actually sent it)
    };

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-row font-sans">
            {/* Sidebar (Fake Mailbox List) */}
            <div className="w-16 md:w-64 bg-gray-100 dark:bg-[#2a2d31] border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Window Controls Spacer */}
                <div className="h-12 flex items-center px-4">
                    <div className="flex gap-4 ml-14 md:ml-0 md:hidden">
                        <Menu size={18} className="text-gray-500" />
                    </div>
                </div>

                <div className="p-2 gap-1 flex flex-col">
                    <div className="px-3 py-1.5 rounded-md bg-[#007aff] text-white flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Send size={14} />
                            <span className="hidden md:inline">Inbox</span>
                        </div>
                        <span className="hidden md:inline text-xs opacity-80">1</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 flex items-center justify-between text-sm transition cursor-pointer">
                        <div className="flex items-center gap-2">
                            <Send size={14} className="rotate-45" />
                            <span className="hidden md:inline">Sent</span>
                        </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 flex items-center justify-between text-sm transition cursor-pointer">
                        <div className="flex items-center gap-2">
                            <Send size={14} />
                            <span className="hidden md:inline">Drafts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Compose) */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between bg-white dark:bg-[#1e1e1e]">
                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <ChevronLeft size={20} />
                        </button>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">New Message</span>
                    <button
                        onClick={handleSend}
                        className="text-[#007aff] hover:text-[#0056b3] transition p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Send Email"
                    >
                        <Send size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-auto">
                    <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 p-3">
                        <span className="text-gray-500 w-16 text-sm text-right px-2">To:</span>
                        <div className="bg-[#007aff]/10 text-[#007aff] px-2 py-0.5 rounded text-sm font-medium flex items-center gap-1">
                            <span>Gurunathan R</span>
                            <span className="text-xs opacity-70">&lt;gurunathan6002@gmail.com&gt;</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 p-3">
                        <span className="text-gray-500 w-16 text-sm text-right px-2">Cc:</span>
                        <input className="flex-1 bg-transparent outline-none text-sm dark:text-white" disabled />
                    </div>

                    <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 p-3">
                        <span className="text-gray-500 w-16 text-sm text-right px-2">Subject:</span>
                        <input
                            className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder="Project Inquiry"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <textarea
                        className="w-full h-[calc(100%-150px)] p-6 bg-transparent outline-none resize-none text-gray-800 dark:text-gray-200 font-sans leading-relaxed"
                        placeholder="Hi Gurunathan, I saw your portfolio and..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

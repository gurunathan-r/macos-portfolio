
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface NotificationProps {
    title: string;
    message: string;
    visible: boolean;
    onClose: () => void;
}

export default function Notification({ title, message, visible, onClose }: NotificationProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -100, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -100, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="fixed top-12 left-1/2 w-[90vw] max-w-sm bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl z-[100] cursor-pointer border border-white/20"
                    onClick={onClose}
                >
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-6 h-6 text-green-500 fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{title}</h4>
                                <span className="text-xs text-gray-500">now</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-tight mt-0.5">
                                {message}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

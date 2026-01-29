"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            toastOptions={{
                className: "glass shadow-glass border-white/20 rounded-xl p-4",
                style: {
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: 'var(--foreground)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                }
            }}
            {...props}
        />
    );
};

export { Toaster };

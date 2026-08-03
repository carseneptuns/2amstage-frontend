import { footer } from "framer-motion/client";
import React from "react";

export  default function Footer () {
    return (
        <footer className="border-t border-white/10 bg-[#090D16]">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* logo */}
                <h2 className="text-3xl font-black tracking-wide">
                    <span className="text-white">2AM</span>
                    <span className="text-amber-400">STAGE</span>
                </h2>

                <p className="text-grey-400 mt-3 max-w-md">
                    find your next unforgettable concert experience.
                </p>

                {/* navigation */}
                <div className="flex flex-wrap gap-8 mt-8 text-gray-400">

                    <a href="#" className="hover:text-amber-400 transition">Home</a>
                    <a href="#" className="hover:text-amber-400 transition">Concerts</a>
                    <a href="#" className="hover:text-amber-400 transition">About</a>
                    <a href="#" className="hover:text-amber-400 transition">Contact</a>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                     © 2026 2AMStage. All rights reserved.
                </p>
                <div className="flex gap-5 text-gray-400">
                    <a href="#" className="hover:text-amber-400 transaction">
                        Instagram
                    </a>
                    <a href="#" className="hover:text-amber-400 transaction">
                        Tiktok
                    </a>
                    <a href="#" className="hover:text-amber-400 transaction">
                        X
                    </a>
                </div>
                </div>
            </div>
        </footer>
    );
}
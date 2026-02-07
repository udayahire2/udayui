"use client";

import React from "react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const AnimatedShaderBackgroundDemo = () => {
    return (
        <div className="w-full h-screen bg-black relative">
            <AnimatedShaderBackground />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-white text-4xl font-bold z-10">Shader Background</h1>
            </div>
        </div>
    );
};

export default AnimatedShaderBackgroundDemo;

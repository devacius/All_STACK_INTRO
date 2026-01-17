
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

const TerminalHero = () => {
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const fullText = "Hey !! I'm Deepansh Gupta , a fanatical Full Stack Developer and Software Engineer. I like building cool stuff learn new things, forget them and relearn again . Ping me we can talk about bikes, music and coding.";

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index > fullText.length) {
                clearInterval(intervalId);
            }
        }, 50); // Adjust typing speed here

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <Card className="w-full max-w-3xl bg-card border-border border-2 p-6 shadow-none rounded-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-xs text-muted-foreground font-mono">user@portfolio:~</span>
                </div>
                <div className="font-mono text-base md:text-lg leading-relaxed text-foreground">
                    <span className="text-green-500 mr-2">$</span>
                    {text}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} inline-block w-2.5 h-5 bg-green-500 ml-1 align-middle`}></span>
                </div>
            </Card>
            <div className="mt-8 text-center animate-bounce">
                <span className="text-muted-foreground text-sm">Scroll down to explore</span>
            </div>
        </div>
    );
};

export default TerminalHero;

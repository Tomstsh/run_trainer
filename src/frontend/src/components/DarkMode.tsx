import { MoonStar, Slash } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DarkMode() {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    };
    
    return (
        <div className="absolute top-4 right-4">
            <Button onClick={toggleDarkMode} variant="outline" size="icon" className="relative">
                <span className="relative inline-block">
                    <MoonStar className="size-5" />
                    <span
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <Slash className="size-7" />
                    </span>
                </span>
            </Button>
        </div>
    )
}
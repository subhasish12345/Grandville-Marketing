import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#0a192f]/90 backdrop-blur-md shadow-lg py-3 border-b border-white/5'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <div className="bg-gradient-to-br from-amber-200 to-yellow-500 p-1.5 md:p-2 rounded-lg text-gray-900 shadow-lg shadow-amber-500/20 shrink-0">
                        <GraduationCap size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="font-bold text-base md:text-xl leading-tight text-white truncate md:overflow-visible md:whitespace-nowrap">
                            Grandville Marketing
                        </h1>
                        <p className="text-[10px] md:text-xs tracking-wider text-amber-400 font-medium truncate">
                            APOLLO GROUP
                        </p>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'About', 'Institutes', 'Programs'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="bg-gold-gradient hover:brightness-110 text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transform hover:-translate-y-0.5"
                    >
                        Teacher Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#0a192f] border-t border-white/10 shadow-xl py-4 px-4 flex flex-col gap-4">
                    {['Home', 'About', 'Institutes', 'Programs'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-gray-300 hover:text-amber-400 font-medium py-3 border-b border-white/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="bg-gold-gradient text-gray-900 px-5 py-3 rounded-lg text-sm font-bold w-full mt-2"
                    >
                        Teacher Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

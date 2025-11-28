import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, Globe, BookOpen, GraduationCap, PenTool, Lightbulb } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, x, y, color }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0]
        }}
        transition={{
            duration: 5,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className={`absolute ${x} ${y} ${color} pointer-events-none z-0`}
    >
        <Icon size={40} />
    </motion.div>
);

const Hero = () => {
    return (
        <div id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Floating Educational Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingIcon icon={BookOpen} delay={0} x="left-[10%]" y="top-[20%]" color="text-blue-400/20" />
                <FloatingIcon icon={GraduationCap} delay={2} x="right-[15%]" y="top-[15%]" color="text-amber-400/20" />
                <FloatingIcon icon={PenTool} delay={1} x="left-[20%]" y="bottom-[20%]" color="text-purple-400/20" />
                <FloatingIcon icon={Lightbulb} delay={3} x="right-[25%]" y="bottom-[30%]" color="text-emerald-400/20" />
                <FloatingIcon icon={Globe} delay={4} x="left-[45%]" y="top-[10%]" color="text-cyan-400/20" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium mb-6">
                        <Globe size={14} />
                        <span>Global Certification Program</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                        Teach Local, <br />
                        <span className="text-gold-gradient">Certified Global.</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                        Elevate your teaching career with the Apollo Group's Dubai-Certified Training Program.
                        Gain international recognition and master modern pedagogical skills.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button
                            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-gold-gradient hover:brightness-110 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group"
                        >
                            Check Eligibility
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/10"
                        >
                            Learn More
                        </button>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span>KHDA Recognized</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                            <span>16+ Institutes</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Visual - Glass Certificate & Rotating Circle */}
                <div className="relative h-[500px] flex items-center justify-center hidden lg:flex">
                    {/* Rotating Circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[450px] h-[450px] rounded-full border-[3px] border-white/5 border-t-amber-500/50 border-r-blue-500/50"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[350px] h-[350px] rounded-full border-[3px] border-white/5 border-b-amber-500/30"
                    />

                    {/* Glass Certificate Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: [0, -15, 0], opacity: 1 }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 1 }
                        }}
                        className="relative w-[400px] h-[280px] glass-card rounded-2xl p-6 flex flex-col justify-between z-10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
                    >
                        {/* Glossy Reflection */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />

                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <Award className="text-amber-400" size={32} />
                                <div>
                                    <h3 className="text-white font-bold text-lg">Dubai Certified</h3>
                                    <p className="text-white/50 text-xs">Teacher Training</p>
                                </div>
                            </div>
                            <div className="bg-white/10 px-2 py-1 rounded text-xs text-white/70">
                                Sample
                            </div>
                        </div>

                        <div className="space-y-2 my-4">
                            <div className="h-2 w-3/4 bg-white/10 rounded" />
                            <div className="h-2 w-full bg-white/10 rounded" />
                            <div className="h-2 w-5/6 bg-white/10 rounded" />
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="text-xs text-white/40 font-mono">
                                ID: 8839-2024
                            </div>
                            <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 opacity-80" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Badge behind */}
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -right-4 top-20 glass-card p-4 rounded-xl z-20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0a192f] flex items-center justify-center text-xs text-white">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">50+ Teachers</p>
                                <p className="text-green-400 text-xs">Registered Today</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

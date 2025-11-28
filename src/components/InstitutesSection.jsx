import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, School } from 'lucide-react';
import { institutes } from '../data/institutes';

const InstitutesSection = () => {
    return (
        <section id="institutes" className="py-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Partner Institutes
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join educators from across the Apollo Group network in this exclusive training program.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {institutes.map((institute, index) => (
                        <motion.div
                            key={institute.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={institute.image}
                                    alt={institute.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/30">
                                    {institute.type}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-white mb-2 line-clamp-2 min-h-[3rem]">
                                    {institute.name}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                    <MapPin size={16} className="text-amber-500" />
                                    <span className="truncate">{institute.location}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                                    {institute.departments.slice(0, 2).map((dept) => (
                                        <span key={dept} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded self-start">
                                            {dept}
                                        </span>
                                    ))}
                                    {institute.departments.length > 2 && (
                                        <span className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded self-start">
                                            +{institute.departments.length - 2}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-auto"
                                >
                                    <School size={16} />
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutesSection;

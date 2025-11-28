import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, Users } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
                            About The Program
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                            Bridging Apollo Educators to Global Standards
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            The Apollo Group of Institutes has partnered with leading educational bodies in Dubai to bring world-class pedagogical training to our faculty. This initiative is designed to equip our teachers with international best practices.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">International Curriculum</h4>
                                    <p className="text-sm text-gray-600">Aligned with global teaching standards and methodologies.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Recognized Certification</h4>
                                    <p className="text-sm text-gray-600">Valid across all 16 Apollo institutes and recognized in Dubai.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Expert Mentors</h4>
                                    <p className="text-sm text-gray-600">Learn from distinguished educators and industry leaders.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Teacher Training"
                                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Workshop"
                                className="rounded-2xl shadow-lg w-full h-64 object-cover"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

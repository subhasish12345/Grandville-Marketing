import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, BookOpen, XCircle, Send } from 'lucide-react';

const DecisionSection = () => {
    const [showRetentionPopup, setShowRetentionPopup] = useState(false);
    const [whatsappNumber, setWhatsappNumber] = useState('');

    const handleNotInterested = () => {
        setShowRetentionPopup(true);
    };

    const handleRetentionSubmit = (e) => {
        e.preventDefault();
        // In a real app, send to backend
        alert(`Thanks! We'll keep you updated on ${whatsappNumber}`);
        setShowRetentionPopup(false);
    };

    return (
        <section id="programs" className="py-20 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What's Your Next Step?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose the path that best fits your current career goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Option 1: Interested */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                            <UserCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">I am Interested</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Ready to upgrade your skills? Start your registration process now.
                        </p>
                        <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors">
                            Register Now
                        </button>
                    </motion.div>

                    {/* Option 2: Know More */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-16 h-16 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center mb-6">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">I Want to Know More</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Download the detailed brochure to understand the curriculum and benefits.
                        </p>
                        <button className="mt-auto w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition-colors">
                            Download Brochure
                        </button>
                    </motion.div>

                    {/* Option 3: Not Interested */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-red-50 rounded-2xl p-8 border border-red-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                            <XCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Not Interested?</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Not the right time? Let us know and we won't disturb you again.
                        </p>
                        <button
                            onClick={handleNotInterested}
                            className="mt-auto w-full border border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold transition-colors"
                        >
                            Skip for Now
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Retention Popup */}
            <AnimatePresence>
                {showRetentionPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowRetentionPopup(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <XCircle size={24} />
                            </button>

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Wait! Don't Miss Out</h3>
                                <p className="text-gray-600">
                                    Stay updated on future <strong>free workshops</strong> and training events?
                                </p>
                            </div>

                            <form onSubmit={handleRetentionSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        WhatsApp Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        value={whatsappNumber}
                                        onChange={(e) => setWhatsappNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Send size={18} />
                                    Keep Me Updated
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default DecisionSection;

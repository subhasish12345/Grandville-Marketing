import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">EduGlobal Apollo</h3>
                        <p className="text-slate-400 text-sm max-w-xs">
                            Empowering educators with world-class training and certification.
                            A joint initiative by Apollo Group of Institutes and Dubai Education Partners.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-blue-400">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">About Program</a></li>
                            <li><a href="#institutes" className="hover:text-white transition-colors">Partner Institutes</a></li>
                            <li><a href="#register" className="hover:text-white transition-colors">Register Now</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-blue-400">Contact</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>Ahmedabad, Gujarat</li>
                            <li>support@apollo-eduglobal.com</li>
                            <li>+91 98765 43210</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} Apollo Group of Institutes. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

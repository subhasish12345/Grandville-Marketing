import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Upload, AlertCircle } from 'lucide-react';
import { institutes } from '../data/institutes';
import SuccessModal from './SuccessModal';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dob: '',
        mobile: '',
        email: '',
        instituteId: '',
        department: '',
        designation: '',
        experience: '',
        qualification: '',
        trainingCategory: '',
        mode: '',
        timing: '',
        consentEmployed: false,
        consentCommunication: false
    });

    const [availableDepartments, setAvailableDepartments] = useState([]);

    // Update departments when institute changes
    useEffect(() => {
        if (formData.instituteId) {
            const selectedInstitute = institutes.find(i => i.id === parseInt(formData.instituteId));
            setAvailableDepartments(selectedInstitute ? selectedInstitute.departments : []);
            setFormData(prev => ({ ...prev, department: '' })); // Reset department
        }
    }, [formData.instituteId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Get institute name for easier display in admin
            const instituteName = institutes.find(i => i.id === parseInt(formData.instituteId))?.name || "Unknown";

            await addDoc(collection(db, "registrations"), {
                ...formData,
                instituteName,
                status: 'New Lead',
                createdAt: serverTimestamp()
            });

            setShowSuccess(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting form. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="register" className="py-20 bg-blue-50">
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    window.location.href = '/';
                }}
                message="Your registration has been submitted successfully! We will contact you shortly."
            />

            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-blue-600 p-6 text-white text-center">
                        <h2 className="text-2xl font-bold">Teacher Registration Form</h2>
                        <p className="text-blue-100 text-sm">Dubai Training Certification Program</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 text-gray-900">
                        {/* Progress Bar */}
                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>

                        {/* Section A: Personal Details */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Details</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="As per official ID" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91" />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button type="button" onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Section B: Professional Details */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Institute</label>
                                        <select name="instituteId" value={formData.instituteId} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="">Select Institute</option>
                                            {institutes.map(inst => (
                                                <option key={inst.id} value={inst.id}>{inst.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department / Subject</label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            disabled={!formData.instituteId}
                                        >
                                            <option value="">Select Department</option>
                                            {availableDepartments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                        {!formData.instituteId && <p className="text-xs text-orange-500 mt-1">Select Institute first</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                        <select name="designation" value={formData.designation} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="">Select Designation</option>
                                            <option value="PGT">PGT</option>
                                            <option value="TGT">TGT</option>
                                            <option value="Assistant Professor">Assistant Professor</option>
                                            <option value="Professor">Professor</option>
                                            <option value="Lecturer">Lecturer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900">Back</button>
                                    <button type="button" onClick={() => setStep(3)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Section C: Training Preferences */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Training Preferences</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Interested Training Category</label>
                                        <select name="trainingCategory" value={formData.trainingCategory} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="">Select Category</option>
                                            <option value="School Pedagogy">School Pedagogy</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Pharmacy">Pharmacy</option>
                                            <option value="Digital Tools">Digital Teaching Tools</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Mode</label>
                                            <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option value="">Select Mode</option>
                                                <option value="Online">Online</option>
                                                <option value="Offline">Offline</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Timing</label>
                                            <select name="timing" value={formData.timing} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option value="">Select Timing</option>
                                                <option value="Morning">Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900">Back</button>
                                    <button type="button" onClick={() => setStep(4)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Section D: Consent & Submit */}
                        {step === 4 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Final Confirmation</h3>

                                <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="consentEmployed"
                                            checked={formData.consentEmployed}
                                            onChange={handleChange}
                                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">I confirm that I am currently employed with the selected Apollo institute.</span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="consentCommunication"
                                            checked={formData.consentCommunication}
                                            onChange={handleChange}
                                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">I agree to receive communication on WhatsApp / Email regarding training updates.</span>
                                    </label>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={() => setStep(3)} className="text-gray-600 hover:text-gray-900">Back</button>
                                    <button
                                        type="submit"
                                        disabled={!formData.consentEmployed || !formData.consentCommunication || isSubmitting}
                                        className="bg-green-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold shadow-lg transition-all"
                                    >
                                        {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Check size={18} />}
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;

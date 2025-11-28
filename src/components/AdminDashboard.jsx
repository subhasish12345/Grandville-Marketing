import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, User, MoreVertical, LogOut } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [filter, setFilter] = useState('All');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convert timestamp to date string if it exists
                date: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
            }));
            setRegistrations(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New Lead': return 'bg-blue-100 text-blue-700';
            case 'Selected': return 'bg-yellow-100 text-yellow-700';
            case 'Trained': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage teacher registrations and training status.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                SA
                            </div>
                            <span className="text-sm font-medium">Super Admin</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Registrations", value: registrations.length, color: "blue" },
                        { label: "Pending Review", value: registrations.filter(r => r.status === 'New Lead').length, color: "yellow" },
                        { label: "Selected for Training", value: registrations.filter(r => r.status === 'Selected').length, color: "green" },
                        { label: "Certificates Issued", value: registrations.filter(r => r.status === 'Trained').length, color: "purple" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                            <h3 className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Filters & Actions */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, institute..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm">
                        <Download size={18} />
                        Export to Excel
                    </button>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Teacher Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Institute</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Department</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading data...</td>
                                    </tr>
                                ) : registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No registrations found.</td>
                                    </tr>
                                ) : (
                                    registrations.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.fullName}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.instituteName}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.department}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{row.date}</td>
                                            <td className="px-6 py-4 text-gray-400">
                                                <button className="hover:text-blue-600 p-1 rounded">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                        Showing {registrations.length} records
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

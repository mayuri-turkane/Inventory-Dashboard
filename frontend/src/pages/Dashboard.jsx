import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
    const [data, setData]   = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/dashboard-data')
            .then(r => { setData(r.data); setLoading(false); })
            .catch(() => navigate('/login'));
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="text-blue-400 text-lg">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center">
                <span className="text-xl font-bold">📦 Inventory</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400">Hi, {user?.name}</span>
                    <button onClick={logout}
                            className="text-sm text-gray-500 hover:text-red-400 transition">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-8">Your Dashboard</h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-1">Total Items</p>
                        <p className="text-4xl font-bold text-blue-400">{data?.stats?.totalItems}</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 font-semibold">Your Items</div>
                    <table className="w-full text-sm">
                        <thead><tr className="text-gray-500 text-xs uppercase border-b border-gray-800">
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Qty</th>
                        </tr></thead>
                        <tbody>
                        {data?.items.map(item => (
                            <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                <td className="px-6 py-4 font-medium">{item.title}</td>
                                <td className="px-6 py-4 text-gray-400">{item.category}</td>
                                <td className="px-6 py-4 text-blue-400 font-mono">{item.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
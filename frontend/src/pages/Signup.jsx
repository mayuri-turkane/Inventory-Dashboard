import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', form);
            // After signup, redirect to login so they can sign in
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-3">🚀</div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-400 mt-2">Join us to manage your inventory</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    {error && (
                        <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                            <input type="text" required
                                   className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                                   placeholder="John Doe"
                                   onChange={e => setForm({...form, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <input type="email" required
                                   className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                                   placeholder="you@example.com"
                                   onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Password</label>
                            <input type="password" required
                                   className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                                   placeholder="Minimum 6 characters"
                                   onChange={e => setForm({...form, password: e.target.value})} />
                        </div>
                        <button type="submit" disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50">
                            {loading ? 'Creating Account...' : 'Get Started'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
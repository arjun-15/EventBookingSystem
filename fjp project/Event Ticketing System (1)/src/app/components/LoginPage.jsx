import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Shield, CheckSquare, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../api/authService';

export const LoginPage = ({ onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('attendee');
    const [verified, setVerified] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [aadharNumber, setAadharNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [businessLicense, setBusinessLicense] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (!isLogin && !name) newErrors.name = 'Full name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (!isLogin && !acceptTerms) newErrors.terms = 'You must accept the terms and conditions';

        if (!isLogin && !verified && role !== 'attendee') {
            newErrors.verification = 'Identity verification is required for this role';
        }

        if (!isLogin && (role === 'organizer' || role === 'admin')) {
            if (!aadharNumber) newErrors.aadhar = 'Aadhar number is required';
            if (!contactNumber) newErrors.contact = 'Contact number is required';
            if (!businessLicense) newErrors.license = 'Business license is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                const userData = {
                    fullName: name,
                    email,
                    password,
                    role: role.toUpperCase(),
                    ...(role !== 'attendee' && { aadharNumber, contactNumber, businessLicense })
                };
                await authService.register(userData);
                // After registration, auto login or redir to login
                setIsLogin(true);
                alert('Registration successful! Please login.');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            alert(error.response?.data || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <button
                    onClick={onBack}
                    className="text-white mb-6 flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </button>

                <div className="glass rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-3xl text-white mb-6 text-center">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {!isLogin && (
                            <div>
                                <label className="text-white text-sm mb-2 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (errors.name) setErrors({ ...errors, name: '' });
                                        }}
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border ${errors.name ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                        placeholder="Full Name"
                                    />
                                    {errors.name && (
                                        <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>{errors.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-white text-sm mb-2 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: '' });
                                    }}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border ${errors.email ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div>
                            <label className="text-white text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`w-full pl-12 pr-12 py-3 rounded-lg bg-white/20 border ${errors.password ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {errors.password && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        {!isLogin && (
                            <div>
                                <label className="text-white text-sm mb-2 block">I am a</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setRole('attendee')}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${role === 'attendee'
                                            ? 'border-yellow-400 bg-yellow-400/20'
                                            : 'border-white/30 bg-white/10'
                                            }`}
                                    >
                                        <User className="w-6 h-6 text-white mb-1" />
                                        <span className="text-white text-[10px] uppercase font-bold tracking-wider">Attendee</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('organizer')}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${role === 'organizer'
                                            ? 'border-yellow-400 bg-yellow-400/20'
                                            : 'border-white/30 bg-white/10'
                                            }`}
                                    >
                                        <User className="w-6 h-6 text-white mb-1" />
                                        <span className="text-white text-[10px] uppercase font-bold tracking-wider">Organizer</span>
                                    </button>
                                </div>
                            </div>
                        )}


                        {!isLogin && (role === 'organizer' || role === 'admin') && (
                            <div className="space-y-4 animate-fade-in">
                                <div>
                                    <label className="text-white text-sm mb-2 block">Aadhar Number</label>
                                    <input
                                        type="text"
                                        value={aadharNumber}
                                        onChange={(e) => setAadharNumber(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.aadhar ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                        placeholder="1234 5678 9012"
                                    />
                                    {errors.aadhar && <p className="text-red-400 text-xs mt-1">{errors.aadhar}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-white text-sm mb-2 block">Contact Number</label>
                                        <input
                                            type="tel"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.contact ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                            placeholder="+1 234 567 890"
                                        />
                                        {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact}</p>}
                                    </div>
                                    <div>
                                        <label className="text-white text-sm mb-2 block">Business License</label>
                                        <input
                                            type="text"
                                            value={businessLicense}
                                            onChange={(e) => setBusinessLicense(e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.license ? 'border-red-400' : 'border-white/30'} text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                            placeholder="LIC-123456"
                                        />
                                        {errors.license && <p className="text-red-400 text-xs mt-1">{errors.license}</p>}
                                    </div>
                                </div>
                            </div>
                        )}


                        {!isLogin && role !== 'attendee' && (
                            <div className={`bg-white/10 p-4 rounded-lg border ${errors.verification ? 'border-red-400' : 'border-transparent'}`}>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={verified}
                                        onChange={(e) => setVerified(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-white/30 accent-yellow-400"
                                    />
                                    <span className="text-white text-sm">
                                        I have valid proof of identity and authorization to {role === 'organizer' ? 'organize events' : 'administer the platform'}. I understand that my account will be subject to verification.
                                    </span>
                                </label>
                                {errors.verification && <p className="text-red-400 text-xs mt-2">{errors.verification}</p>}
                            </div>
                        )}


                        <div className={`bg-white/10 p-4 rounded-lg border ${errors.terms ? 'border-red-400' : 'border-transparent'}`}>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-white/30 accent-yellow-400"
                                />
                                <span className="text-white text-sm">
                                    I accept the <a href="#" className="underline hover:text-yellow-400">terms and conditions</a> and <a href="#" className="underline hover:text-yellow-400">privacy policy</a>. I understand this platform is not for collecting PII or sensitive data.
                                </span>
                            </label>
                            {errors.terms && <p className="text-red-400 text-xs mt-2">{errors.terms}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLogin
                                ? 'Sign In'
                                : 'Create Account'
                            }
                        </button>
                    </form>


                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-200 hover:text-yellow-400 transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

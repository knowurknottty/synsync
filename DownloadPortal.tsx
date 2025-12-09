
import React, { useState, useEffect } from 'react';
import { Download, Lock, CheckCircle, AlertCircle, X, Laptop, Star, CreditCard } from 'lucide-react';
import { SecureDownloadService } from '../services/SecureDownload';
import { CONFIG } from '../config';

interface DownloadPortalProps {
    isOpen: boolean;
    onClose: () => void;
    verified?: boolean;
}

export const DownloadPortal: React.FC<DownloadPortalProps> = ({ isOpen, onClose, verified }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'verifying' | 'downloading' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (verified && isOpen && status === 'idle') {
            setStatus('success');
        }
    }, [verified, isOpen, status]);

    if (!isOpen) return null;

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('verifying');

        const isValid = await SecureDownloadService.verifyLicense(email);
        
        if (isValid) {
            setStatus('downloading');
            const success = await SecureDownloadService.downloadApp();
            if (success) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } else {
            setStatus('error');
        }
    };

    const handleDirectDownload = async () => {
        setStatus('downloading');
        const success = await SecureDownloadService.downloadApp();
        if (!success) setStatus('error');
        else setStatus('success');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-neuro-900 border border-neuro-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-neuro-900 via-neuro-800 to-neuro-900 p-8 text-center border-b border-neuro-700">
                    <div className="inline-flex p-3 rounded-full bg-neuro-500/10 border border-neuro-500/50 mb-4 shadow-[0_0_20px_rgba(31,184,205,0.2)]">
                        <Download className="w-8 h-8 text-neuro-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Download SynSync</h2>
                    <p className="text-sm text-gray-400">Professional Offline Edition</p>
                </div>

                {/* Body */}
                <div className="p-8">
                    {status === 'success' ? (
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Download Started</h3>
                            <div className="bg-neuro-800/50 p-4 rounded-xl border border-neuro-700 text-left space-y-3">
                                <p className="text-xs text-gray-300">
                                    <strong className="text-neuro-400 block mb-1">WHAT YOU DOWNLOADED:</strong>
                                    This package contains the <strong>Full Standalone Version</strong>. It includes all 21 protocols and offline rendering capabilities.
                                </p>
                                <ul className="text-[10px] text-gray-400 list-disc pl-4 space-y-1">
                                    <li>Unzip the folder to a secure location.</li>
                                    <li>Run <code>index.html</code> or the included executable.</li>
                                    <li>Keep this file safe; it is your master copy.</li>
                                </ul>
                            </div>
                            
                            <div className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                <Laptop className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <div className="text-xs font-bold text-blue-300 mb-1">PRO TIP: Install as App</div>
                                    <p className="text-[10px] text-blue-200/70">
                                        You can also install this current web page as a native app. Look for "Add to Home Screen" or "Install App" in your browser menu.
                                    </p>
                                </div>
                            </div>

                            <button onClick={handleDirectDownload} className="w-full py-3 bg-neuro-500 hover:bg-white text-black font-bold rounded-xl transition-colors shadow-lg">
                                Restart Download
                            </button>
                            
                            <button onClick={onClose} className="w-full py-3 bg-neuro-800 hover:bg-neuro-700 rounded-xl text-white font-bold transition-colors">
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {status !== 'error' && (
                                <form onSubmit={handleDownload} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verification</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="Enter your email used for purchase"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/30 border border-neuro-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-neuro-500 focus:ring-1 focus:ring-neuro-500 outline-none transition-all"
                                            />
                                        </div>
                                        <p className="text-[10px] text-gray-500">
                                            We verify your license against the payment gateway.
                                        </p>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status !== 'idle'}
                                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                                            status === 'verifying' || status === 'downloading'
                                            ? 'bg-neuro-800 text-gray-400 cursor-wait'
                                            : 'bg-neuro-500 hover:bg-neuro-400 text-black hover:scale-[1.02]'
                                        }`}
                                    >
                                        {status === 'verifying' ? 'Verifying License...' : 
                                         status === 'downloading' ? 'Fetching Secure Blob...' : 
                                         'Verify & Download'}
                                    </button>
                                </form>
                            )}

                            {status === 'error' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-start gap-3 text-red-400 text-xs bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <div>
                                            <strong className="block mb-1">License Verification Failed</strong>
                                            We couldn't confirm a purchase for this session. Please select a plan below to unlock the full download.
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Select License</p>
                                        <a href={CONFIG.STRIPE_LINKS.yearly} className="w-full py-3 bg-neuro-500 hover:bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg rounded-xl">
                                            <Star className="w-4 h-4" /> Yearly License ($49.99)
                                        </a>
                                        <a href={CONFIG.STRIPE_LINKS.monthly} className="w-full py-3 bg-neuro-800 hover:bg-neuro-700 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all border border-neuro-600 rounded-xl">
                                            <CreditCard className="w-4 h-4" /> Monthly License ($9.99)
                                        </a>
                                    </div>
                                    
                                    <button onClick={() => setStatus('idle')} className="w-full text-xs text-gray-500 hover:text-white mt-4 underline">
                                        Try Verification Again
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {status !== 'success' && (
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

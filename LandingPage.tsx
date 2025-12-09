
import React, { useState } from 'react';
import { Play, Check, Shield, Zap, Brain, Activity, CreditCard, Download, MessageCircle, Lock, WifiOff, ServerOff, EyeOff, Database, Cpu, Speaker, Mic, Hexagon, ShieldAlert } from 'lucide-react';
import { CONFIG } from '../config';
import ComparisonChart from './ComparisonChart';
import { Logo } from './Logo';

interface LandingPageProps {
    onLaunchDemo: () => void;
    onShowLegal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo, onShowLegal }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

    return (
        <div className="min-h-screen bg-[#0B0C15] text-white font-sans overflow-x-hidden bg-cyber-grid">
            <div className="fixed inset-0 pointer-events-none scanlines z-[50] opacity-10"></div>
            
            <nav className="fixed top-0 w-full z-50 bg-[#0B0C15]/80 backdrop-blur-md border-b border-neuro-700/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8 text-neuro-500" />
                        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neuro-500 to-white font-mono">SYN<span className="text-white">SYNC</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onLaunchDemo} className="text-sm font-bold text-neuro-400 hover:text-white transition-colors hidden sm:block font-mono uppercase tracking-wider">
                            Launch Demo
                        </button>
                        <a href="#pricing" className="px-6 py-2 bg-neuro-500 hover:bg-white text-black text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,176,0,0.4)] hover:shadow-[0_0_30px_rgba(255,176,0,0.6)]">
                            Get Access
                        </a>
                    </div>
                </div>
            </nav>

            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-neuro-500/10 blur-[150px] rounded-full opacity-20 pointer-events-none" />
                
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-neuro-500/30 text-[10px] font-bold uppercase tracking-[0.2em] text-neuro-400 mb-8 bg-black/50 backdrop-blur rounded">
                        <Shield className="w-3 h-3" /> Cognitive Sovereignty
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        TAKE YOUR <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neuro-300 to-neuro-500 text-glow">BRAIN BACK.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        $11M in classified research. $0 in surveillance capitalism. <br className="hidden md:block"/>
                        The only clinical-grade brainwave entrainment engine that works <strong className="text-white">100% offline</strong>.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={onLaunchDemo} className="w-full sm:w-auto px-8 py-4 bg-neuro-500 hover:bg-white text-black text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(255,176,0,0.3)] hover:shadow-[0_0_60px_rgba(255,176,0,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2">
                            <Play className="w-4 h-4 fill-current" /> Launch Free Web Demo
                        </button>
                        <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-neuro-800 hover:bg-neuro-700 text-white border border-neuro-600 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download Offline App
                        </a>
                    </div>
                    
                    <div className="mt-12 flex items-center justify-center gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-neuro-500"/> No Account</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-neuro-500"/> No Tracking</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-neuro-500"/> No Cloud</span>
                    </div>
                </div>
            </section>

            {/* PRIVACY MANIFESTO */}
            <section className="py-24 bg-neuro-800/30 border-y border-neuro-700/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-black/40 border border-neuro-700 p-8 md:p-12 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Lock className="w-64 h-64 text-neuro-500" />
                        </div>
                        
                        <h2 className="text-3xl font-black text-white mb-8 tracking-tight">THE PRIVACY MANIFESTO</h2>
                        
                        <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
                            <p>
                                <strong className="text-white">Your cognitive patterns are worth more than your credit card number.</strong> Every major meditation app tracks when you sleep, when you're anxious, and what works to calm you down. They call it "personalization." It's actually surveillance.
                            </p>
                            <p>
                                SynSync was built on a radical premise: <strong className="text-neuro-400">Cognitive Sovereignty.</strong>
                            </p>
                            <ul className="space-y-4 my-8">
                                <li className="flex items-start gap-3">
                                    <WifiOff className="w-6 h-6 text-neuro-500 shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-white block">Offline-First Architecture</strong>
                                        The core engine runs entirely on your device's CPU/GPU. You can (and should) use it in Airplane Mode.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ServerOff className="w-6 h-6 text-neuro-500 shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-white block">Zero-Knowledge Database</strong>
                                        We have no servers to hack. No logs to subpoena. Your sessions exist only in your RAM.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <EyeOff className="w-6 h-6 text-neuro-500 shrink-0 mt-1" />
                                    <div>
                                        <strong className="text-white block">Local Bio-Data</strong>
                                        Heart rate and coherence metrics are processed locally via Bluetooth and discarded immediately after the session.
                                    </div>
                                </li>
                            </ul>
                            <p className="text-sm font-mono text-neuro-500 pt-4 border-t border-neuro-700/50">
                                // VERIFIED ZERO-KNOWLEDGE ARCHITECTURE
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROTOCOL LIBRARY */}
            <section className="py-24 px-6 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <ComparisonChart />
                </div>
            </section>

            {/* TECHNICAL SUPERIORITY */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black mb-4">THE ANTI-SURVEILLANCE ARSENAL</h2>
                        <p className="text-gray-400">Military-grade technology. Civilian-grade privacy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Cpu className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">GPGPU Physics Engine</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                While others play MP3 loops, SynSync solves wave equations in real-time on your GPU. 64-bit precision. Zero compression artifacts.
                            </p>
                        </div>
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Speaker className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">Tri-Layer Harmonics</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Our "Phantom Fundamental" algorithm stacks octaves and perfect fifths to create a chord of entrainment that penetrates deeper than standard binaural beats.
                            </p>
                        </div>
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Activity className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">Stochastic Anti-Habituation</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                The brain ignores constant signals. We inject micro-jitter and spatial drift to keep the Reticular Activating System engaged for hours.
                            </p>
                        </div>
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Mic className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">Guidance Layer</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Integrated breathwork pacers, vocal mantras, and Socratic reprogramming modules synchronized to the audio carrier.
                            </p>
                        </div>
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Hexagon className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">Sacred Geometry 4D</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Visualizers that aren't just "trippy" but mathematically significant. Projection mapping of Platonic solids and tesseracts for focus training.
                            </p>
                        </div>
                        <div className="bg-neuro-800/20 border border-neuro-700 p-8 rounded-2xl hover:bg-neuro-800/40 transition-colors group">
                            <Database className="w-12 h-12 text-neuro-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-4 text-white">21 Research Protocols</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                From clinical "Pain Gating" to the classified "Focus 21" states. The complete library of declassified and academic research.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-24 px-6 bg-neuro-800/30 border-t border-neuro-700/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">SECURE YOUR LICENSE</h2>
                        <p className="text-gray-400 mb-8">One-time download. Lifetime updates.</p>
                        
                        <div className="inline-flex bg-black/40 p-1 rounded-lg border border-neuro-700">
                            <button 
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-neuro-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Monthly
                            </button>
                            <button 
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Yearly (Save 58%)
                            </button>
                        </div>
                    </div>

                    <div className="max-w-lg mx-auto bg-black/40 border border-neuro-500/30 rounded-2xl overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-neuro-500 to-transparent" />
                        
                        <div className="p-10 text-center border-b border-neuro-700/50">
                            <h3 className="text-xl font-bold text-gray-300 mb-2">PROFESSIONAL LICENSE</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-6">
                                <span className="text-5xl font-black text-white">{billingCycle === 'yearly' ? '$49.99' : '$9.99'}</span>
                                <span className="text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                            </div>
                            <a 
                                href={billingCycle === 'yearly' ? CONFIG.STRIPE_LINKS.yearly : CONFIG.STRIPE_LINKS.monthly}
                                className="w-full py-4 bg-neuro-500 hover:bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(255,176,0,0.3)] rounded-xl"
                            >
                                <CreditCard className="w-4 h-4" /> Subscribe & Download
                            </a>
                        </div>
                        
                        <div className="p-8 bg-neuro-800/10">
                            <ul className="space-y-4">
                                {[
                                    'Download Full Offline App (Win/Mac/iOS/Android)',
                                    'All 21 Research Protocols Unlocked',
                                    'New Protocols Added Monthly',
                                    'Discord Research Community Access',
                                    'Commercial-Free Experience',
                                    'Priority Support'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-neuro-500 shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMUNITY */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">JOIN THE RESEARCH DIVISION</h2>
                    <p className="text-gray-400 mb-8">
                        Connect with 10,000+ biohackers, developers, and psychonauts pushing the boundaries of consciousness technology.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <input type="email" placeholder="Enter your email for research updates" className="bg-neuro-900 border border-neuro-700 px-6 py-4 rounded-xl w-full sm:w-80 focus:border-neuro-500 outline-none transition-colors" />
                        <button className="px-8 py-4 bg-neuro-800 hover:bg-neuro-700 border border-neuro-600 text-white font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4" /> Join Discord
                        </button>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-neuro-800 text-center text-gray-600 text-xs font-mono">
                <div className="flex justify-center gap-8 mb-8">
                    <button onClick={onShowLegal} className="hover:text-neuro-500 transition-colors">LEGAL & SAFETY</button>
                    <a href="#" className="hover:text-neuro-500 transition-colors">PRIVACY POLICY</a>
                    <a href="#" className="hover:text-neuro-500 transition-colors">TERMS OF SERVICE</a>
                </div>
                <p className="opacity-50">
                    COPYRIGHT © 2025 SYNSYNC RESEARCH DIVISION. ALL RIGHTS RESERVED. <br/>
                    SYSTEM VERSION 4.0.2 // SECURE CONNECTION
                </p>
            </footer>
        </div>
    );
};

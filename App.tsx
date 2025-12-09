
import React, { useState, useEffect, useCallback } from 'react';
import { AudioEngine } from './services/AudioEngine';
import { ProtocolVault } from './services/ProtocolVault';
import { AudioState, Protocol, VisualizerSettings, AudioOutputMode, BiofeedbackMetrics, SessionGuidance, CymaticMedium, XRSession } from './types';
import { Visualizer } from './components/Visualizer';
import { ProtocolList } from './components/ProtocolList';
import { GuidanceOverlay } from './components/GuidanceOverlay';
import { Play, Pause, Volume2, Zap, Wind, MessageSquare, Hexagon, FlaskConical, Sparkles, Headphones, Speaker, Globe, Eye, Cpu, Palette, X, Droplet, Brain, LayoutList, PlayCircle, RotateCcw, Glasses, ChevronLeft, Maximize2, Lock, Download, BookOpen, ShieldAlert, Activity, Wifi, Ear, Sliders } from 'lucide-react';
import { SessionProgress } from './components/SessionProgress';
import { SourcesModal } from './components/SourcesModal';
import { LegalModal } from './components/LegalModal';
import { UpsellModal } from './components/UpsellModal';
import { LandingPage } from './components/LandingPage';
import { DownloadPortal } from './components/DownloadPortal';
import { Logo } from './components/Logo';

const audioEngine = new AudioEngine();

const BACKGROUND_PRESETS = [
    { id: 'void', label: 'Void', value: '#0B0C15' },
    { id: 'deep', label: 'Deep Space', value: 'radial-gradient(circle at 50% 50%, #151621 0%, #000000 100%)' },
    { id: 'midnight', label: 'Midnight', value: '#000000' },
];

const VIZ_MODES_2D = ['spectrum', 'waveform', 'pulse', 'fractal', 'dmt', 'quantum', 'sacred_geometry', 'oscilloscope'];
const VIZ_MODES_HD = ['neural', 'cosmic', 'hyper', 'symmetry', 'galactic', 'cyber', 'cymatics'];

const DEMO_PROTOCOLS = ['anxiety_relief_v4', 'deep_sleep_v4', 'focus_v4', 'neuro_analgesia'];

const OUTPUT_CONFIG: Record<AudioOutputMode, string> = {
    headphones: "HRTF Optimized: Maximum binaural efficacy via distinct L/R channel separation.",
    speakers: "Crossfeed Active: Blends L/R channels to prevent phase cancellation in open air.",
    surround_51: "Discrete 5.1: Maps base carriers to Sub/Center and atmospherics to Rears.",
    bone_conduction: "Osteo-EQ: High-pass & presence boost for jaw/temple transducers."
};

const App: React.FC = () => {
    // STARTUP STATE
    const [showLanding, setShowLanding] = useState(true);

    const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);
    const [audioState, setAudioState] = useState<AudioState>({
        isPlaying: false, isPaused: false, currentProtocolId: null, currentPhaseIndex: 0, volume: 0.7
    });

    const [outputMode, setOutputMode] = useState<AudioOutputMode>('headphones');
    const [sessionMode, setSessionMode] = useState<SessionGuidance>('audio_only');
    const [vizSettings, setVizSettings] = useState<VisualizerSettings>({
        mode: 'quantum', complexity: 0.5, background: BACKGROUND_PRESETS[0].value, hdEnabled: false, cymaticMedium: 'water'
    });

    const [appMode, setAppMode] = useState<'scientific' | 'speculative'>('scientific');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [mobileTab, setMobileTab] = useState<'protocols' | 'session' | 'visuals'>('protocols');
    
    const [showSources, setShowSources] = useState(false);
    const [showLegal, setShowLegal] = useState(false);
    const [showVizSettings, setShowVizSettings] = useState(false);
    const [showCymatics, setShowCymatics] = useState(false);
    const [hdAvailable, setHdAvailable] = useState(false);
    const [xrSupported, setXrSupported] = useState(false);
    const [xrSession, setXrSession] = useState<XRSession | undefined>(undefined);

    // DEMO LIMITS & DOWNLOAD
    const [showUpsell, setShowUpsell] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [isVerifiedDownload, setIsVerifiedDownload] = useState(false);
    const [upsellReason, setUpsellReason] = useState<'time_limit' | 'locked_content'>('locked_content');

    // PROTOCOL LAB (Locked Features)
    const [labPitch, setLabPitch] = useState(0);
    const [labBeat, setLabBeat] = useState(0);
    const [labMix, setLabMix] = useState(1);

    useEffect(() => {
        const check = () => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch(e) { return false; }};
        setHdAvailable(check());
        if ((navigator as any).xr) {
            (navigator as any).xr.isSessionSupported('immersive-vr').then((supported: boolean) => setXrSupported(supported));
        }
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment_success') === 'true') {
            setShowLanding(false); 
            setIsVerifiedDownload(true);
            setShowDownload(true);
            window.history.replaceState({}, '', window.location.pathname);
        }

        const unlockAudio = () => {
            audioEngine.unlock();
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('touchend', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('touchstart', unlockAudio, { once: true });
        window.addEventListener('touchend', unlockAudio, { once: true });
        window.addEventListener('click', unlockAudio, { once: true });
        return () => {
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('touchend', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };
    }, []);

    useEffect(() => {
        audioEngine.onTick = (totalElapsed, phaseElapsed, i) => {
            if (audioEngine.currentPhaseIndex !== audioState.currentPhaseIndex) {
               setAudioState(s => ({...s, isPlaying: true, isPaused: false, currentPhaseIndex: i}));
            }
            // Strict Time Limit Enforcement for Demo
            if (audioEngine.currentProtocol && DEMO_PROTOCOLS.includes(audioEngine.currentProtocol.id)) {
                if (totalElapsed >= audioEngine.currentProtocol.duration * 0.5) {
                    audioEngine.stop();
                    setUpsellReason('time_limit');
                    setShowUpsell(true);
                }
            }
        };
        audioEngine.onComplete = () => setAudioState(s => ({...s, isPlaying: false, isPaused: false}));
    }, [audioState.currentPhaseIndex]); 

    useEffect(() => {
        if (sessionMode === 'geometry') setVizSettings(s => ({...s, mode: 'sacred_geometry'}));
    }, [sessionMode]);

    useEffect(() => {
        if (isMobile && activeProtocol) {
            setMobileTab('session');
        }
    }, [activeProtocol, isMobile]);

    // Live update of Manual Overrides
    useEffect(() => {
        audioEngine.updateManualOverrides(labPitch, labBeat, labMix);
    }, [labPitch, labBeat, labMix]);

    const handlePlay = useCallback(() => {
        if (!activeProtocol) return;

        // Force Stop if trying to play a locked protocol
        if (!DEMO_PROTOCOLS.includes(activeProtocol.id)) {
            audioEngine.stop(); 
            setUpsellReason('locked_content');
            setShowUpsell(true);
            return;
        }

        audioEngine.unlock(true);

        const isProtocolSwitch = audioState.isPlaying && audioState.currentProtocolId !== activeProtocol.id;

        if (isProtocolSwitch) {
            audioEngine.stopImmediate();
            audioEngine.playProtocol(activeProtocol);
            setAudioState(s => ({...s, isPlaying: true, isPaused: false, currentProtocolId: activeProtocol.id}));
            return;
        }

        if (audioState.isPlaying && !audioState.isPaused) {
            audioEngine.pause();
            setAudioState(s => ({...s, isPlaying: true, isPaused: true}));
        } else if (audioState.isPaused) {
            audioEngine.resume();
            setAudioState(s => ({...s, isPaused: false, isPlaying: true}));
        } else {
            audioEngine.playProtocol(activeProtocol);
            setAudioState(s => ({...s, isPlaying: true, currentProtocolId: activeProtocol.id}));
        }
    }, [activeProtocol, audioState]);

    const handleRestart = () => {
        if (!activeProtocol) return;
        if (!DEMO_PROTOCOLS.includes(activeProtocol.id)) {
            audioEngine.stop();
            setUpsellReason('locked_content');
            setShowUpsell(true);
            return;
        }
        audioEngine.stopImmediate();
        audioEngine.playProtocol(activeProtocol);
        setAudioState(s => ({...s, isPlaying: true, isPaused: false}));
    };

    const handleLabUnlock = () => {
        setUpsellReason('locked_content');
        setShowUpsell(true);
    };

    const startVR = async () => {
        if (!xrSupported) return;
        try {
            const session = await (navigator as any).xr.requestSession('immersive-vr');
            setXrSession(session);
            session.addEventListener('end', () => setXrSession(undefined));
        } catch (e) { console.error("VR Start Failed", e); }
    };

    const isPlayingCurrent = audioState.isPlaying && !audioState.isPaused && audioState.currentProtocolId === activeProtocol?.id;

    const renderSessionControls = () => (
        <div className="flex gap-2 bg-neuro-800/50 p-1 rounded-lg border border-neuro-600/50 overflow-x-auto">
            <button title="Pure Audio" onClick={() => setSessionMode('audio_only')} className={`p-2 rounded transition-all ${sessionMode === 'audio_only' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-white'}`}><Zap className="w-4 h-4"/></button>
            <button title="Breathwork Guide" onClick={() => setSessionMode('breathwork')} className={`p-2 rounded transition-all ${sessionMode === 'breathwork' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-white'}`}><Wind className="w-4 h-4"/></button>
            <button title="Mantra Guide" onClick={() => setSessionMode('mantra')} className={`p-2 rounded transition-all ${sessionMode === 'mantra' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-white'}`}><MessageSquare className="w-4 h-4"/></button>
            <button title="Socratic Method" onClick={() => setSessionMode('socratic')} className={`p-2 rounded transition-all ${sessionMode === 'socratic' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-white'}`}><Brain className="w-4 h-4"/></button>
            <button title="Sacred Geometry" onClick={() => setSessionMode('geometry')} className={`p-2 rounded transition-all ${sessionMode === 'geometry' ? 'bg-neuro-500 text-black shadow-[0_0_15px_rgba(255,176,0,0.4)]' : 'text-gray-500 hover:text-white'}`}><Hexagon className="w-4 h-4"/></button>
        </div>
    );

    const renderOutputControls = () => (
        <div className="flex flex-col gap-2">
            <div className="flex bg-black/40 p-1 border border-neuro-700 rounded">
                {[
                    { id: 'headphones', icon: Headphones, label: 'Headphones' },
                    { id: 'speakers', icon: Speaker, label: 'Speakers' },
                    { id: 'surround_51', icon: Globe, label: 'Surround' },
                    { id: 'bone_conduction', icon: Ear, label: 'Bone Conduction' }
                ].map((m: any) => (
                    <button 
                        key={m.id} 
                        title={m.label}
                        onClick={() => { setOutputMode(m.id); audioEngine.setOutputMode(m.id); }} 
                        className={`px-3 py-1 hover:text-white transition-colors rounded ${outputMode === m.id ? 'bg-neuro-500 text-black shadow-[0_0_10px_rgba(255,176,0,0.3)]' : 'text-gray-600'}`}
                    >
                        <m.icon className="w-4 h-4"/>
                    </button>
                ))}
            </div>
            {/* Dynamic Description */}
            <div className="text-[9px] text-neuro-400 font-mono tracking-tight text-center opacity-80 h-4 leading-tight">
                {OUTPUT_CONFIG[outputMode]}
            </div>
        </div>
    );

    const renderProtocolLab = () => (
        <div className="bg-neuro-800/30 border border-neuro-700/50 p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-2 transition-opacity group-hover:opacity-100 opacity-90">
                <Lock className="w-6 h-6 text-neuro-500" />
                <button onClick={handleLabUnlock} className="text-xs font-bold bg-neuro-500 text-black px-3 py-1.5 rounded hover:bg-white uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(255,176,0,0.3)]">
                    Unlock Protocol Lab
                </button>
            </div>
            
            <div className="flex justify-between items-center mb-3 blur-[1px]">
                <h4 className="text-xs font-bold text-neuro-400 uppercase tracking-widest font-mono flex items-center gap-2">
                    <Sliders className="w-3 h-3" /> Manual Overrides
                </h4>
            </div>
            <div className="space-y-3 blur-[1px]">
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-gray-500 uppercase font-mono"><span>Carrier Pitch</span><span>0 cents</span></div>
                    <input type="range" disabled className="w-full h-1 bg-neuro-900 rounded-full" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-gray-500 uppercase font-mono"><span>Binaural Offset</span><span>0%</span></div>
                    <input type="range" disabled className="w-full h-1 bg-neuro-900 rounded-full" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-gray-500 uppercase font-mono"><span>Noise Mix</span><span>100%</span></div>
                    <input type="range" disabled className="w-full h-1 bg-neuro-900 rounded-full" />
                </div>
            </div>
        </div>
    );

    const renderCymaticsPanel = () => (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 bg-neuro-800/90 p-4 rounded-xl border border-neuro-500/30 shadow-2xl flex flex-col gap-2 w-64 backdrop-blur-md">
            <h4 className="text-xs font-bold text-neuro-400 uppercase text-center">Medium</h4>
            <div className="grid grid-cols-4 gap-2">
                {['sand','water','mercury','oil','ferrofluid','plasma','gold','aether'].map(m => (
                    <button key={m} onClick={() => setVizSettings(s => ({...s, cymaticMedium: m as any}))} 
                        className={`text-[10px] px-1 py-1 rounded border uppercase truncate ${vizSettings.cymaticMedium === m ? 'bg-neuro-500 text-black border-neuro-500' : 'border-white/10 text-gray-400'}`}>
                        {m.slice(0,4)}
                    </button>
                ))}
            </div>
        </div>
    );

    if (showLanding) {
        return <LandingPage onLaunchDemo={() => setShowLanding(false)} onShowLegal={() => setShowLegal(true)} />;
    }

    if (isMobile) {
        return (
            <div className="fixed inset-0 w-full bg-neuro-900 text-gray-100 font-sans flex flex-col overflow-hidden safe-area-top bg-cyber-grid">
                <div className="absolute inset-0 pointer-events-none scanlines z-50 opacity-30"></div>
                <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
                <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
                <UpsellModal isOpen={showUpsell} onClose={() => setShowUpsell(false)} reason={upsellReason} />
                <DownloadPortal isOpen={showDownload} onClose={() => setShowDownload(false)} verified={isVerifiedDownload} />

                <div className="p-4 bg-neuro-800/90 border-b border-neuro-600 backdrop-blur flex justify-between items-center shrink-0 z-40">
                    <div className="flex items-center gap-2">
                        <Logo className="w-6 h-6 text-neuro-500" />
                        <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-neuro-500 to-white font-mono tracking-tighter">SYN<span className="text-white">SYNC</span></h1>
                    </div>
                    <div className="flex gap-3">
                         <button onClick={() => { setUpsellReason('locked_content'); setShowUpsell(true); }} className="p-2 bg-neuro-700/50 rounded border border-neuro-600 text-neuro-400"><Download className="w-4 h-4"/></button>
                         <button onClick={() => setShowSources(true)} className="p-2 bg-neuro-700/50 rounded border border-neuro-600"><BookOpen className="w-4 h-4 text-gray-400"/></button>
                         <button onClick={() => setShowLegal(true)} className="p-2 bg-neuro-700/50 rounded border border-neuro-600 hover:text-red-400"><ShieldAlert className="w-4 h-4 text-gray-400 hover:text-red-400"/></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-transparent relative custom-scrollbar pb-24 z-30">
                    {mobileTab === 'protocols' && (
                        <div className="p-4 space-y-4">
                            <div className="flex gap-2 bg-neuro-800 p-1 rounded-xl border border-neuro-700">
                                <button onClick={() => setAppMode('scientific')} className={`flex-1 py-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 font-mono ${appMode === 'scientific' ? 'bg-neuro-700 text-white border border-neuro-600' : 'text-gray-500'}`}><FlaskConical className="w-4 h-4"/> SCIENCE</button>
                                <button onClick={() => setAppMode('speculative')} className={`flex-1 py-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 font-mono ${appMode === 'speculative' ? 'bg-neuro-accent/20 text-neuro-accent border border-neuro-accent/30' : 'text-gray-500'}`}><Sparkles className="w-4 h-4"/> WOO WOO</button>
                            </div>
                            <ProtocolList protocols={ProtocolVault.getAllProtocols()} selectedId={activeProtocol?.id || null} onSelect={setActiveProtocol} mode={appMode} />
                        </div>
                    )}
                    {mobileTab === 'session' && (
                        <div className="p-6 space-y-6 flex flex-col min-h-full">
                            {activeProtocol ? (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <button onClick={() => setMobileTab('protocols')} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm p-2 -ml-2 font-mono"><ChevronLeft className="w-5 h-5" /> LIST</button>
                                        <button onClick={() => setMobileTab('visuals')} className="flex items-center gap-2 text-neuro-400 bg-neuro-500/10 border border-neuro-500/30 px-4 py-2 rounded-none border-l-2 border-r-2 font-mono text-xs font-bold uppercase tracking-wider">Immerse <Maximize2 className="w-3 h-3" /></button>
                                    </div>
                                    <div className="text-center space-y-2 relative">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-neuro-500"></div>
                                        <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-neuro-500"></div>
                                        <h2 className="text-2xl font-bold text-white leading-tight pt-4 tracking-tight">{activeProtocol.title}</h2>
                                        <div className="flex justify-center items-center gap-2 text-neuro-400">
                                            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neuro-500/10 border border-neuro-500/30">L{activeProtocol.evidenceLevel}</span>
                                            <span className="text-[10px] font-mono text-gray-500">{Math.floor(activeProtocol.duration / 60)} MIN</span>
                                        </div>
                                        {!DEMO_PROTOCOLS.includes(activeProtocol.id) && <div className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 inline-block border border-red-500/30 font-mono">LOCKED (PRO)</div>}
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 text-xs text-gray-400 bg-neuro-800/30 p-4 border-l-2 border-neuro-500/50 backdrop-blur-sm">
                                        <div><strong className="text-neuro-400 block mb-0.5 font-mono text-[10px] uppercase">Algorithm</strong> {activeProtocol.algoDesc}</div>
                                        <div className="h-px bg-neuro-700/50 my-1"></div>
                                        <div><strong className="text-neuro-400 block mb-0.5 font-mono text-[10px] uppercase">Goal</strong> {activeProtocol.usageGoal}</div>
                                        <div className="h-px bg-neuro-700/50 my-1"></div>
                                        <div>
                                            <strong className="text-neuro-400 block mb-0.5 font-mono text-[10px] uppercase">Breathwork</strong>
                                            <span className="text-white font-bold">{activeProtocol.breathwork.name}</span>: {activeProtocol.breathwork.description}
                                        </div>
                                        <div className="h-px bg-neuro-700/50 my-1"></div>
                                        <div>
                                            <strong className="text-neuro-400 block mb-0.5 font-mono text-[10px] uppercase">Mantra</strong>
                                            <span className="text-white font-bold">"{activeProtocol.mantra.phonetic}"</span> - {activeProtocol.mantra.meaning}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-center items-center my-4">
                                        {renderSessionControls()}
                                    </div>

                                    <div className="flex gap-6 justify-center items-center py-4">
                                        <button onClick={handleRestart} className="w-14 h-14 rounded-full bg-neuro-800 border border-gray-600 text-gray-400 flex items-center justify-center active:scale-95 shadow-lg"><RotateCcw className="w-6 h-6" /></button>
                                        <button onClick={handlePlay} className={`w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,176,0,0.2)] hover:scale-105 transition-transform ${!isPlayingCurrent ? 'bg-neuro-500 text-black' : 'bg-neuro-800 border-2 border-neuro-500 text-white'}`}>
                                            {!isPlayingCurrent ? <Play className="w-10 h-10 ml-1" /> : <Pause className="w-10 h-10" />}
                                        </button>
                                    </div>
                                    <SessionProgress audioEngine={audioEngine} />
                                    <div className="bg-neuro-800/50 p-4 border border-neuro-700 space-y-3">
                                        <div className="text-[10px] text-gray-500 uppercase font-bold font-mono">Output Matrix</div>
                                        <div className="flex justify-center items-center">
                                            {renderOutputControls()}
                                        </div>
                                    </div>
                                    {renderProtocolLab()}
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4 min-h-[50vh]">
                                    <LayoutList className="w-16 h-16 opacity-20 text-neuro-500" />
                                    <p className="text-sm font-mono">INITIALIZE PROTOCOL</p>
                                    <button onClick={() => setMobileTab('protocols')} className="px-6 py-2 bg-neuro-700 hover:bg-neuro-600 text-white rounded-none border border-neuro-500/30 text-sm font-mono">SELECT</button>
                                </div>
                            )}
                        </div>
                    )}
                    {mobileTab === 'visuals' && (
                        <div className="h-full w-full relative">
                            <Visualizer audioEngine={audioEngine} isPlaying={audioState.isPlaying} mode={vizSettings.mode} complexity={vizSettings.complexity} background={vizSettings.background} hdEnabled={vizSettings.hdEnabled} cymaticMedium={vizSettings.cymaticMedium} xrSession={xrSession} />
                            <GuidanceOverlay mode={sessionMode} breathRatio={activeProtocol?.breathwork.ratio} mantra={activeProtocol?.mantra} elapsedTime={0} />
                            <div className="absolute top-4 right-4 z-50 flex flex-col gap-3">
                                <button onClick={() => setShowVizSettings(!showVizSettings)} className="w-12 h-12 rounded-none border border-neuro-500/50 bg-black/60 flex items-center justify-center backdrop-blur text-neuro-400"><Palette className="w-6 h-6"/></button>
                            </div>
                            {showCymatics && vizSettings.mode === 'cymatics' && renderCymaticsPanel()}
                            {showVizSettings && (
                                <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur p-6 overflow-y-auto animate-in fade-in flex flex-col border-l border-neuro-500/30">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-bold text-white font-mono">VISUAL CONFIG</h3>
                                        <button onClick={() => setShowVizSettings(false)} className="p-2 bg-white/10 rounded-full"><X className="w-6 h-6 text-gray-400"/></button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {VIZ_MODES_2D.map(m => (
                                            <button key={m} onClick={() => setVizSettings(s => ({...s, mode: m as any}))} className={`p-4 rounded-none border capitalize text-sm font-medium transition-all ${vizSettings.mode === m ? 'bg-neuro-500/20 text-neuro-400 border-neuro-500' : 'border-neuro-800 text-gray-500 bg-neuro-900/50'}`}>{m.replace('_', ' ')}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="bg-neuro-900/90 border-t border-neuro-600 flex justify-around items-center p-2 pb-8 safe-area-pb shrink-0 z-50 backdrop-blur">
                    <button onClick={() => setMobileTab('protocols')} className={`flex flex-col items-center gap-1 p-2 w-20 ${mobileTab === 'protocols' ? 'text-neuro-500' : 'text-gray-600'}`}><LayoutList className="w-6 h-6" /><span className="text-[10px] font-bold font-mono">DATA</span></button>
                    <button onClick={() => setMobileTab('session')} className={`flex flex-col items-center gap-1 p-2 w-20 ${mobileTab === 'session' ? 'text-neuro-500' : 'text-gray-600'}`}><Activity className="w-6 h-6" /><span className="text-[10px] font-bold font-mono">CORE</span></button>
                    <button onClick={() => setMobileTab('visuals')} className={`flex flex-col items-center gap-1 p-2 w-20 ${mobileTab === 'visuals' ? 'text-neuro-500' : 'text-gray-600'}`}><Eye className="w-6 h-6" /><span className="text-[10px] font-bold font-mono">VIS</span></button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-neuro-900 text-gray-100 font-sans grid grid-cols-12 overflow-hidden bg-cyber-grid">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none scanlines z-[100] opacity-20"></div>
            
            <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
            <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
            <UpsellModal isOpen={showUpsell} onClose={() => setShowUpsell(false)} reason={upsellReason} />
            <DownloadPortal isOpen={showDownload} onClose={() => setShowDownload(false)} verified={isVerifiedDownload} />
            
            {/* SIDEBAR */}
            <div className="col-span-3 bg-neuro-800/80 border-r border-neuro-700 backdrop-blur-xl flex flex-col h-full z-20">
                <div className="p-6 border-b border-neuro-700/50 bg-neuro-900/50">
                    <div className="flex items-center gap-3 mb-4">
                        <Logo className="w-8 h-8 text-neuro-500" />
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neuro-500 via-white to-neuro-500 tracking-tighter font-mono italic">SYN<span className="text-white">SYNC</span></h1>
                    </div>
                    
                    <div className="flex gap-2 bg-black/40 p-1 border border-neuro-700/50 mb-4 rounded">
                        <button onClick={() => setAppMode('scientific')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest font-mono transition-colors rounded ${appMode === 'scientific' ? 'bg-neuro-700 text-white border border-gray-600' : 'text-gray-600 hover:text-gray-400'}`}>SCIENCE</button>
                        <button onClick={() => setAppMode('speculative')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest font-mono transition-colors rounded ${appMode === 'speculative' ? 'bg-neuro-accent/20 text-neuro-accent border border-neuro-accent/40' : 'text-gray-600 hover:text-gray-400'}`}>WOO WOO</button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <button onClick={() => setShowSources(true)} className="flex gap-2 items-center justify-center text-[10px] font-bold font-mono uppercase py-2 bg-neuro-700/30 border border-neuro-700 hover:bg-neuro-500/10 hover:text-neuro-400 hover:border-neuro-500/50 transition-all rounded"><BookOpen className="w-3 h-3"/> Sources</button>
                        <button onClick={() => setShowLegal(true)} className="flex gap-2 items-center justify-center text-[10px] font-bold font-mono uppercase py-2 bg-neuro-700/30 border border-neuro-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all rounded"><ShieldAlert className="w-3 h-3"/> Legal</button>
                    </div>
                    <button onClick={() => { setUpsellReason('locked_content'); setShowUpsell(true); }} className="w-full flex gap-2 items-center justify-center text-[10px] font-bold font-mono uppercase py-3 bg-neuro-500/10 text-neuro-400 border border-neuro-500/30 hover:bg-neuro-500/20 transition-all rounded"><Download className="w-3 h-3"/> Download Full App</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar"><ProtocolList protocols={ProtocolVault.getAllProtocols()} selectedId={activeProtocol?.id || null} onSelect={setActiveProtocol} mode={appMode} /></div>
            </div>

            {/* MAIN CONTENT */}
            <div className="col-span-9 flex flex-col h-full bg-transparent relative z-10">
                {/* STATUS BAR */}
                <div className="h-16 border-b border-neuro-700/50 flex items-center justify-between px-8 bg-neuro-900/80 backdrop-blur-md z-20">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${audioState.isPlaying && !audioState.isPaused ? 'bg-neuro-500 animate-pulse shadow-[0_0_10px_rgba(255,176,0,0.8)]' : 'bg-neuro-800 border border-neuro-600'}`} />
                            <span className="font-mono text-[10px] tracking-[0.2em] text-neuro-400">{audioState.isPlaying && !audioState.isPaused ? 'SYSTEM ACTIVE' : audioState.isPaused ? 'SYSTEM PAUSED' : 'SYSTEM STANDBY'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Output Mode Toggle */}
                        {renderOutputControls()}
                        <div className="w-px h-6 bg-neuro-800"/>
                        <div className="flex items-center gap-3">
                            <Volume2 className="w-4 h-4 text-neuro-600"/>
                            <input type="range" min="0" max="1" step="0.01" value={audioState.volume} onChange={e => {audioEngine.setVolume(parseFloat(e.target.value)); setAudioState(s => ({...s, volume: parseFloat(e.target.value)}))}} className="w-32 accent-neuro-500 h-1 bg-neuro-800 rounded cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* DASHBOARD */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {activeProtocol ? (
                        <div className="grid grid-cols-12 gap-8 h-full">
                            {/* LEFT COLUMN: INFO & CONTROLS */}
                            <div className="col-span-5 flex flex-col gap-6">
                                <div className={`relative bg-neuro-800/40 border border-neuro-700 backdrop-blur-xl p-8 overflow-hidden group rounded-xl shadow-lg`}>
                                    {/* Corner Brackets */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neuro-500/50 rounded-tl-lg"></div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neuro-500/50 rounded-tr-lg"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neuro-500/50 rounded-bl-lg"></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neuro-500/50 rounded-br-lg"></div>

                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-3xl font-bold text-white tracking-tight uppercase font-mono">{activeProtocol.title}</h2>
                                        <div className="flex flex-col items-end gap-1">
                                            {!DEMO_PROTOCOLS.includes(activeProtocol.id) && (
                                                <div className="bg-neuro-900/80 border border-neuro-600 text-neuro-400 px-2 py-1 text-[10px] font-bold tracking-wider flex items-center gap-1 font-mono rounded">
                                                    <Lock className="w-3 h-3" /> PRO
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">{activeProtocol.description}</p>
                                    
                                    <div className="grid grid-cols-1 gap-3 mb-6 text-xs text-gray-400 bg-black/40 p-4 border-l-2 border-neuro-500/30 rounded-r-lg">
                                        <div><strong className="text-neuro-500 block mb-1 uppercase tracking-widest text-[9px] font-mono">Algorithm</strong> {activeProtocol.algoDesc}</div>
                                        <div className="h-px bg-neuro-800 w-full"></div>
                                        <div><strong className="text-neuro-500 block mb-1 uppercase tracking-widest text-[9px] font-mono">Goal</strong> {activeProtocol.usageGoal}</div>
                                        <div className="h-px bg-neuro-800 w-full"></div>
                                        <div>
                                            <strong className="text-neuro-500 block mb-1 uppercase tracking-widest text-[9px] font-mono">Breathwork</strong>
                                            <span className="text-white font-bold">{activeProtocol.breathwork.name}</span>: {activeProtocol.breathwork.description}
                                        </div>
                                        <div className="h-px bg-neuro-800 w-full"></div>
                                        <div>
                                            <strong className="text-neuro-500 block mb-1 uppercase tracking-widest text-[9px] font-mono">Mantra</strong>
                                            <span className="text-white font-bold">"{activeProtocol.mantra.phonetic}"</span> ({activeProtocol.mantra.pronunciation}) - {activeProtocol.mantra.meaning}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[10px] font-bold text-neuro-400 uppercase tracking-widest font-mono">Guidance Layer</span>
                                        {renderSessionControls()}
                                    </div>
                                    
                                    <div className="flex gap-4 mb-6">
                                        <button onClick={handleRestart} className="px-4 bg-neuro-900 border border-neuro-700 text-gray-400 hover:text-white hover:border-neuro-500 rounded-lg transition-all active:scale-95"><RotateCcw className="w-5 h-5"/></button>
                                        {!isPlayingCurrent ? (
                                            <button onClick={handlePlay} className="flex-1 bg-neuro-500 hover:bg-neuro-400 text-black font-bold py-4 font-mono tracking-widest flex justify-center gap-2 shadow-[0_0_30px_rgba(255,176,0,0.25)] transition-all active:scale-[0.98] border-2 border-transparent hover:border-white rounded-xl">
                                                <Play className="w-5 h-5 fill-current"/> {audioState.isPaused ? 'RESUME PROTOCOL' : 'INITIATE SEQUENCE'}
                                            </button>
                                        ) : (
                                            <button onClick={handlePlay} className="flex-1 bg-black/50 border-2 border-neuro-500 text-neuro-500 font-bold py-4 font-mono tracking-widest flex justify-center gap-2 hover:bg-neuro-500/10 transition-all active:scale-[0.98] rounded-xl">
                                                <Pause className="w-5 h-5 fill-current"/> HALT SEQUENCE
                                            </button>
                                        )}
                                    </div>
                                    <SessionProgress audioEngine={audioEngine} />
                                </div>
                                {renderProtocolLab()}
                                <div className="bg-neuro-800/20 border border-neuro-700/30 p-6 backdrop-blur-sm relative rounded-xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-xs font-bold text-neuro-500 flex items-center gap-2 font-mono uppercase tracking-wider"><Palette className="w-4 h-4"/> Visual Processor</h4>
                                        {hdAvailable && (<div className="flex items-center gap-2 text-[9px] bg-black/40 px-2 py-1 border border-neuro-700 font-mono text-gray-400 rounded"><Cpu className="w-3 h-3 text-neuro-500"/> GPU ACCEL <input type="checkbox" checked={vizSettings.hdEnabled} onChange={e => setVizSettings(s => ({...s, hdEnabled: e.target.checked}))} className="accent-neuro-500 w-3 h-3 cursor-pointer ml-1"/></div>)}
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                         {VIZ_MODES_2D.map(m => (<button key={m} onClick={() => setVizSettings(s => ({...s, mode: m as any}))} className={`p-2 text-[9px] uppercase font-bold border transition-all font-mono rounded ${vizSettings.mode === m ? 'bg-neuro-500 text-black border-neuro-500' : 'border-neuro-800 text-gray-500 hover:border-neuro-600 bg-black/40'}`}>{m.replace('_', ' ')}</button>))}
                                    </div>
                                    {hdAvailable && vizSettings.hdEnabled && (<div className="grid grid-cols-4 gap-2 mb-4">{VIZ_MODES_HD.map(m => (<button key={m} onClick={() => setVizSettings(s => ({...s, mode: m as any}))} className={`p-2 text-[9px] uppercase font-bold border transition-all font-mono rounded ${vizSettings.mode === m ? 'bg-neuro-500 text-black border-neuro-500' : 'border-neuro-800 text-gray-500 hover:border-neuro-600 bg-black/40'}`}>{m}</button>))}</div>)}
                                    <input type="range" min="0" max="1" step="0.01" value={vizSettings.complexity} onChange={e => setVizSettings(s => ({...s, complexity: parseFloat(e.target.value)}))} className="w-full h-1 bg-neuro-800 appearance-none cursor-pointer accent-neuro-500 rounded-full"/>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: VISUALIZER */}
                            <div className="col-span-7 h-full min-h-[400px] bg-black border-2 border-neuro-700/50 overflow-hidden relative shadow-2xl rounded-xl">
                                {/* Visualizer Container - Frameless feel */}
                                <Visualizer audioEngine={audioEngine} isPlaying={audioState.isPlaying} mode={vizSettings.mode} complexity={vizSettings.complexity} background={vizSettings.background} hdEnabled={hdAvailable} cymaticMedium={vizSettings.cymaticMedium} xrSession={xrSession} />
                                <GuidanceOverlay mode={sessionMode} breathRatio={activeProtocol.breathwork.ratio} mantra={activeProtocol.mantra} elapsedTime={0} />
                                {vizSettings.mode === 'cymatics' && renderCymaticsPanel()}
                                
                                <div className="absolute top-4 right-4 flex gap-2">
                                    {xrSupported && <button onClick={startVR} className="p-2 bg-black/50 text-neuro-500 border border-neuro-500/30 hover:bg-neuro-500/20 backdrop-blur rounded"><Glasses className="w-5 h-5"/></button>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-6 opacity-50">
                            <div className="relative">
                                <div className="absolute inset-0 bg-neuro-500 blur-[50px] opacity-20"></div>
                                <LayoutList className="w-24 h-24 text-neuro-800 relative z-10" />
                            </div>
                            <div className="font-mono text-sm tracking-[0.2em] text-neuro-500">AWAITING PROTOCOL SELECTION</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;

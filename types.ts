
export type NoiseType = 'white' | 'pink' | 'brown';

export interface Phase {
    duration: number; // seconds
    startBeat?: number;
    endBeat?: number;
    beat?: number;
    carrier: number;
    carrierEnd?: number;
    noise: NoiseType | null;
    noiseMix: number;
    overlays: number[];
    overlayMix: number;
    gammaOverlay?: number;
    gammaCarrier?: number;
    
    // --- PINNACLE FEATURES ---
    isochronic?: boolean; // Pulse volume at beat freq
    harmonicStacking?: boolean; // Add 5th and Octave layers
    spatialMotion?: 'rotate' | 'fixed' | 'random'; // Drift overlays
    stochastic?: boolean; // Micro-jitter detuning
}

export interface BreathworkProfile {
    name: string;
    ratio: [number, number, number, number]; // Inhale, Hold, Exhale, Hold
    description: string;
}

export interface MantraProfile {
    phonetic: string;
    meaning: string;
    repeatInterval: number; // seconds
    pronunciation?: string; // New: "Oh-mm"
    tonality?: string;      // New: "Low Chest Resonance"
}

export interface Protocol {
    id: string;
    title: string;
    description: string;
    evidenceLevel: 'I' | 'II' | 'III' | 'III-IV' | 'IV' | 'IV-V' | 'V' | 'Custom';
    citation: string;
    category: 'evidence' | 'research' | 'speculative' | 'custom';
    duration: number; // total seconds
    contraindications: string[];
    phases: Phase[];
    
    // Descriptive Fields
    algoDesc: string;
    usageGoal: string;
    researchContext: string;

    // Guidance
    breathwork: BreathworkProfile;
    mantra: MantraProfile;
}

export interface BiofeedbackMetrics {
    hrv: number; // 0-100
    coherence: number; // 0.0-1.0
    active: boolean;
}

export interface AudioState {
    isPlaying: boolean;
    isPaused: boolean;
    currentProtocolId: string | null;
    currentPhaseIndex: number;
    volume: number;
}

export interface QAMetrics {
    lufs: number;
    peak: number;
    thd: number;
    snr: number;
    freqAcc: number;
}

export interface ExportConfig {
    sampleRate: 44100 | 48000 | 88200 | 96000;
    bitDepth: 16 | 24 | 32;
    normalize: boolean;
    dither: boolean;
}

export type AudioOutputMode = 'headphones' | 'speakers' | 'surround_51' | 'bone_conduction';
export type WearableType = 'bluetooth_hr' | 'phone_motion' | 'apple_watch_bridge' | 'muse_eeg' | 'none';

export interface WearableDevice {
    id: string;
    name: string;
    type: WearableType;
    connected: boolean;
    battery?: number;
}

export interface SensorData {
    hr: number;
    hrv: number;
    motion: number;
    eeg?: { alpha: number; beta: number; theta: number; delta: number; };
}

export type CymaticMedium = 'sand' | 'water' | 'mercury' | 'oil' | 'ferrofluid' | 'plasma' | 'gold' | 'aether';

export type SessionGuidance = 'audio_only' | 'breathwork' | 'mantra' | 'socratic' | 'geometry';

export interface SocraticStep {
    id: string;
    question: string;
    placeholder: string;
    nextLabel: string;
}

export interface GeometryLesson {
    shape: string; // e.g. "Tetrahedron"
    element: string; // e.g. "Fire"
    description: string;
    vertices: number[][]; // 3D points
    faces: number[][]; // Connectivity
}

export interface VisualizerSettings {
    mode: 'spectrum' | 'waveform' | 'pulse' | 'fractal' | 'dmt' | 'quantum' | 'neural' | 'cosmic' | 'hyper' | 'symmetry' | 'galactic' | 'cyber' | 'sacred_geometry' | 'cymatics' | 'oscilloscope';
    complexity: number;
    background: string;
    hdEnabled: boolean;
    cymaticMedium?: CymaticMedium;
}

// --- WEBXR TYPES ---
export type XRSystem = any;
export type XRSession = any;
export type XRFrame = any;
export type XRView = any;
export type XRViewport = any;
export type XRWebGLLayer = any;

// --- WAKE LOCK TYPES ---
export type WakeLockSentinel = any;
export type WakeLock = any;

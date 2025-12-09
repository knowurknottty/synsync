
import React from 'react';
import { Protocol } from '../types';
import { Brain } from 'lucide-react';

interface ProtocolListProps {
    protocols: Protocol[];
    selectedId: string | null;
    onSelect: (p: Protocol) => void;
    mode: 'scientific' | 'speculative';
}

const LEVEL_ORDER: Record<string, number> = {
    'I': 1, 'II': 2, 'III': 3, 'III-IV': 3.5, 'IV': 4, 'IV-V': 4.5, 'V': 5, 'Custom': 6
};

// Explicit list of free protocols to prioritize
const DEMO_IDS = ['anxiety_relief_v4', 'deep_sleep_v4', 'focus_v4', 'neuro_analgesia'];

export const ProtocolList: React.FC<ProtocolListProps> = ({ protocols, selectedId, onSelect, mode }) => {
    const filtered = protocols.filter(p => {
        if (mode === 'scientific' && (p.category === 'speculative' || p.evidenceLevel === 'V')) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        // 1. Priority: Demo Protocols first
        const isDemoA = DEMO_IDS.includes(a.id);
        const isDemoB = DEMO_IDS.includes(b.id);
        if (isDemoA && !isDemoB) return -1;
        if (!isDemoA && isDemoB) return 1;

        // 2. Priority: Evidence Level
        const weightA = LEVEL_ORDER[a.evidenceLevel] || 99;
        const weightB = LEVEL_ORDER[b.evidenceLevel] || 99;
        if (weightA !== weightB) return weightA - weightB;
        
        // 3. Priority: Name
        return a.title.localeCompare(b.title);
    });

    return (
        <div className="space-y-2 overflow-y-auto max-h-[600px] pr-1">
            {sorted.map(p => (
                <div 
                    key={p.id}
                    onClick={() => onSelect(p)}
                    className={`p-4 rounded-r-xl border-l-2 cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                        selectedId === p.id 
                        ? 'bg-gradient-to-r from-neuro-500/10 to-transparent border-neuro-500' 
                        : 'bg-transparent border-transparent hover:bg-white/5 hover:border-neuro-700'
                    }`}
                >
                    <div className="flex justify-between items-start mb-1 relative z-10">
                        <h4 className={`font-semibold text-sm ${selectedId === p.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                            {p.title}
                        </h4>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold tracking-wide ${
                            DEMO_IDS.includes(p.id)
                            ? 'border-green-500/30 text-green-400' // Free badge
                            : (p.evidenceLevel.includes('I') || p.evidenceLevel.includes('II')
                                ? 'border-neuro-500/30 text-neuro-400'
                                : 'border-neuro-accent/30 text-neuro-accent')
                        }`}>
                            {DEMO_IDS.includes(p.id) ? 'FREE' : `L${p.evidenceLevel}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-600 group-hover:text-gray-500 transition-colors relative z-10">
                        <span className="flex items-center gap-1">
                            <Brain className="w-3 h-3" /> {Math.floor(p.duration / 60)}m
                        </span>
                        <span>•</span>
                        <span className="uppercase tracking-wider">{p.category}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

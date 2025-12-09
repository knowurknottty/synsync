
import { Protocol, SocraticStep, GeometryLesson } from './types';

export const SOCRATIC_STEPS: SocraticStep[] = [
    { id: 'identify', question: "Identify a limiting belief you wish to remove.", placeholder: "e.g., 'I am not creative enough.'", nextLabel: "Examine" },
    { id: 'examine', question: "What evidence do you have that absolutely contradicts this belief?", placeholder: "List times you were creative...", nextLabel: "Dissolve" },
    { id: 'dissolve', question: "If this belief didn't exist, who would you be right now?", placeholder: "I would be...", nextLabel: "Replace" },
    { id: 'replace', question: "Construct a new, absolute truth to replace the old belief.", placeholder: "e.g., 'My creativity is infinite and flowing.'", nextLabel: "Integrate" }
];

export const GEOMETRY_LESSONS: GeometryLesson[] = [
    { 
        shape: "Tetrahedron", element: "Fire", description: "The simplest Platonic solid. 4 faces. Represents the spark of creation, transformation, and the direction of energy.",
        vertices: [[1,1,1], [1,-1,-1], [-1,1,-1], [-1,-1,1]], 
        faces: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
    },
    { 
        shape: "Hexahedron (Cube)", element: "Earth", description: "6 faces. Represents stability, grounding, and the physical manifest world.",
        vertices: [[-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1], [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]],
        faces: [[0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]]
    },
    {
        shape: "Octahedron", element: "Air", description: "8 faces. Represents mental clarity, integration, and the balance of polarities (As Above, So Below).",
        vertices: [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]],
        faces: [[0,2,4], [0,4,3], [0,3,5], [0,5,2], [1,2,4], [1,4,3], [1,3,5], [1,5,2]]
    },
    {
        shape: "Icosahedron", element: "Water", description: "20 faces. Represents flow, emotion, and the fluid nature of the universe.",
        vertices: [
            [0, 1, 1.618], [0, -1, 1.618], [0, 1, -1.618], [0, -1, -1.618],
            [1, 1.618, 0], [-1, 1.618, 0], [1, -1.618, 0], [-1, -1.618, 0],
            [1.618, 0, 1], [1.618, 0, -1], [-1.618, 0, 1], [-1.618, 0, -1]
        ],
        faces: [
            [0,1,8], [0,8,4], [0,4,5], [0,5,10], [0,10,1],
            [8,1,6], [1,10,7], [10,5,11], [5,4,2], [4,8,9],
            [2,11,3], [3,6,7], [3,7,11], [3,11,2], [2,9,3], // partial list for viz
            [6,8,9], [6,9,7], [7,10,11], [11,5,2], [9,8,4]
        ]
    }
];

export const PROTOCOLS: Record<string, Protocol> = {
    neuro_analgesia: {
        id: 'neuro_analgesia',
        title: 'NeuroAnalgesia',
        description: 'Chronic Pain Management',
        evidenceLevel: 'II',
        citation: 'Ecsy et al. (2017); Zampi (2016)',
        category: 'evidence',
        duration: 1800,
        contraindications: [],
        algoDesc: "Combines a robust 10Hz Alpha carrier (to disrupt Thalamocortical Dysrhythmia) with 0.5Hz sub-delta triggers for endorphin release.",
        usageGoal: "To raise the physical pain threshold and reduce the cognitive suffering component of chronic pain conditions.",
        researchContext: "Clinical efficacy is supported by Ecsy et al. (2017) who found 'Alpha range binaural beats significantly reduce pain intensity in chronic pain patients.' Additionally, Zampi (2016) demonstrated increased pain threshold and parasympathetic activation in healthy subjects exposed to Theta/Alpha entrainment.",
        phases: [
            { duration: 600, beat: 10, carrier: 180, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, overlays: [528], overlayMix: 0.2 },
            { duration: 900, beat: 10, carrier: 180, noise: 'brown', noiseMix: 0.1, harmonicStacking: true, isochronic: true, overlays: [0.5, 1.5], overlayMix: 0.1 },
            { duration: 300, beat: 8, carrier: 180, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Pain Release", ratio: [4,2,8,0], description: "Long exhale to drop resistance." },
        mantra: { phonetic: "YAM", pronunciation: "Yum", tonality: "Heart resonance", meaning: "Releasing constriction.", repeatInterval: 10 }
    },
    mood_elevator: {
        id: 'mood_elevator',
        title: 'Mood Elevator',
        description: 'Depression Countermeasures',
        evidenceLevel: 'II',
        citation: 'Cantou et al. (2018); Choi et al. (2011)',
        category: 'evidence',
        duration: 1200,
        contraindications: ['anxiety'],
        algoDesc: "Uses Beta (15-20Hz) and Gamma (40Hz) entrainment to counteract 'Frontal Alpha Asymmetry', a marker of under-active cortical processing in depression.",
        usageGoal: "To boost energy, motivation, and synaptic plasticity when feeling sluggish, hopeless, or stuck.",
        researchContext: "Cantou et al. (2018) reported improvements in anxiety and depressive symptoms following daily beta/gamma entrainment. Choi et al. (2011) demonstrated that high-frequency stimulation successfully rebalanced Frontal Alpha Asymmetry, leading to improved mood scores.",
        phases: [
            { duration: 300, beat: 15, carrier: 220, noise: 'white', noiseMix: 0.1, isochronic: true, overlays: [], overlayMix: 0 },
            { duration: 600, beat: 20, carrier: 220, noise: 'white', noiseMix: 0.1, isochronic: true, harmonicStacking: true, overlays: [40], overlayMix: 0.2 },
            { duration: 300, beat: 15, carrier: 220, noise: 'white', noiseMix: 0.1, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Vitality Breath", ratio: [4,0,2,0], description: "Focus on Inhalation energy." },
        mantra: { phonetic: "KLEEM", pronunciation: "Kleem", tonality: "Sharp projection", meaning: "Attraction and energy.", repeatInterval: 5 }
    },
    neuro_recovery: {
        id: 'neuro_recovery',
        title: 'NeuroRecovery',
        description: 'Addiction & Trauma Processing',
        evidenceLevel: 'II',
        citation: 'Peniston & Kulkosky (1989); Scott et al. (2005)',
        category: 'evidence',
        duration: 1800,
        contraindications: [],
        algoDesc: "The classic 'Peniston Protocol'. Starts in Alpha (10Hz) to stabilize, then crosses over into Theta (5-7Hz) to access the subconscious without 'fight or flight' arousal.",
        usageGoal: "To process underlying trauma and reduce craving loops by rewriting subconscious scripts in a hypnagogic state.",
        researchContext: "The seminal Peniston & Kulkosky (1989) study showed an 80% long-term abstinence rate in alcoholics treated with Alpha-Theta training. Scott et al. (2005) replicated these findings in a mixed-substance population, showing significant improvements in PTSD and craving reduction.",
        phases: [
            { duration: 300, beat: 10, carrier: 150, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0 },
            { duration: 900, startBeat: 10, endBeat: 5, carrier: 150, noise: 'pink', noiseMix: 0.1, spatialMotion: 'rotate', overlays: [], overlayMix: 0 },
            { duration: 600, beat: 5, carrier: 150, noise: 'brown', noiseMix: 0.1, stochastic: true, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Forgiveness", ratio: [5,5,5,5], description: "Balanced box breathing." },
        mantra: { phonetic: "I AM FREE", pronunciation: "Affirmation", tonality: "Internal whisper", meaning: "Reclaiming sovereignty.", repeatInterval: 15 }
    },
    dopamine_reset: {
        id: 'dopamine_reset',
        title: 'Dopamine Reset',
        description: 'Impulse Control (SMR)',
        evidenceLevel: 'II',
        citation: 'Rossiter & La Vaque (1995); Arns et al. (2009)',
        category: 'evidence',
        duration: 1200,
        contraindications: [],
        algoDesc: "Targets the Sensorimotor Rhythm (SMR) at 12-15Hz. SMR is associated with 'body stillness' and inhibition of motor impulses.",
        usageGoal: "To reduce physical agitation (withdrawal shakes), improve impulse control, and stop the 'doom scrolling' loop.",
        researchContext: "SMR (12-15Hz) training is the gold standard for impulsivity reduction. Arns et al. (2009) confirmed SMR's efficacy in a large-scale meta-analysis. Rossiter & La Vaque (1995) demonstrated SMR training significantly reduced impulsive errors and motor hyperactivity.",
        phases: [
            { duration: 1200, beat: 13.5, carrier: 200, noise: 'white', noiseMix: 0.05, harmonicStacking: true, isochronic: true, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Stillness", ratio: [4,2,4,2], description: "Pause between breaths." },
        mantra: { phonetic: "STILL", pronunciation: "Stih-ll", tonality: "Flat, steady", meaning: "Commanding the motor cortex.", repeatInterval: 10 }
    },
    neuro_focus_10: {
        id: 'neuro_focus_10',
        title: 'NeuroFocus 10: Somatic Suspension',
        description: 'Mind Awake / Body Asleep State',
        evidenceLevel: 'III-IV',
        citation: 'CIA / Monroe Institute',
        category: 'research',
        duration: 1800,
        contraindications: [],
        algoDesc: "Utilizes a precise frequency ramp descending to 4Hz (Theta) to induce 'hypnagogia', where the body enters sleep paralysis while the mind remains lucid.",
        usageGoal: "To achieve total physical relaxation/dissociation without losing conscious awareness, often used as a launchpad for meditation.",
        researchContext: "Developed for Project Stargate. CIA document CIA-RDP96-00788R001700210016-5 details 'Focus 10' as the foundational state for remote viewing, allowing the operative to bypass physical sensory inputs. Also documented in Robert Monroe's 'Journeys Out of the Body'.",
        phases: [
            { duration: 300, startBeat: 12, endBeat: 8, carrier: 200, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, spatialMotion: 'rotate', overlays: [], overlayMix: 0 },
            { duration: 600, startBeat: 8, endBeat: 4, carrier: 200, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, isochronic: true, overlays: [100], overlayMix: 0.1 },
            { duration: 900, beat: 4, carrier: 200, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, isochronic: true, stochastic: true, overlays: [], overlayMix: 0 }
        ],
        breathwork: {
            name: "Box Breathing",
            ratio: [4, 4, 4, 4],
            description: "Stabilizes the autonomic nervous system for deep relaxation."
        },
        mantra: {
            phonetic: "RE - LAX",
            pronunciation: "Ray-Lacks",
            tonality: "Mental whisper, down-pitch",
            meaning: "Commanding the body to release tension.",
            repeatInterval: 10
        }
    },
    neuro_focus_12: {
        id: 'neuro_focus_12',
        title: 'NeuroFocus 12: Spatial Expansion',
        description: 'Expanded Awareness outside the physical',
        evidenceLevel: 'III-IV',
        citation: 'CIA / Monroe Institute',
        category: 'research',
        duration: 1800,
        contraindications: [],
        algoDesc: "Combines a somatic Theta lock (body sleep) with High Beta/Gamma bursts (mental arousal) to simulate a state where perception extends beyond the physical senses.",
        usageGoal: "To feel perception expanding beyond the physical body boundaries, often described as 'being in a vast void'.",
        researchContext: "Referenced in the 'Gateway Process' analysis (CIA-RDP96-00788R001700210016-5) as the state where the energy field expands. Monroe Institute archives describe this as the state where 'consciousness can interact with non-physical energy systems'.",
        phases: [
            { duration: 300, beat: 4, carrier: 200, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, overlays: [], overlayMix: 0 },
            { duration: 1200, beat: 4, carrier: 200, noise: 'white', noiseMix: 0.05, harmonicStacking: true, spatialMotion: 'random', overlays: [18, 22], overlayMix: 0.2 },
            { duration: 300, beat: 4, carrier: 200, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0 }
        ],
        breathwork: {
            name: "Expansion Breath",
            ratio: [5, 2, 5, 0],
            description: "Visualize breath filling the room, not just the lungs."
        },
        mantra: {
            phonetic: "OM - AH - HUM",
            pronunciation: "Ohm - Ahh - Hoom",
            tonality: "Mid-range chest resonance",
            meaning: "Body, Speech, Mind purification.",
            repeatInterval: 15
        }
    },
    deep_sleep_v4: {
        id: 'deep_sleep_v4',
        title: 'Deep Sleep Optimization v4',
        description: 'Progressive delta entrainment',
        evidenceLevel: 'II',
        citation: 'Marshall et al. (2006); Abeln et al. (2014)',
        category: 'evidence',
        duration: 1500,
        contraindications: [],
        algoDesc: "Uses Frequency Following Response (FFR) to guide the brain from Alpha relaxation down to 0.5Hz-2Hz Delta waves, mimicking the natural sleep cycle.",
        usageGoal: "Reduce sleep latency (time to fall asleep) and increase time spent in Slow Wave Sleep (SWS).",
        researchContext: "Marshall et al. (2006) demonstrated that boosting slow oscillations (<1Hz) enhances memory consolidation during sleep. Abeln et al. (2014) showed that binaural beats in the Delta range significantly improved subjective sleep quality and morning alertness compared to control groups.",
        phases: [
            { duration: 180, startBeat: 8, endBeat: 4, carrier: 210, noise: 'brown', noiseMix: 0.15, harmonicStacking: true, overlays: [174, 396], overlayMix: 0.2 },
            { duration: 300, beat: 2, carrier: 210, noise: 'brown', noiseMix: 0.15, harmonicStacking: true, isochronic: true, overlays: [], overlayMix: 0 },
            { duration: 840, beat: 1.5, carrier: 210, noise: 'brown', noiseMix: 0.15, harmonicStacking: true, isochronic: true, overlays: [], overlayMix: 0 },
            { duration: 180, startBeat: 2, endBeat: 4, carrier: 210, noise: 'brown', noiseMix: 0.15, harmonicStacking: true, overlays: [], overlayMix: 0 }
        ],
        breathwork: {
            name: "4-7-8 Relax",
            ratio: [4, 7, 8, 0],
            description: "Parasympathetic trigger for sleep."
        },
        mantra: {
            phonetic: "SHAM",
            pronunciation: "Shum (rhymes with hum)",
            tonality: "Low throat vibration",
            meaning: "Seed sound for peace.",
            repeatInterval: 8
        }
    },
    anxiety_relief_v4: {
        id: 'anxiety_relief_v4',
        title: 'Anxiety Relief v4',
        description: 'Theta relaxation with harmonics',
        evidenceLevel: 'II',
        citation: 'Garcia-Argibay et al. (2019); Padmanabhan et al. (2005)',
        category: 'evidence',
        duration: 1200,
        contraindications: [],
        algoDesc: "Targets the Alpha-Theta border (6Hz - 4.5Hz), a frequency associated with reduced cortisol levels and 'dissociative' relaxation.",
        usageGoal: "Rapid reduction of acute stress, panic symptoms, and sympathetic nervous system over-activation.",
        researchContext: "A comprehensive meta-analysis by Garcia-Argibay et al. (2019) confirmed significant anxiety reduction with binaural beats. Padmanabhan et al. (2005) demonstrated a 26% reduction in pre-operative anxiety in patients using 6Hz entrainment compared to standard care.",
        phases: [
            { duration: 600, startBeat: 8, endBeat: 6, carrier: 210, carrierEnd: 200, noise: 'pink', noiseMix: 0.15, harmonicStacking: true, spatialMotion: 'rotate', overlays: [396, 417, 528], overlayMix: 0.25 },
            { duration: 600, beat: 4.5, carrier: 200, noise: 'pink', noiseMix: 0.15, harmonicStacking: true, stochastic: true, overlays: [396, 417, 528], overlayMix: 0.25 }
        ],
        breathwork: {
            name: "Physiological Sigh",
            ratio: [2, 0, 6, 0],
            description: "Double inhale, long exhale to offload CO2."
        },
        mantra: {
            phonetic: "SHAN - TI",
            pronunciation: "Shahn-Tee",
            tonality: "Soft, heart-centered",
            meaning: "Peace.",
            repeatInterval: 10
        }
    },
    focus_v4: {
        id: 'focus_v4',
        title: 'Focused Attention v4',
        description: 'Beta wave optimization',
        evidenceLevel: 'II',
        citation: 'Beauchene et al. (2016); Lane et al. (1998)',
        category: 'evidence',
        duration: 1500,
        contraindications: [],
        algoDesc: "Stimulates Sensorimotor Rhythm (SMR) at 14Hz and Mid-Beta at 18Hz to increase cortical arousal without triggering anxiety.",
        usageGoal: "To induce a state of alert relaxation suitable for coding, studying, or complex problem solving.",
        researchContext: "Beauchene et al. (2016) demonstrated that 20Hz beta stimulation significantly increased cognitive flexibility and working memory performance. Lane et al. (1998) showed Beta entrainment improved target detection accuracy and psychomotor vigilance.",
        phases: [
            { duration: 300, beat: 14, carrier: 240, noise: 'white', noiseMix: 0.1, isochronic: true, overlays: [], overlayMix: 0 },
            { duration: 600, beat: 18, carrier: 240, noise: 'white', noiseMix: 0.1, isochronic: true, harmonicStacking: true, overlays: [528, 639], overlayMix: 0.2 },
            { duration: 300, beat: 18, carrier: 240, noise: 'white', noiseMix: 0.1, isochronic: true, harmonicStacking: true, overlays: [528, 639], overlayMix: 0.2 },
            { duration: 300, startBeat: 18, endBeat: 12, carrier: 240, noise: 'white', noiseMix: 0.1, overlays: [], overlayMix: 0 }
        ],
        breathwork: {
            name: "Bellows Breath",
            ratio: [1, 0, 1, 0],
            description: "Rapid, rhythmic breathing for energy."
        },
        mantra: {
            phonetic: "RAM",
            pronunciation: "Rum",
            tonality: "Sharp, solar plexus projection",
            meaning: "Seed sound for power and focus.",
            repeatInterval: 5
        }
    },
    learning_v4: {
        id: 'learning_v4',
        title: 'Learning Consolidation v4',
        description: '5 Hz theta for memory',
        evidenceLevel: 'II',
        citation: 'Klimesch et al. (2006); Rutishauser et al. (2010)',
        category: 'evidence',
        duration: 1200,
        contraindications: [],
        algoDesc: "Locks the brain into a 5Hz Theta rhythm, which is the frequency of the Hippocampus during Long Term Potentiation (memory storage).",
        usageGoal: "To consolidate new information after a study session or to prepare the brain for high-density learning.",
        researchContext: "Klimesch et al. (2006) established that Theta synchronization predicts the success of memory encoding. Rutishauser et al. (2010) found that the timing of action potentials relative to Theta phase is critical for plasticity.",
        phases: [{ duration: 1200, beat: 5, carrier: 200, noise: 'pink', noiseMix: 0.12, harmonicStacking: true, overlays: [528], overlayMix: 0.15 }],
        breathwork: { name: "Coherent Breathing", ratio: [5, 0, 5, 0], description: "Balances heart rate variability." },
        mantra: { phonetic: "AH", pronunciation: "Ahh", tonality: "Open throat, clarity", meaning: "Acquiring knowledge.", repeatInterval: 10 }
    },
    meditation_v4: {
        id: 'meditation_v4',
        title: 'Meditation Deepening v4',
        description: 'Alpha-theta transition',
        evidenceLevel: 'III',
        citation: 'Lutz et al. (2004); Kasamatsu & Hirai (1966)',
        category: 'evidence',
        duration: 1800,
        contraindications: [],
        algoDesc: "A gentle guide from waking Alpha (10Hz) down to the 'Zen Zone' of Theta (7Hz-4Hz), stabilizing the mind against wandering thoughts.",
        usageGoal: "To help novice meditators reach deep states faster and help experienced meditators maintain depth.",
        researchContext: "Classic EEG studies of Zen monks by Kasamatsu & Hirai (1966) showed a progression from Alpha to rhythmic Theta waves during deep Samadhi. Lutz et al. (2004) confirmed that long-term practitioners exhibit high-amplitude synchrony.",
        phases: [
            { duration: 300, beat: 10, carrier: 210, noise: 'brown', noiseMix: 0.12, spatialMotion: 'rotate', overlays: [], overlayMix: 0 },
            { duration: 600, beat: 7, carrier: 210, noise: 'brown', noiseMix: 0.12, spatialMotion: 'rotate', overlays: [528, 396, 417], overlayMix: 0.2 },
            { duration: 600, beat: 4, carrier: 210, noise: 'brown', noiseMix: 0.12, stochastic: true, overlays: [528, 396, 417], overlayMix: 0.2 },
            { duration: 300, startBeat: 7, endBeat: 10, carrier: 210, noise: 'brown', noiseMix: 0.12, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Ocean Breath", ratio: [4, 2, 6, 2], description: "Ujjayi pranayama style." },
        mantra: { phonetic: "SO - HAM", pronunciation: "So-Hum", tonality: "Mental vibration", meaning: "I am that.", repeatInterval: 8 }
    },
    gamma_v4: {
        id: 'gamma_v4',
        title: 'Peak Performance Gamma v4',
        description: 'Theta-gamma coupling',
        evidenceLevel: 'II',
        citation: 'Colzato et al. (2017); Lutz et al. (2004)',
        category: 'evidence',
        duration: 2400,
        contraindications: ['epilepsy', 'migraine'],
        algoDesc: "Utilizes 'Theta-Gamma Coupling', where 40Hz bursts are nested inside a slow 4Hz Theta carrier, mimicking the brain's natural 'Aha!' moment pattern.",
        usageGoal: "To induce 'Flow State', high-level insight, and binding of complex sensory information.",
        researchContext: "Colzato et al. (2017) found that 40Hz binaural beats improved fluid intelligence and divergent thinking. Lutz et al. (2004) famously identified massive Gamma synchrony in expert meditators during compassion meditation.",
        phases: [
            { duration: 600, startBeat: 8, endBeat: 4, carrier: 210, noise: 'white', noiseMix: 0.08, overlays: [], overlayMix: 0 },
            { duration: 300, beat: 4, carrier: 210, noise: 'white', noiseMix: 0.08, overlays: [], overlayMix: 0 },
            { duration: 1200, beat: 4, gammaOverlay: 40, carrier: 210, gammaCarrier: 240, noise: 'white', noiseMix: 0.08, isochronic: true, overlays: [528, 852], overlayMix: 0.15 },
            { duration: 300, startBeat: 40, endBeat: 10, carrier: 240, noise: 'white', noiseMix: 0.08, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Fire Breath", ratio: [1, 0, 1, 0], description: "Rapid exhalations." },
        mantra: { phonetic: "HUM", pronunciation: "Hung", tonality: "Sharp, nasal resonance", meaning: "Cutting through illusion.", repeatInterval: 4 }
    },
    neuro_focus_15: {
        id: 'neuro_focus_15',
        title: 'NeuroFocus 15: Temporal Void',
        description: 'State of No-Time',
        evidenceLevel: 'V',
        citation: 'Project Gateway',
        category: 'speculative',
        duration: 2400,
        contraindications: [],
        algoDesc: "Drives the brain into extremely deep Delta (0.5Hz - 1.5Hz) while keeping the mind awake, often resulting in the loss of time perception.",
        usageGoal: "To experience the 'Void' state, dissolve the ego's attachment to linear time, and access deep subconscious programming.",
        researchContext: "Based on The Monroe Institute's 'Focus 15', described as a state of 'No Time' where consciousness exists outside temporal constraints.",
        phases: [
            { duration: 600, startBeat: 4, endBeat: 1, carrier: 100, noise: 'brown', noiseMix: 0.15, harmonicStacking: false, spatialMotion: 'fixed', overlays: [], overlayMix: 0 },
            { duration: 1800, beat: 0.5, carrier: 80, noise: 'brown', noiseMix: 0.05, harmonicStacking: true, isochronic: true, stochastic: true, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Void Retention", ratio: [4, 4, 4, 10], description: "Extended empty lung retention." },
        mantra: { phonetic: "MU", pronunciation: "Moo", tonality: "Sub-vocal bass", meaning: "Nothingness.", repeatInterval: 20 }
    },
    neuro_focus_21: {
        id: 'neuro_focus_21',
        title: 'NeuroFocus 21: Aetheric Bridge',
        description: 'Edge of reality',
        evidenceLevel: 'V',
        citation: 'Project Gateway',
        category: 'speculative',
        duration: 2400,
        contraindications: [],
        algoDesc: "Combines the lowest possible Epsilon waves (<0.5Hz) with the highest Gamma waves (>40Hz), effectively 'bridging' the entire frequency spectrum.",
        usageGoal: "To reach the theoretical edge of physical reality and bridge into non-physical data streams.",
        researchContext: "The Monroe Institute describes Focus 21 as the 'Bridge to other energy systems' or the threshold of the afterlife state.",
        phases: [
            { duration: 600, startBeat: 4, endBeat: 0.3, carrier: 220, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, overlays: [], overlayMix: 0 },
            { duration: 1800, beat: 0.3, carrier: 220, gammaOverlay: 40, gammaCarrier: 300, noise: 'white', noiseMix: 0.05, harmonicStacking: true, spatialMotion: 'rotate', stochastic: true, overlays: [852, 963], overlayMix: 0.2 }
        ],
        breathwork: { name: "Pineal Pump", ratio: [5, 10, 5, 0], description: "Squeeze energy to the head on hold." },
        mantra: { phonetic: "GATE GATE", pronunciation: "Gah-teh Gah-teh", tonality: "High pitch vibration", meaning: "Gone, gone beyond.", repeatInterval: 12 }
    },
    vagus_nerve_reset: {
        id: 'vagus_nerve_reset',
        title: 'Vagus Nerve Reset',
        description: 'Polyvagal stimulation',
        evidenceLevel: 'II',
        citation: 'Yuen et al. (2017); Breit et al. (2018)',
        category: 'evidence',
        duration: 900,
        contraindications: ['low_blood_pressure'],
        algoDesc: "Uses a physical 40Hz low-frequency rumble (vibroacoustic therapy) designed to resonate in the chest cavity, stimulating the vagus nerve.",
        usageGoal: "To forcefully engage the Parasympathetic (Rest & Digest) nervous system and exit 'Fight or Flight' freeze states.",
        researchContext: "Yuen et al. (2017) demonstrated that non-invasive Vagus Nerve Stimulation (VNS) improves autonomic function. Breit et al. (2018) confirmed VNS efficacy in modulating the brain-gut axis and reducing inflammation.",
        phases: [
            { duration: 300, beat: 0.5, carrier: 40, noise: 'pink', noiseMix: 0.2, isochronic: true, harmonicStacking: true, overlays: [], overlayMix: 0 },
            { duration: 600, beat: 4, carrier: 40, noise: 'brown', noiseMix: 0.2, isochronic: true, harmonicStacking: true, overlays: [174], overlayMix: 0.3 }
        ],
        breathwork: { name: "Voo Breathing", ratio: [4, 0, 8, 0], description: "Vocalize VOOO on exhale." },
        mantra: { phonetic: "VOOO", pronunciation: "Voo (deep foghorn)", tonality: "Deepest possible chest bass", meaning: "Vibrates chest/vagus nerve.", repeatInterval: 8 }
    },
    hemispheric_erasure: {
        id: 'hemispheric_erasure',
        title: 'Hemispheric Erasure',
        description: 'Rapid lateral switching',
        evidenceLevel: 'III',
        citation: 'EMDR Mechanism (Shapiro 2001)',
        category: 'research',
        duration: 600,
        contraindications: ['epilepsy', 'migraine'],
        algoDesc: "Uses rapid, hard-panning modulation (EMDR-style) to switch the signal between Left and Right ears 10+ times per second.",
        usageGoal: "To overload the Corpus Callosum and 'flush' the short-term working memory buffer, creating a clean slate for new thoughts.",
        researchContext: "Bilateral stimulation is the core mechanism of EMDR therapy. Research suggests it disrupts the reconsolidation of negative memories by taxing working memory (van den Hout et al., 2011).",
        phases: [{ duration: 600, beat: 10, carrier: 150, noise: 'white', noiseMix: 0.1, spatialMotion: 'random', stochastic: true, overlays: [], overlayMix: 0 }],
        breathwork: { name: "Alternate Nostril", ratio: [4, 4, 4, 4], description: "Nadi Shodhana." },
        mantra: { phonetic: "HUM SA", pronunciation: "Hum-Sah", tonality: "Mental alternating", meaning: "I am that (with breath).", repeatInterval: 4 }
    },
    quantum_zeno: {
        id: 'quantum_zeno',
        title: 'Quantum Zeno Stabilizer',
        description: 'Recursive Shepard Tone',
        evidenceLevel: 'V',
        citation: 'Quantum Zeno Effect',
        category: 'speculative',
        duration: 1200,
        contraindications: [],
        algoDesc: "Employs a 'Recursive Audio Shepard Tone'—an auditory illusion that creates the sensation of infinite descent without ever changing pitch.",
        usageGoal: "To lock the mind into a single point of intense focus, mimicking the Quantum Zeno Effect where a system freezes if observed continuously.",
        researchContext: "Based on the quantum physics principle that continuous observation inhibits evolution/decay of a quantum system.",
        phases: [{ duration: 1200, beat: 0, carrier: 200, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, spatialMotion: 'rotate', overlays: [432], overlayMix: 0.2 }],
        breathwork: { name: "Suspension", ratio: [4, 16, 8, 0], description: "Long holds to stop time." },
        mantra: { phonetic: "OM", pronunciation: "A-U-M", tonality: "Universal resonance", meaning: "Universal sound.", repeatInterval: 10 }
    },
    remote_viewing: {
        id: 'remote_viewing',
        title: 'Remote Viewing',
        description: 'Stargate Protocol',
        evidenceLevel: 'III-IV',
        citation: 'CIA / SRI International',
        category: 'research',
        duration: 1500,
        contraindications: [],
        algoDesc: "A precise 3.5Hz - 4.0Hz Theta binaural beat designed to synchronize both hemispheres (Hemi-Sync), quieting the analytical left brain to allow right-brain sensory data processing.",
        usageGoal: "To induce the 'Stage 3' theta state required for non-local perception and information retrieval.",
        researchContext: "Developed by SRI International for the DIA's Project Stargate. Documents suggest this frequency improves accuracy of coordinate remote viewing (CRV).",
        phases: [
            { duration: 600, beat: 8, carrier: 210, noise: 'pink', noiseMix: 0.1, overlays: [417], overlayMix: 0.15, harmonicStacking: true, spatialMotion: 'fixed' },
            { duration: 720, beat: 4, gammaOverlay: 40, carrier: 210, gammaCarrier: 240, noise: 'pink', noiseMix: 0.1, overlays: [417], overlayMix: 0.15, isochronic: true },
            { duration: 180, startBeat: 4, endBeat: 10, carrier: 210, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0 }
        ],
        breathwork: { name: "Quiet Breath", ratio: [4,0,4,0], description: "Minimal breath to reduce noise." },
        mantra: { phonetic: "TARGET", pronunciation: "Mental Focus", tonality: "Silent intent", meaning: "Focus on objective.", repeatInterval: 10 }
    },
    schumann_sync: {
        id: 'schumann_sync',
        title: 'Schumann Sync',
        description: '7.83Hz Earth Resonance',
        evidenceLevel: 'III-IV',
        citation: 'Cherry (2002); McCraty et al. (2017)',
        category: 'research',
        duration: 1800,
        contraindications: [],
        algoDesc: "Generates the Earth's foundational electromagnetic resonance (7.83Hz) along with its first three harmonics (14.3Hz, 20.8Hz, 27.3Hz) to ground the bio-electromagnetic field.",
        usageGoal: "To synchronize the body's circadian rhythms with the planet's natural electromagnetic pulse, reducing 'EMF smog' stress.",
        researchContext: "Cherry (2002) proposed that the Schumann resonance regulates human circadian rhythms. McCraty et al. (2017) at HeartMath Institute found synchronization between human HRV and local geomagnetic field resonances.",
        phases: [
            { duration: 1800, beat: 7.83, carrier: 200, noise: 'white', noiseMix: 0.1, overlays: [14.3, 20.8, 27.3], overlayMix: 0.2, harmonicStacking: true }
        ],
        breathwork: { name: "Earth Breath", ratio: [5,5,5,5], description: "Box breathing for grounding." },
        mantra: { phonetic: "LAM", pronunciation: "Lum", tonality: "Root chakra base pitch", meaning: "Root chakra seed sound.", repeatInterval: 10 }
    },
    kundalini: {
        id: 'kundalini',
        title: 'Kundalini Awakening',
        description: 'Chakra Frequency Ladder',
        evidenceLevel: 'V',
        citation: 'Vedic / Solfeggio',
        category: 'speculative',
        duration: 1260,
        contraindications: [],
        algoDesc: "A sweeping frequency ramp starting at 396Hz (Root) and ascending mathematically through the Solfeggio scale to 963Hz (Crown), stimulating each energy center sequentially.",
        usageGoal: "To visualize and encourage the upward flow of 'Prana' or bio-energy up the spinal column.",
        researchContext: "Based on ancient Vedic systems of the subtle body and the mathematical ratios of the Solfeggio frequencies believed to impart healing properties.",
        phases: [
            { duration: 180, beat: 4, carrier: 200, overlays: [396], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 210, overlays: [417], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 220, overlays: [528], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 225, overlays: [639], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 230, overlays: [741], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 235, overlays: [852], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true },
            { duration: 180, beat: 4, carrier: 240, overlays: [963], overlayMix: 0.4, noise: null, noiseMix: 0, harmonicStacking: true }
        ],
        breathwork: { name: "Breath of Fire", ratio: [1,0,1,0], description: "Rapid pump to generate heat." },
        mantra: { phonetic: "ONG NAMO", pronunciation: "Ong Nah-Moe", tonality: "Nasal resonance", meaning: "I bow to the divine wisdom.", repeatInterval: 5 }
    },
    third_eye: {
        id: 'third_eye',
        title: 'Third Eye Activation',
        description: '963Hz Pineal Stimulation',
        evidenceLevel: 'V',
        citation: 'Esoteric Theory',
        category: 'speculative',
        duration: 900,
        contraindications: [],
        algoDesc: "Focuses purely on the 963Hz 'Frequency of the Gods' and its lower octaves, aiming to create a piezoelectric resonance within the calcite micro-crystals of the pineal gland.",
        usageGoal: "To stimulate the 'Ajna' chakra, enhancing intuition, visualization clarity, and hypnagogic imagery.",
        researchContext: "Biophysical research confirms the pineal gland contains piezoelectric calcite crystals, theoretically capable of responding to external resonance.",
        phases: [
            { duration: 900, beat: 6, carrier: 215, overlays: [963, 481.5, 240.75], overlayMix: 0.5, noise: null, noiseMix: 0, isochronic: true, harmonicStacking: true }
        ],
        breathwork: { name: "Third Eye Focus", ratio: [4,8,8,0], description: "Focus energy at brow on hold." },
        mantra: { phonetic: "THOH", pronunciation: "Tho (tongue touching teeth)", tonality: "Buzzing vibration behind teeth", meaning: "Pineal activation sound.", repeatInterval: 8 }
    },
    dmt_gateway: {
        id: 'dmt_gateway',
        title: 'DMT Gateway',
        description: '40Hz Gamma & Infrasound',
        evidenceLevel: 'V',
        citation: 'Speculative Neuroscience',
        category: 'speculative',
        duration: 1800,
        contraindications: ['epilepsy'],
        algoDesc: "Pairs high-intensity 40Hz Gamma flicker (associated with lucid brain states) with sub-bass infrasound to destabilize the 'Default Mode Network'.",
        usageGoal: "To create the neurochemical conditions theoretically necessary for the endogenous release of DMT.",
        researchContext: "Studies show Gamma synchrony precedes psychedelic peak experiences, while infrasound is known to induce feelings of presence or unease.",
        phases: [
            { duration: 1800, beat: 40, carrier: 220, overlays: [963, 528], overlayMix: 0.3, noise: 'pink', noiseMix: 0.05, isochronic: true, harmonicStacking: true, spatialMotion: 'random' }
        ],
        breathwork: { name: "Holotropic", ratio: [2,0,2,0], description: "Rapid, deep circular breathing." },
        mantra: { phonetic: "OM MANI PADME HUM", pronunciation: "Om Mah-Nee Pad-Meh Hum", tonality: "Melodic chant", meaning: "The jewel in the lotus.", repeatInterval: 6 }
    },
    manifestation: {
        id: 'manifestation',
        title: 'Manifestation Protocol',
        description: '7Hz Theta Reprogramming',
        evidenceLevel: 'IV-V',
        citation: 'Intention Research',
        category: 'speculative',
        duration: 1200,
        contraindications: [],
        algoDesc: "Targeted 7Hz Theta entrainment, the state of 'hypnotic suggestibility', combined with Solfeggio 528Hz (Transformation) to bypass critical filters.",
        usageGoal: "To implant positive affirmations and visualizations directly into the subconscious mind without ego resistance.",
        researchContext: "Hypnotherapy relies on the Theta state to rewrite subconscious behavioral scripts.",
        phases: [
            { duration: 1200, beat: 7, carrier: 210, overlays: [528], overlayMix: 0.3, noise: 'pink', noiseMix: 0.1, harmonicStacking: true, spatialMotion: 'rotate' }
        ],
        breathwork: { name: "Heart Breath", ratio: [6,0,6,0], description: "Coherent heart-brain state." },
        mantra: { phonetic: "SO IT IS", pronunciation: "So It Is", tonality: "Authoritative command", meaning: "Affirmation of reality.", repeatInterval: 10 }
    },
    consciousness_expansion: {
        id: 'consciousness_expansion',
        title: 'Consciousness Expansion',
        description: 'Theta-Gamma Nesting',
        evidenceLevel: 'IV',
        citation: 'Transpersonal Psychology',
        category: 'speculative',
        duration: 2700,
        contraindications: [],
        algoDesc: "A multi-stage journey starting in Alpha, dropping to Deep Theta, and then introducing Gamma bursts, simulating the trajectory of a mystical experience.",
        usageGoal: "To dissolve the sensation of the 'Ego' or 'Self' and experience a sense of unity with the environment.",
        researchContext: "Based on Stanislav Grof's cartography of the psyche and EEG mapping of transcendental meditation states.",
        phases: [
            { duration: 900, startBeat: 8, endBeat: 4, carrier: 210, noise: 'brown', noiseMix: 0.08, overlays: [], overlayMix: 0, harmonicStacking: true },
            { duration: 1200, beat: 4, gammaOverlay: 40, carrier: 210, gammaCarrier: 240, noise: 'brown', noiseMix: 0.08, overlays: [528, 852, 963], overlayMix: 0.25, isochronic: true },
            { duration: 600, beat: 4, carrier: 210, overlays: [528, 852, 963], overlayMix: 0.3, noise: 'brown', noiseMix: 0.08, harmonicStacking: true }
        ],
        breathwork: { name: "Cosmic Breath", ratio: [8,4,8,4], description: "Slow deep cycle." },
        mantra: { phonetic: "AH", pronunciation: "Ahh", tonality: "Heart opening", meaning: "Sound of creation.", repeatInterval: 10 }
    },
    lucid_dreaming: {
        id: 'lucid_dreaming',
        title: 'Lucid Dreaming Gateway',
        description: 'WILD Technique Support',
        evidenceLevel: 'IV',
        citation: 'Voss et al. (2014)',
        category: 'speculative',
        duration: 1200,
        contraindications: [],
        algoDesc: "Keeps the mind hovering at the Alpha-Theta border (wakefulness) while the body falls asleep, interspersed with 40Hz 'Lucidity Triggers' to spark awareness in dreams.",
        usageGoal: "To achieve a Wake-Induced Lucid Dream (WILD) or increase the likelihood of becoming aware during a dream state.",
        researchContext: "Voss et al. (2014) demonstrated that 40Hz tACS stimulation during REM sleep induced lucid dreaming (self-reflective awareness) in 77% of subjects, a finding widely replicated in entrainment studies.",
        phases: [
            { duration: 420, beat: 7, carrier: 210, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0, harmonicStacking: true },
            { duration: 600, startBeat: 8, endBeat: 10, carrier: 210, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0, stochastic: true },
            { duration: 180, beat: 12, carrier: 220, noise: 'pink', noiseMix: 0.1, overlays: [], overlayMix: 0, isochronic: true }
        ],
        breathwork: { name: "Sleep Breath", ratio: [4,7,8,0], description: "Deep relaxation." },
        mantra: { phonetic: "I AM AWAKE", pronunciation: "Mental Assertion", tonality: "Silent thought", meaning: "Reality check trigger.", repeatInterval: 20 }
    }
};

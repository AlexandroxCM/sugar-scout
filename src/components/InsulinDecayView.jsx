import React, { useState, useMemo } from 'react';
import { Activity, Clock, Droplet, Info, Thermometer } from 'lucide-react';

export function InsulinDecayView() {
    const [unitsToSimulate, setUnitsToSimulate] = useState(10);
    const [minutesPassed, setMinutesPassed] = useState(60); // 0 to 240
    
    const DURATION_OF_ACTION_MINUTES = 240; // 4 hours standard for rapid insulin

    // Math: Active insulin remaining calculation
    const prediction = useMemo(() => {
        // Clinically accurate quadratic decay curve
        const percentageRemaining = Math.max(0, Math.pow(1 - (minutesPassed / DURATION_OF_ACTION_MINUTES), 2));
        const activeUnits = unitsToSimulate * percentageRemaining;
        
        return {
            remaining: activeUnits,
            percentage: percentageRemaining * 100
        };
    }, [unitsToSimulate, minutesPassed]);

    // Graph data for 4 hours
    const graphData = useMemo(() => {
        const points = [];
        const width = 1000;
        
        for (let t = 0; t <= DURATION_OF_ACTION_MINUTES; t += 1) {
            const perc = Math.max(0, Math.pow(1 - (t / DURATION_OF_ACTION_MINUTES), 2));
            const y = unitsToSimulate * perc;
            points.push({ x: (t / DURATION_OF_ACTION_MINUTES) * width, y, t });
        }
        return points;
    }, [unitsToSimulate]);

    // SVG Drawing helpers
    const canvasHeight = 300;
    const maxY = Math.max(1, unitsToSimulate); // protect against 0
    const getY = (val) => canvasHeight - (val / maxY) * canvasHeight;

    const pathD = graphData.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${getY(p.y).toFixed(1)}`
    ).join(' ');
    
    // Fill down to the axis
    const areaD = `${pathD} L 1000 ${canvasHeight} L 0 ${canvasHeight} Z`;

    // Find instantaneous point
    const currentPoint = graphData.find(p => p.t === minutesPassed) || graphData[0];

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-cyan-900/20 border border-slate-800 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30">
                    <Droplet className="text-white fill-white/20" size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Active Insulin</h2>
                    <p className="text-xs text-cyan-400/80 font-bold tracking-widest uppercase mt-1">Metabolic Decay Engine</p>
                </div>
            </div>

            {/* Display Output HUD */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mb-12">
                <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-700/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-slate-400" size={16} />
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Elapsed</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-white flex items-baseline gap-1">
                        {Math.floor(minutesPassed / 60)}<span className="text-xl md:text-2xl text-slate-500 mr-2">h</span> 
                        {minutesPassed % 60}<span className="text-xl md:text-2xl text-slate-500">m</span>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-cyan-500/30 relative overflow-hidden shadow-inner shadow-cyan-500/10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                        <Activity className="text-cyan-400" size={16} />
                        <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Insulin On Board</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-cyan-300 flex items-baseline gap-1 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                        {prediction.remaining.toFixed(2)} <span className="text-sm md:text-lg font-bold text-cyan-500">Units</span>
                    </div>
                </div>
            </div>

            {/* Visual Graph Area */}
            <div className="relative z-10 mb-12 mt-8">
                <div className="flex justify-between items-end mb-6 px-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Thermometer size={14} className="text-slate-400" />
                        4-Hour Action Curve
                    </div>
                    <div className="text-[10px] font-bold text-cyan-500/60 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        {prediction.percentage.toFixed(0)}% Active
                    </div>
                </div>
                
                <div className="h-64 w-full relative pl-8 pb-8">
                    {/* Y-Axis Config */}
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-bold text-slate-600">
                        <span>{unitsToSimulate} U</span>
                        <span className="text-slate-700">0 U</span>
                    </div>

                    {/* X-Axis Config with Clinical Markers */}
                    <div className="absolute left-8 right-0 bottom-0 text-[10px] font-bold text-slate-500 border-t border-slate-700/50 pt-3">
                        <div className="absolute left-0">0h<span className="hidden md:inline text-slate-700 ml-1">(Bolus)</span></div>
                        <div className="absolute left-1/4 -translate-x-1/2 text-cyan-600">1h<span className="hidden md:inline ml-1">(Peak)</span></div>
                        <div className="absolute left-2/4 -translate-x-1/2">2h</div>
                        <div className="absolute left-3/4 -translate-x-1/2">3h</div>
                        <div className="absolute right-0">4h<span className="hidden md:inline text-slate-700 ml-1">(Tail)</span></div>
                    </div>

                    <svg viewBox={`0 0 1000 ${canvasHeight}`} preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_5px_15px_rgba(6,182,212,0.15)]">
                        <defs>
                            <linearGradient id="iobFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="iobLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>

                        {/* Curve Fill Area */}
                        <path d={areaD} fill="url(#iobFill)" className="transition-all duration-300" />
                        
                        {/* Glowing Curve Line */}
                        <path
                            d={pathD}
                            fill="none"
                            stroke="url(#iobLine)"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-300"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Active Time Marker Line */}
                        <line 
                            x1={(currentPoint.x / 1000) * 1000} y1="0" 
                            x2={(currentPoint.x / 1000) * 1000} y2={canvasHeight} 
                            stroke="#475569" strokeWidth="2" strokeDasharray="6 6" 
                            vectorEffect="non-scaling-stroke"
                        />
                        
                        {/* Interactive Dot */}
                        <g style={{ transform: `translate(${(currentPoint.x / 1000) * 100}%, ${(getY(currentPoint.y) / canvasHeight) * 100}%)` }} className="transition-all duration-300">
                            {/* Outer Glow */}
                            <circle cx="0" cy="0" r="12" fill="#22d3ee" opacity="0.2" vectorEffect="non-scaling-stroke" className="animate-pulse" />
                            <circle cx="0" cy="0" r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="3" vectorEffect="non-scaling-stroke" className="shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                            <circle cx="0" cy="0" r="2" fill="#22d3ee" vectorEffect="non-scaling-stroke" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Premium Control Sliders */}
            <div className="relative z-10 space-y-8 bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">Simulated Injection</div>
                        <div className="text-lg font-black text-white">{unitsToSimulate} <span className="text-sm font-bold text-slate-500">Units</span></div>
                    </div>
                    <input
                        type="range" min="1" max="30" step="1" value={unitsToSimulate} onChange={(e) => setUnitsToSimulate(Number(e.target.value))}
                        className="w-full h-3 bg-slate-900 border border-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(34,211,238,0.5)] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 active:[&::-webkit-slider-thumb]:scale-110 transition-all"
                    />
                </div>
                
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">Time Since Injection</div>
                        <div className="text-lg font-black text-white">{minutesPassed} <span className="text-sm font-bold text-slate-500">mins</span></div>
                    </div>
                    <input
                        type="range" min="0" max="240" step="15" value={minutesPassed} onChange={(e) => setMinutesPassed(Number(e.target.value))}
                        className="w-full h-3 bg-slate-900 border border-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(59,130,246,0.5)] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 active:[&::-webkit-slider-thumb]:scale-110 transition-all"
                    />
                </div>
            </div>
            
            <div className="relative z-10 mt-8 flex items-start gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    This metabolic engine uses a standardized clinical quadratic decay model. Actual insulin metabolism varies significantly based on body composition, exact injection site, current activity level, and specific insulin brand (e.g., Fiasp absorbs faster than Humalog).
                </p>
            </div>
        </div>
    );
}

import { useState, useMemo } from 'react';
import { FlaskConical, TrendingUp, Repeat, Info, Activity, Utensils, Zap, Clock, Droplets } from 'lucide-react';

const MEAL_CATEGORIES = [
    {
        id: 'pizza',
        name: 'Pizza / Bagels',
        icon: '🍕',
        color: 'from-orange-400 to-red-500',
        baseCarbs: 90, 
        peakTime: 120, // Later spike due to fat/protein
        swapTip: 'Thin crust + extra protein toppings'
    },
    {
        id: 'sushi',
        name: 'Sushi / Rice',
        icon: '🍣',
        color: 'from-cyan-400 to-blue-500',
        baseCarbs: 75,
        peakTime: 45, // Fast acting white rice
        swapTip: 'Sashimi or Naruto (cucumber) rolls'
    },
    {
        id: 'burgers',
        name: 'Burger / Fries',
        icon: '🍔',
        color: 'from-amber-400 to-orange-500',
        baseCarbs: 65,
        peakTime: 90, 
        swapTip: 'Lettuce wrap + skip the fries'
    },
    {
        id: 'pasta',
        name: 'Pasta / Noodles',
        icon: '🍝',
        color: 'from-yellow-400 to-orange-400',
        baseCarbs: 85,
        peakTime: 75,
        swapTip: 'Zucchini noodles or Protein pasta'
    },
    {
        id: 'mexican',
        name: 'Burritos / Tacos',
        icon: '🌮',
        color: 'from-emerald-400 to-green-600',
        baseCarbs: 95, 
        peakTime: 80,
        swapTip: 'Burrito Bowl (No Rice) + Extra Guac'
    },
    {
        id: 'dessert',
        name: 'Cake / Ice Cream',
        icon: '🍦',
        color: 'from-pink-400 to-rose-500',
        baseCarbs: 70, 
        peakTime: 30, // Instant
        swapTip: 'Berries + Cream or Keto Diet Ice Cream'
    },
    {
        id: 'salad',
        name: 'Salad / Bowl',
        icon: '🥗',
        color: 'from-lime-400 to-green-500',
        baseCarbs: 20, 
        peakTime: 45,
        swapTip: 'Dressing on side + add pure protein'
    }
];

const getZoneColor = (bg) => {
    if (bg < 70) return '#3B82F6'; // Low (Blue)
    if (bg <= 140) return '#10B981'; // Good (Green)
    if (bg <= 180) return '#F59E0B'; // Warn (Yellow)
    if (bg <= 240) return '#F97316'; // High (Orange)
    return '#EF4444'; // Very High (Red)
};

export function GlucoseLabView() {
    const [selectedCategory, setSelectedCategory] = useState(MEAL_CATEGORIES[0]);
    const [mealCarbs, setMealCarbs] = useState(60); // 0-200g
    const [currentBG, setCurrentBG] = useState(110);
    const [insulinGiven, setInsulinGiven] = useState(0); // Bolus + IOB
    const [swapEnabled, setSwapEnabled] = useState(false);

    // Advanced Setup
    const [icr, setIcr] = useState(10);
    const [cf, setCf] = useState(50);

    // 1. Calculate Prediction
    const prediction = useMemo(() => {
        let estimatedCarbs = mealCarbs;
        let peakTime = selectedCategory.peakTime;

        if (swapEnabled) {
            estimatedCarbs *= 0.6; // 40% carb reduction through hacks
            peakTime *= 0.85; // slightly faster clearance
        }

        // Medical formula: Rise from carbs = Carbs * (CF / ICR)
        const mealImpact = estimatedCarbs * (cf / icr);
        
        // Insulin impact: total active insulin drops blood sugar by CF per unit
        const insulinImpact = insulinGiven * cf;
        
        // Final predicted net rise based on the opposing forces
        const netRise = mealImpact - insulinImpact;
        
        // Clamp bounds for rendering sanity (Fatal low or Fatal high)
        let peakBG = currentBG + netRise;
        peakBG = Math.max(20, Math.min(600, Math.round(peakBG)));

        return {
            netRise: Math.round(netRise),
            peak: peakBG,
            time: peakTime,
            carbs: Math.round(estimatedCarbs)
        };
    }, [selectedCategory, mealCarbs, currentBG, swapEnabled, icr, cf, insulinGiven]);

    // 2. Generate Smooth Graph Points (High Res Canvas)
    const graphData = useMemo(() => {
        const points = [];
        const width = 1000; // High resolution X

        // Simulate a 4-hour window (240 mins) to see the full curve return
        for (let t = 0; t <= 240; t += 1) { // High density
            let y = currentBG;

            if (t > 0) {
                const timeToPeak = Math.max(1, prediction.time);
                
                // Elegant curve formula: t/Peak * e^(1 - t/Peak)
                // This creates a natural biological rise and slow decay
                const riseFactor = Math.max(0, (t / timeToPeak) * Math.exp(1 - (t / timeToPeak)));
                
                // If the insulin outpaces the food (netRise < 0), we invert the curve so it dips
                y += prediction.netRise * riseFactor;
            }

            points.push({ x: (t / 240) * width, y, t });
        }
        return points;
    }, [prediction, currentBG]);

    // Calculate Y limits for SVG canvas (High Res Y)
    // Ensure we can see the peak, plus some padding, but keep baseline at least 40
    let maxY = Math.max(300, prediction.peak + 40, currentBG + 40);
    let minY = Math.min(60, prediction.peak - 40, currentBG - 40);
    const rangeY = maxY - minY;

    const canvasHeight = 400; // High resolution Y
    const getY = (val) => canvasHeight - ((val - minY) / rangeY) * canvasHeight;

    const pathD = graphData.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${getY(p.y).toFixed(1)}`
    ).join(' ');
    
    const areaD = `${pathD} L 1000 ${canvasHeight} L 0 ${canvasHeight} Z`;
    const zoneColor = getZoneColor(prediction.peak);

    // Finding exactly where the peak occurs in our data points to place the marker perfectly
    const peakPoint = graphData.reduce((prev, current) => {
        if (prediction.netRise >= 0) return (current.y > prev.y) ? current : prev;
        return (current.y < prev.y) ? current : prev;
    });

    return (
        <div className="space-y-6 pb-20 animate-fadeIn font-sans">
            {/* Header */}
            <div className="text-center space-y-2 py-4 relative z-10">
                <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">The Lab</h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
                    Test medical calculations mathematically visually. See how taking accurate bolus insulin completely changes meal curves.
                </p>
            </div>

            {/* Main Graph Card */}
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-cyan-900/10 border border-slate-800 overflow-hidden relative">
                {/* Subtle Background Grid */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#22d3ee10_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                <div className="p-6 md:p-8 relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Output</div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-6xl font-black tracking-tighter transition-colors duration-500" style={{ color: zoneColor }}>
                                    {prediction.peak}
                                </div>
                                <span className="text-lg font-bold text-slate-400">mg/dL</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Net Change</div>
                            <div className={`text-2xl font-black tracking-tight ${prediction.netRise > 0 ? 'text-rose-500' : prediction.netRise < 0 ? 'text-blue-500' : 'text-emerald-500'}`}>
                                {prediction.netRise > 0 ? '+' : ''}{prediction.netRise}
                            </div>
                        </div>
                    </div>

                    {/* Highly Accurate SVG Graph */}
                    <div className="h-64 w-full relative">
                        {/* Target Range Box (70 - 180) */}
                        <div
                            className="absolute left-0 right-0 bg-emerald-500/10 border-y border-emerald-500/20 transition-all duration-500"
                            style={{
                                top: `${(getY(180) / canvasHeight) * 100}%`,
                                bottom: `${100 - (getY(70) / canvasHeight) * 100}%`
                            }}
                        >
                            <span className="absolute top-2 right-3 text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Target Zone</span>
                        </div>

                        <svg viewBox={`0 0 1000 ${canvasHeight}`} preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_5px_15px_rgba(34,211,238,0.15)]">
                            <defs>
                                <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={zoneColor} stopOpacity="0.25" />
                                    <stop offset="100%" stopColor={zoneColor} stopOpacity="0.0" />
                                </linearGradient>
                            </defs>

                            {/* Area Fill */}
                            <path d={areaD} fill="url(#curveFill)" className="transition-all duration-500" />

                            {/* Crisp Line */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke={zoneColor}
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-500"
                                vectorEffect="non-scaling-stroke"
                            />

                            {/* Perfect Peak Marker */}
                            <g className="transition-all duration-500" style={{ transform: `translate(${(peakPoint.x / 1000)*100}%, ${(getY(peakPoint.y) / canvasHeight)*100}%)` }}>
                                <circle cx="0" cy="0" r="5" fill="white" stroke={zoneColor} strokeWidth="3" vectorEffect="non-scaling-stroke" className="shadow-lg" />
                                <circle cx="0" cy="0" r="2" fill={zoneColor} vectorEffect="non-scaling-stroke" />
                            </g>
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-widest border-t border-slate-800 pt-2">
                            <span>Now</span>
                            <span>1hr</span>
                            <span>2hr</span>
                            <span>3hr</span>
                            <span>4hr</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Interactive Setup - Tidy & Unified Design */}
            <div className="bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-800 p-6 md:p-8 space-y-8 relative z-10">
                <div>
                    <h3 className="text-sm font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3">
                        <Activity className="text-blue-400" size={18} /> Base Parameters
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Current BG Slider */}
                        <div className="space-y-4 bg-slate-800/40 p-5 rounded-3xl border border-slate-700/30">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Start Glucose</div>
                                </div>
                                <div className="text-xl font-black text-white">{currentBG} <span className="text-xs text-slate-500 font-medium">mg/dL</span></div>
                            </div>
                            <input
                                type="range" min="50" max="400" value={currentBG} onChange={(e) => setCurrentBG(Number(e.target.value))}
                                className="w-full h-3 bg-slate-900 border border-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            />
                        </div>
                        
                        {/* Active Bolus / Insulin Slider */}
                        <div className="space-y-4 bg-slate-800/40 p-5 rounded-3xl border border-slate-700/30">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Insulin Given</div>
                                </div>
                                <div className="text-xl font-black text-white">{insulinGiven} <span className="text-xs text-slate-500 font-medium">Units</span></div>
                            </div>
                            <input
                                type="range" min="0" max="25" step="0.5" value={insulinGiven} onChange={(e) => setInsulinGiven(Number(e.target.value))}
                                className="w-full h-3 bg-slate-900 border border-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8">
                    <h3 className="text-sm font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3">
                        <Utensils className="text-orange-400" size={18} /> The Meal: {prediction.carbs}g Carbs
                    </h3>
                    
                    <div className="mb-8 bg-slate-800/40 p-5 rounded-3xl border border-slate-700/30">
                        <div className="flex justify-between items-end mb-4">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Carbohydrates</div>
                            <div className="text-xl font-black text-white">{mealCarbs}<span className="text-sm text-slate-500">g</span></div>
                        </div>
                        <input
                            type="range" min="0" max="250" value={mealCarbs} onChange={(e) => setMealCarbs(Number(e.target.value))}
                            className="w-full h-3 bg-slate-900 border border-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-orange-400 [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {MEAL_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat)}
                                className={`p-4 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden group ${selectedCategory.id === cat.id
                                    ? 'border-transparent shadow-lg transform scale-[1.02]'
                                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                                    }`}
                            >
                                {selectedCategory.id === cat.id && <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-100`} />}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="text-3xl mb-3 drop-shadow-sm">{cat.icon}</div>
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${selectedCategory.id === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                        {cat.name.split('/')[0]}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Medical Setup (Aligned to Match Image Request) */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 text-white">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <div>
                        <h3 className="text-xl font-black tracking-widest uppercase text-white flex items-center gap-3">
                            <FlaskConical className="text-violet-400" size={24} /> Personal Setup
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-widest">Medical formula configuration</p>
                    </div>
                </div>
                
                {/* Beautifully Aligned Grid Inputs */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Carb Ratio (ICR)</label>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1 unit represents</span>
                                <input 
                                    type="number" 
                                    value={icr} 
                                    onChange={e => setIcr(Number(e.target.value))} 
                                    className="w-16 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg font-black py-1 px-2 focus:ring-2 focus:ring-violet-500 text-center" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Correction (CF)</label>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1 unit drops BG by</span>
                                <input 
                                    type="number" 
                                    value={cf} 
                                    onChange={e => setCf(Number(e.target.value))} 
                                    className="w-16 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg font-black py-1 px-2 focus:ring-2 focus:ring-violet-500 text-center" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scout Swap Engine Action */}
            <button
                onClick={() => setSwapEnabled(!swapEnabled)}
                className={`w-full p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group flex items-center gap-5 ${swapEnabled
                    ? 'border-emerald-500 bg-emerald-900/20 shadow-lg shadow-emerald-500/10 transform scale-[1.01]'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/80 shadow-xl'
                }`}
            >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner shrink-0 ${swapEnabled ? 'bg-emerald-500 text-white shadow-emerald-600/50' : 'bg-slate-800 text-slate-400'}`}>
                    <Repeat size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-black uppercase tracking-widest text-lg md:text-xl truncate ${swapEnabled ? 'text-emerald-400' : 'text-white'}`}>
                            Scout Swap Strategy
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors shrink-0 ml-2 ${swapEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                            {swapEnabled ? 'Applied' : 'Enable'}
                        </div>
                    </div>
                    <p className={`text-sm font-medium truncate ${swapEnabled ? 'text-emerald-300/80' : 'text-slate-400'}`}>
                        {swapEnabled
                            ? `Active Hack: ${selectedCategory.swapTip} (-40% Carb Impact)`
                            : "Apply community-tested menu hacks to reduce carb impact."}
                    </p>
                </div>
            </button>
        </div>
    );
}

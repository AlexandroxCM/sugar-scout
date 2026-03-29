import { useState, useMemo } from 'react';
import { FlaskConical, TrendingUp, Repeat, Info, Activity } from 'lucide-react';

// Meal category data with baseline glucose response parameters
const mealCategories = [
    { id: 'pizza', name: 'Pizza', icon: '🍕', baseHeight: 85, baseWidth: 25, swapTip: 'Thin crust + extra protein' },
    { id: 'burgers', name: 'Burgers', icon: '🍔', baseHeight: 70, baseWidth: 30, swapTip: 'Lettuce wrap + no bun' },
    { id: 'mexican', name: 'Mexican', icon: '🌮', baseHeight: 65, baseWidth: 28, swapTip: 'Bowl style, skip the rice' },
    { id: 'asian', name: 'Asian', icon: '🍜', baseHeight: 75, baseWidth: 22, swapTip: 'Cauliflower rice swap' },
    { id: 'salads', name: 'Salads', icon: '🥗', baseHeight: 35, baseWidth: 35, swapTip: 'Oil-based dressing' }
];

// Bell curve formula: y = h * e^(-(x-b)²/2c²)
function bellCurve(x, h, b, c) {
    return h * Math.exp(-Math.pow(x - b, 2) / (2 * Math.pow(c, 2)));
}

// Generate curve points for SVG path (now returns absolute BG values)
function generateCurvePoints(height, width, swapEnabled, startingBG) {
    const points = [];
    const adjustedHeight = swapEnabled ? height * 0.6 : height; // 40% reduction when swap is enabled
    const adjustedWidth = swapEnabled ? width * 1.3 : width; // Slightly wider, flatter curve

    const b = 60; // Peak position (60 minutes after eating)

    for (let x = 0; x <= 180; x += 2) { // 0 to 180 minutes (3 hours)
        const rise = bellCurve(x, adjustedHeight, b, adjustedWidth);
        points.push({ x, y: rise, absoluteBG: startingBG + rise });
    }

    return points;
}

// Convert points to SVG path
function pointsToPath(points, svgWidth, svgHeight, minY, maxY) {
    if (points.length === 0) return '';

    const scaleX = svgWidth / 180;
    const range = maxY - minY;
    const scaleY = (svgHeight - 60) / range;
    const offsetY = 30;

    const pathPoints = points.map((p, i) => {
        const x = p.x * scaleX;
        const y = svgHeight - offsetY - ((p.absoluteBG - minY) * scaleY);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    });

    return pathPoints.join(' ');
}

// Get color based on absolute BG value
function getBGColor(bgValue) {
    if (bgValue < 140) return '#22C55E'; // Green - in range
    if (bgValue < 180) return '#EAB308'; // Yellow - elevated
    return '#EF4444'; // Red - high
}

// Get zone label
function getBGZone(bgValue) {
    if (bgValue < 140) return { label: 'In Range', color: '#22C55E' };
    if (bgValue < 180) return { label: 'Elevated', color: '#EAB308' };
    return { label: 'High', color: '#EF4444' };
}

export function GlucoseLabView() {
    const [selectedCategory, setSelectedCategory] = useState(mealCategories[0]);
    const [portionLevel, setPortionLevel] = useState(50); // 0-100 slider
    const [swapEnabled, setSwapEnabled] = useState(false);
    const [currentBG, setCurrentBG] = useState(110); // Default starting blood sugar

    // Calculate curve parameters based on portion slider
    const curveParams = useMemo(() => {
        const portionMultiplier = 0.5 + (portionLevel / 100); // 0.5x to 1.5x
        return {
            height: selectedCategory.baseHeight * portionMultiplier,
            width: selectedCategory.baseWidth
        };
    }, [selectedCategory, portionLevel]);

    // Calculate predicted rise and peak
    const predictedRise = useMemo(() => {
        const baseRise = curveParams.height;
        return swapEnabled ? Math.round(baseRise * 0.6) : Math.round(baseRise);
    }, [curveParams, swapEnabled]);

    const predictedPeak = currentBG + predictedRise;
    const peakZone = getBGZone(predictedPeak);

    // Generate curve points with absolute BG values
    const curvePoints = useMemo(() => {
        return generateCurvePoints(curveParams.height, curveParams.width, swapEnabled, currentBG);
    }, [curveParams, swapEnabled, currentBG]);

    // Original curve for comparison when swap is enabled
    const originalCurvePoints = useMemo(() => {
        if (!swapEnabled) return null;
        return generateCurvePoints(curveParams.height, curveParams.width, false, currentBG);
    }, [curveParams, swapEnabled, currentBG]);

    const svgWidth = 320;
    const svgHeight = 220;

    // Dynamic Y-axis range based on values
    const minY = Math.min(70, currentBG - 10);
    const maxY = Math.max(250, predictedPeak + 20);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <FlaskConical size={28} />
                    <h2 className="text-2xl font-bold">The Lab</h2>
                </div>
                <p className="text-indigo-100 text-sm">
                    Predict how different meals might affect your blood sugar
                </p>
            </div>

            {/* Current Blood Sugar Input */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-sm border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                    <Activity className="text-blue-600" size={20} />
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider">
                        Your Current Blood Sugar
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <input
                            type="range"
                            min="70"
                            max="250"
                            value={currentBG}
                            onChange={(e) => setCurrentBG(parseInt(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #22C55E 0%, #22C55E 28%, #EAB308 45%, #EF4444 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>70</span>
                            <span>140</span>
                            <span>180</span>
                            <span>250</span>
                        </div>
                    </div>
                    <div className="text-center min-w-[80px]">
                        <input
                            type="number"
                            min="70"
                            max="250"
                            value={currentBG}
                            onChange={(e) => setCurrentBG(Math.min(250, Math.max(70, parseInt(e.target.value) || 70)))}
                            className="w-20 text-2xl font-black text-center border-2 border-blue-300 rounded-lg p-1 bg-white"
                            style={{ color: getBGColor(currentBG) }}
                        />
                        <div className="text-xs font-medium text-slate-500 mt-1">mg/dL</div>
                    </div>
                </div>
            </div>

            {/* Meal Category Selector */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Select Meal Type
                </h3>
                <div className="flex gap-2 flex-wrap">
                    {mealCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${selectedCategory.id === category.id
                                ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500 ring-offset-1'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Portion Slider */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Portion Size
                </h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={portionLevel}
                        onChange={(e) => setPortionLevel(parseInt(e.target.value))}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #22C55E 0%, #EAB308 50%, #EF4444 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>🥗 Small/Safe</span>
                        <span className="text-slate-400">|</span>
                        <span>🍽️ Large/Indulgent</span>
                    </div>
                </div>
            </div>

            {/* Prediction Result Card */}
            <div
                className="rounded-2xl p-5 shadow-md border-2 transition-all duration-300"
                style={{
                    backgroundColor: peakZone.color + '10',
                    borderColor: peakZone.color + '40'
                }}
            >
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">
                    Predicted Blood Sugar
                </h3>
                <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-600">{currentBG}</div>
                        <div className="text-xs text-slate-500">Now</div>
                    </div>
                    <div className="text-3xl text-slate-400">→</div>
                    <div className="text-center">
                        <div
                            className="text-4xl font-black"
                            style={{ color: peakZone.color }}
                        >
                            {predictedPeak}
                        </div>
                        <div className="text-xs font-medium" style={{ color: peakZone.color }}>
                            Peak (~1 hr)
                        </div>
                    </div>
                </div>
                <div
                    className="text-center mt-3 text-sm font-bold px-3 py-1 rounded-full inline-block w-full"
                    style={{
                        backgroundColor: peakZone.color + '20',
                        color: peakZone.color
                    }}
                >
                    {peakZone.label} • +{predictedRise} mg/dL rise
                </div>
            </div>

            {/* Dynamic Graph */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp size={16} />
                        Glucose Curve
                    </h3>
                    <div className="text-xs text-slate-400">Time after eating (minutes)</div>
                </div>

                <div className="relative">
                    <svg
                        width="100%"
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        className="overflow-visible"
                    >
                        {/* Y-axis labels */}
                        {[70, 100, 140, 180, 220].filter(v => v >= minY && v <= maxY).map((bg) => {
                            const y = svgHeight - 30 - ((bg - minY) / (maxY - minY)) * (svgHeight - 60);
                            return (
                                <g key={bg}>
                                    <line
                                        x1="0"
                                        y1={y}
                                        x2={svgWidth}
                                        y2={y}
                                        stroke={bg === 140 || bg === 180 ? getBGColor(bg) + '40' : '#e2e8f0'}
                                        strokeWidth={bg === 140 || bg === 180 ? 2 : 1}
                                        strokeDasharray={bg === 140 || bg === 180 ? '4,4' : '0'}
                                    />
                                    <text
                                        x="-5"
                                        y={y + 4}
                                        fill="#94a3b8"
                                        fontSize="9"
                                        textAnchor="end"
                                    >
                                        {bg}
                                    </text>
                                </g>
                            );
                        })}

                        {/* X-axis grid lines */}
                        {[0, 30, 60, 90, 120, 150, 180].map((min) => (
                            <g key={min}>
                                <line
                                    x1={(min / 180) * svgWidth}
                                    y1="20"
                                    x2={(min / 180) * svgWidth}
                                    y2={svgHeight - 30}
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                />
                                <text
                                    x={(min / 180) * svgWidth}
                                    y={svgHeight - 10}
                                    fill="#94a3b8"
                                    fontSize="10"
                                    textAnchor="middle"
                                >
                                    {min}
                                </text>
                            </g>
                        ))}

                        {/* Target zone shading */}
                        <rect
                            x="0"
                            y={svgHeight - 30 - ((140 - minY) / (maxY - minY)) * (svgHeight - 60)}
                            width={svgWidth}
                            height={((140 - 70) / (maxY - minY)) * (svgHeight - 60)}
                            fill="#22C55E"
                            opacity="0.1"
                        />

                        {/* Original curve (faded) when swap is enabled */}
                        {swapEnabled && originalCurvePoints && (
                            <path
                                d={pointsToPath(originalCurvePoints, svgWidth, svgHeight, minY, maxY)}
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                                strokeDasharray="5,5"
                            />
                        )}

                        {/* Main curve */}
                        <path
                            d={pointsToPath(curvePoints, svgWidth, svgHeight, minY, maxY)}
                            fill="none"
                            stroke={getBGColor(predictedPeak)}
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />

                        {/* Starting point */}
                        <circle
                            cx="0"
                            cy={svgHeight - 30 - ((currentBG - minY) / (maxY - minY)) * (svgHeight - 60)}
                            r="5"
                            fill="#3B82F6"
                        />

                        {/* Peak indicator */}
                        <circle
                            cx={(60 / 180) * svgWidth}
                            cy={svgHeight - 30 - ((predictedPeak - minY) / (maxY - minY)) * (svgHeight - 60)}
                            r="7"
                            fill={getBGColor(predictedPeak)}
                            className="transition-all duration-500"
                        />
                    </svg>
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-4 text-xs justify-center flex-wrap">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-slate-600">In Range (&lt;140)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-slate-600">Elevated (140-180)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-slate-600">High (&gt;180)</span>
                    </div>
                </div>
            </div>

            {/* Scout Swap Toggle */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 shadow-sm border border-emerald-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Repeat className="text-emerald-600" size={24} />
                        <div>
                            <h3 className="font-bold text-emerald-900">Scout Swap</h3>
                            <p className="text-xs text-emerald-700">Apply Swap Strategy</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSwapEnabled(!swapEnabled)}
                        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${swapEnabled
                            ? 'bg-emerald-500'
                            : 'bg-slate-300'
                            }`}
                    >
                        <div
                            className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all duration-300 shadow-sm ${swapEnabled ? 'left-8' : 'left-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Swap Tip */}
                {swapEnabled && (
                    <div className="mt-3 p-3 bg-white/70 rounded-lg border border-emerald-200">
                        <div className="flex items-start gap-2">
                            <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-emerald-800">
                                    Suggested swap for {selectedCategory.name}:
                                </p>
                                <p className="text-sm text-emerald-700">
                                    {selectedCategory.swapTip}
                                </p>
                                <p className="text-xs text-emerald-600 mt-1 font-medium">
                                    ↓ ~40% reduction in predicted spike
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-800 text-center">
                    <strong>⚠️ Educational estimate only.</strong> This is based on typical glycemic responses and your actual results will vary based on insulin timing, activity level, and individual factors. Always check your CGM/BGM before making insulin decisions.
                </p>
            </div>
        </div>
    );
}

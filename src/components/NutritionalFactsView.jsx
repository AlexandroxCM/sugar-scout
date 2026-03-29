import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Calculator, Activity, ArrowRight, Zap, Target, Divide, Utensils, Pizza, Coffee, Sandwich, TrendingUp } from 'lucide-react'
import { nutritionalData } from '../nutritionalData'

// Helper to get consistent color gradient from string (Shared with GuideView for consistency)
const getGradient = (name) => {
    const gradients = [
        'from-blue-400 to-indigo-600',
        'from-emerald-400 to-teal-600',
        'from-orange-400 to-red-600',
        'from-pink-400 to-rose-600',
        'from-violet-400 to-purple-600',
        'from-amber-400 to-orange-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
}

const getVelocityColor = (v) => {
    if (v === 'Low') return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (v === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
}

function BolusCalculator({ carbs }) {
    const [isf, setIsf] = useState(50) // CF
    const [icr, setIcr] = useState(10) // ICR
    const [currentBG, setCurrentBG] = useState(100)
    const [targetBG, setTargetBG] = useState(100)
    const [iob, setIob] = useState(0)

    const correctionDose = (currentBG - targetBG) / isf
    const mealDose = carbs / icr
    let baseDose = correctionDose + mealDose - iob
    baseDose = Math.max(0, baseDose)
    
    // Round to nearest 0.5
    const roundedDose = Math.round(baseDose * 2) / 2
    const totalDose = roundedDose.toFixed(2)

    return (
        <div className="mt-4 bg-slate-900 rounded-2xl p-5 shadow-2xl overflow-hidden relative border border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Calculator size={18} className="text-blue-400" />
                    <h4 className="font-extrabold text-white text-sm tracking-widest leading-none">
                        SUGAR SCOUT BOLUS GUIDE
                    </h4>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 px-3 py-1 rounded text-[10px] font-black tracking-widest text-blue-300">
                    EDUCATION ONLY
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs Side */}
                <div className="space-y-3">
                    {/* Carb Ratio Input */}
                    <div className="bg-slate-800/50 rounded-xl px-4 py-2 flex items-center justify-between border border-slate-700/50">
                        <label className="text-xs italic font-bold text-slate-400 uppercase tracking-widest">
                            Carb Ratio
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={icr}
                                onChange={(e) => setIcr(Number(e.target.value))}
                                className="w-16 bg-slate-700 border-none rounded-lg text-white font-black text-right focus:ring-2 focus:ring-blue-500 py-1"
                            />
                            <span className="text-xs font-bold text-slate-500">1:U</span>
                        </div>
                    </div>

                    {/* Correction Factor Input */}
                    <div className="bg-slate-800/50 rounded-xl px-4 py-2 flex items-center justify-between border border-slate-700/50">
                        <label className="text-xs italic font-bold text-slate-400 uppercase tracking-widest">
                            Correction Factor
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={isf}
                                onChange={(e) => setIsf(Number(e.target.value))}
                                className="w-16 bg-slate-700 border-none rounded-lg text-white font-black text-right focus:ring-2 focus:ring-blue-500 py-1"
                            />
                            <span className="text-xs font-bold text-slate-500">mg/dL</span>
                        </div>
                    </div>

                    {/* Current BG & Target */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-700/50">
                            <label className="text-[10px] italic font-bold text-slate-400 uppercase tracking-widest block mb-1">
                                Cur Glucose
                            </label>
                            <input
                                type="number"
                                value={currentBG}
                                onChange={(e) => setCurrentBG(Number(e.target.value))}
                                className="w-full bg-slate-700 border-none rounded-lg text-white font-black focus:ring-2 focus:ring-blue-500 py-1 text-center"
                            />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-700/50">
                            <label className="text-[10px] italic font-bold text-slate-400 uppercase tracking-widest block mb-1">
                                Target BG
                            </label>
                            <input
                                type="number"
                                value={targetBG}
                                onChange={(e) => setTargetBG(Number(e.target.value))}
                                className="w-full bg-slate-700 border-none rounded-lg text-white font-black focus:ring-2 focus:ring-blue-500 py-1 text-center"
                            />
                        </div>
                    </div>

                    {/* IOB */}
                    <div className="bg-slate-800/50 rounded-xl px-4 py-2 flex items-center justify-between border border-slate-700/50">
                        <label className="text-xs italic font-bold text-slate-400 uppercase tracking-widest">
                            Insulin on Board
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                step="0.5"
                                value={iob}
                                onChange={(e) => setIob(Number(e.target.value))}
                                className="w-16 bg-slate-700 border-none rounded-lg text-white font-black text-right focus:ring-2 focus:ring-blue-500 py-1"
                            />
                            <span className="text-xs font-bold text-slate-500">Units</span>
                        </div>
                    </div>
                </div>

                {/* Suggested Dose Output */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden">
                    {/* Background decorations */}
                    <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-white opacity-10" strokeWidth={3} />
                    
                    <div className="text-xs font-black tracking-widest text-blue-100 uppercase mb-2 relative z-10">
                        Suggested Dose
                    </div>
                    <div className="flex items-end gap-1 relative z-10">
                        <span className="text-5xl font-black text-white leading-none">{totalDose}</span>
                    </div>
                    <div className="text-sm font-bold text-blue-100 mt-2 relative z-10">
                        Units
                    </div>
                </div>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-4 text-center opacity-60">
                Medical Disclaimer: System outputs are estimations. Verify with proper medical devices.
            </p>
        </div>
    )
}

export function NutritionalFactsView() {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedRestaurant, setExpandedRestaurant] = useState(null)
    const filteredData = nutritionalData.filter(r =>
        r.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.items.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8 animate-fadeIn pb-20">
            {/* Header */}
            <div className="text-center space-y-2 py-4 relative z-10">
                <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Nutrition Data
                </h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto">
                    Deep dive into macronutrients and calculate potential insulin needs.
                </p>
            </div>



            {/* Main Nutritional Search */}
            <div className="space-y-4">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search full menu items..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-slate-700 shadow-xl focus:ring-2 focus:ring-blue-500 transition-all text-lg bg-slate-900 text-white placeholder-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={24} />
                </div>

                <div className="space-y-4">
                    {filteredData.map((data, index) => {
                        const isExpanded = expandedRestaurant === index;
                        const gradient = getGradient(data.restaurant);

                        return (
                            <div key={index} className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden transition-all hover:shadow-2xl hover:border-slate-700 relative z-10">
                                <button
                                    onClick={() => setExpandedRestaurant(isExpanded ? null : index)}
                                    className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-md`}>
                                            <Utensils size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-lg text-white">{data.restaurant}</h3>
                                            <p className="text-sm text-slate-400 font-medium">
                                                {data.items.length} logged items
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'rotate-180 bg-blue-900/50 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="border-t border-slate-800 bg-slate-900/50">
                                        <div className="divide-y divide-slate-800">
                                            {data.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="p-5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getVelocityColor(item.velocity)}`}>
                                                                    {item.velocity} Velocity
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-400 text-sm italic">{item.desc}</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                                                        {[
                                                            { label: 'Carbs', val: item.stats.carbs, unit: 'g', color: 'bg-blue-900/40 text-blue-300 border-blue-500/20 shadow-inner' },
                                                            { label: 'Fiber', val: item.stats.fiber, unit: 'g', color: 'bg-emerald-900/40 text-emerald-300 border-emerald-500/20 shadow-inner' },
                                                            { label: 'Protein', val: item.stats.protein, unit: 'g', color: 'bg-indigo-900/40 text-indigo-300 border-indigo-500/20 shadow-inner' },
                                                            { label: 'Fat', val: item.stats.fat, unit: 'g', color: 'bg-amber-900/40 text-amber-300 border-amber-500/20 shadow-inner' },
                                                            { label: 'Calories', val: item.stats.cal, unit: '', color: 'bg-slate-800 text-slate-300 border-slate-700/50 shadow-inner' }
                                                        ].map((stat, i) => (
                                                            <div key={i} className={`p-2 rounded-2xl text-center ${stat.color} border`}>
                                                                <div className="text-xl font-black">{stat.val}<span className="text-xs font-normal opacity-70 ml-0.5">{stat.unit}</span></div>
                                                                <div className="text-[9px] uppercase font-bold opacity-60 tracking-wider">{stat.label}</div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
                                                        <details className="group">
                                                            <summary className="flex items-center justify-center p-3 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-800 hover:text-blue-400 transition-colors">
                                                                Toggle Bolus Calculator
                                                            </summary>
                                                            <div className="px-5 pb-5 pt-2">
                                                                <BolusCalculator carbs={item.stats.carbs} />
                                                            </div>
                                                        </details>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between text-xs text-slate-400 font-medium shadow-xl relative z-10">
                <span className="font-bold uppercase tracking-widest text-slate-500">Velocity Guide:</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span>Low (Safe)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <span>Medium (Caution)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                        <span>High (Spike City)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

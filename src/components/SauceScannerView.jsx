import { useState, useEffect } from 'react'
import { AlertTriangle, Droplet, Search, Zap, X } from 'lucide-react'
import { interactiveSauces, getRiskColor } from '../interactiveSauceData'

// Interactive Sauce Analyzer Component
function InteractiveSauceAnalyzer() {
    const [selectedSauce, setSelectedSauce] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [meterAnimation, setMeterAnimation] = useState(0);

    useEffect(() => {
        if (selectedSauce) {
            // Animate the meter
            setMeterAnimation(0);
            const targetValue = (selectedSauce.sugar_value / 15) * 100; // Max 15g for scale
            const timer = setTimeout(() => {
                setMeterAnimation(Math.min(targetValue, 100));
            }, 50);

            // Show tooltip for high sugar sauces
            if (selectedSauce.risk_level === 'High') {
                setShowTooltip(true);
            } else {
                setShowTooltip(false);
            }

            return () => clearTimeout(timer);
        }
    }, [selectedSauce]);

    const riskColors = selectedSauce ? getRiskColor(selectedSauce.risk_level) : null;

    return (
        <div className="space-y-6">
            {/* Sauce Icon Scroll */}
            <div className="bg-slate-900 rounded-[2rem] p-5 shadow-xl border border-slate-800 relative z-10">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Tap a sauce to analyze
                </h3>
                <div className="overflow-x-auto pb-4 -mx-2 px-2 custom-scrollbar">
                    <div className="flex gap-4 min-w-max">
                        {interactiveSauces.map((sauce) => {
                            const colors = getRiskColor(sauce.risk_level);
                            const isSelected = selectedSauce?.id === sauce.id;
                            return (
                                <button
                                    key={sauce.id}
                                    onClick={() => setSelectedSauce(sauce)}
                                    className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 min-w-[80px] ${isSelected
                                        ? 'bg-slate-800 ring-2 ring-offset-4 ring-offset-slate-900 scale-105 shadow-lg'
                                        : 'bg-slate-800/50 hover:bg-slate-800 hover:scale-105 border border-slate-700/50'
                                        }`}
                                    style={{
                                        ringColor: isSelected ? colors.bg : 'transparent',
                                        boxShadow: isSelected ? `0 10px 25px -5px ${colors.bg}40` : 'none'
                                    }}
                                >
                                    <span className="text-3xl mb-2 drop-shadow-sm">{sauce.icon}</span>
                                    <span className="text-xs font-bold text-slate-300 text-center leading-tight">
                                        {sauce.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sugar Meter */}
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-800 relative z-10">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">
                    Sugar Meter
                </h3>

                {selectedSauce ? (
                    <div className="flex flex-col items-center animate-fadeIn">
                        {/* Circular Gauge */}
                        <div className="relative w-56 h-56 mb-6">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#334155" // slate-700
                                    strokeWidth="8"
                                />
                                {/* Progress arc */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={riskColors.bg}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${meterAnimation * 2.51} 251`}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            {/* Center content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl mb-2 drop-shadow-md">{selectedSauce.icon}</span>
                                <span
                                    className="text-4xl font-black tracking-tighter"
                                    style={{ color: riskColors.bg, textShadow: `0 0 20px ${riskColors.bg}40` }}
                                >
                                    {selectedSauce.sugar_value}g
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">sugar</span>
                            </div>
                        </div>

                        {/* Risk Level Badge */}
                        <div
                            className="px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest border"
                            style={{
                                backgroundColor: riskColors.bg + '15',
                                color: riskColors.bg,
                                borderColor: riskColors.bg + '30'
                            }}
                        >
                            {riskColors.label} 
                        </div>

                        {/* Legend */}
                        <div className="flex gap-4 mt-8 text-xs font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                <span className="text-slate-500">0-2g</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                                <span className="text-slate-500">3-6g</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
                                <span className="text-slate-500">7g+</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-12 text-slate-500">
                        <Droplet size={64} className="mb-4 opacity-20" />
                        <p className="text-sm font-medium tracking-wide">Select a sauce above to analyze</p>
                    </div>
                )}
            </div>

            {/* Watchout Tooltip Popup */}
            {showTooltip && selectedSauce && (
                <div className="fixed inset-x-4 bottom-24 md:static md:inset-auto z-50 animate-fadeIn">
                    <div className="bg-rose-950/90 backdrop-blur-md border border-rose-500/30 rounded-2xl p-5 shadow-[0_10px_40px_rgba(225,29,72,0.3)] relative group">
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute top-3 right-3 text-rose-400 hover:text-rose-300 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex gap-4 items-start">
                            <div className="bg-rose-500/20 p-2 rounded-xl">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                            </div>
                            <div className="pr-4">
                                <h4 className="text-rose-300 font-bold text-sm md:text-base mb-1 tracking-wide">
                                    HIGH SUGAR ALERT
                                </h4>
                                <p className="text-rose-200/80 text-sm leading-relaxed">
                                    {selectedSauce.tip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest px-4 opacity-70">
                Visual estimates only. Every body reacts differently. Check your CGM/BGM regularly.
            </p>
        </div>
    );
}

const sauceData = [
    {
        restaurant: "Applebee's",
        name: "Honey BBQ Sauce",
        sugar: "22g",
        carbs: "24g",
        verdict: "Deadly",
        desc: "Literally liquid sugar. Avoid at all costs."
    },
    {
        restaurant: "Arby's",
        name: "Arby's Sauce",
        sugar: "3g",
        carbs: "3g",
        verdict: "Caution",
        desc: "Vinegar based, but has sugar. One is fine."
    },
    {
        restaurant: "BJ's Restaurant",
        name: "House Steak Sauce",
        sugar: "13g",
        carbs: "15g",
        verdict: "Danger",
        desc: "Unexpectedly high sugar for a savory sauce."
    },
    {
        restaurant: "Blaze Pizza",
        name: "Classic Red Sauce",
        sugar: "0g",
        carbs: "2g",
        verdict: "Safe",
        desc: "A rare chain pizza sauce with no added sugar."
    },
    {
        restaurant: "Blue Bottle",
        name: "NOLA Coffee Syrup",
        sugar: "19g",
        carbs: "20g",
        verdict: "Danger",
        desc: "The secret sweetness in New Orleans style."
    },
    {
        restaurant: "Boba Guys",
        name: "Tapioca Pearl Syrup",
        sugar: "15g",
        carbs: "18g",
        verdict: "Danger",
        desc: "The 'honey' in boba isn't just flavor—it's sugar."
    },
    {
        restaurant: "Buffalo Wild Wings",
        name: "Mango Habanero Sauce",
        sugar: "16g",
        carbs: "19g",
        verdict: "Danger",
        desc: "High sugar content gives it that sticky glaze."
    },
    {
        restaurant: "Burger King",
        name: "Zesty Sauce",
        sugar: "1g",
        carbs: "3g",
        verdict: "Caution",
        desc: "Low carb, but very high calorie."
    },
    {
        restaurant: "Chick-fil-A",
        name: "Polynesian Sauce",
        sugar: "12g",
        carbs: "13g",
        verdict: "Danger",
        desc: "Basically flavored corn syrup."
    },
    {
        restaurant: "Chili's",
        name: "Honey Chipotle Sauce",
        sugar: "18g",
        carbs: "20g",
        verdict: "Deadly",
        desc: "A sugar bomb disguised as heat."
    },
    {
        restaurant: "Chipotle",
        name: "Honey Vinaigrette",
        sugar: "12g",
        carbs: "14g",
        verdict: "Danger",
        desc: "The 'healthy' salad dressing is actually a sugar-heavy trap."
    },
    {
        restaurant: "Dave's Hot Chicken",
        name: "Dave's Sauce",
        sugar: "3g",
        carbs: "4g",
        verdict: "Caution",
        desc: "Creamy but contains sugar/honey. Limit to one."
    },
    {
        restaurant: "Five Guys",
        name: "BBQ Sauce",
        sugar: "10g",
        carbs: "15g",
        verdict: "Danger",
        desc: "Smoky flavor comes from molasses and sugar."
    },
    {
        restaurant: "Gen KBBQ",
        name: "Galbi Marinade",
        sugar: "12g",
        carbs: "14g",
        verdict: "Danger",
        desc: "Pear juice and sugar make this delicious but dangerous."
    },
    {
        restaurant: "HotBoys",
        name: "Money Sauce",
        sugar: "3g",
        carbs: "5g",
        verdict: "Safe",
        desc: "Mayo-based savory sauce. Low sugar footprint."
    },
    {
        restaurant: "Ike's",
        name: "Dirty Sauce",
        sugar: "3g",
        carbs: "5g",
        verdict: "Caution",
        desc: "Mayo-based aioli avec brown sugar. It's the secret and the spike."
    },
    {
        restaurant: "Ike's",
        name: "Godfather Sauce",
        sugar: "4g",
        carbs: "6g",
        verdict: "Caution",
        desc: "Creamy pesto. Fat helps slow glucose, but has minor added sugar."
    },
    {
        restaurant: "In-N-Out",
        name: "Spread",
        sugar: "1g",
        carbs: "3g",
        verdict: "Caution",
        desc: "Thousand Island style. Safe on sugar, watch the portion."
    },
    {
        restaurant: "Jimmy John's",
        name: "Kickin' Ranch",
        sugar: "1g",
        carbs: "2g",
        verdict: "Safe",
        desc: "Creamy and spicy with minimal carb impact."
    },
    {
        restaurant: "KFC",
        name: "KFC Signature Sauce",
        sugar: "5g",
        carbs: "5g",
        verdict: "Caution",
        desc: "Sweet and tangy means sugar is hiding."
    },
    {
        restaurant: "La Victoria",
        name: "Orange Sauce",
        sugar: "2g",
        carbs: "3g",
        verdict: "Safe",
        desc: "High fat, low sugar iconic sauce. Great for buffering carbs."
    },
    {
        restaurant: "La Vic's",
        name: "Orange Sauce",
        sugar: "2g",
        carbs: "3g",
        verdict: "Safe",
        desc: "High fat, low sugar. Great for buffering taco carbs."
    },
    {
        restaurant: "Lemonade",
        name: "Blood Orange Syrup",
        sugar: "22g",
        carbs: "25g",
        verdict: "Deadly",
        desc: "The base of their fruit lemonades is sheer liquid sugar."
    },
    {
        restaurant: "McDonald's",
        name: "Tangy BBQ Sauce",
        sugar: "9g",
        carbs: "11g",
        verdict: "Caution",
        desc: "One packet is okay, two is a spike."
    },
    {
        restaurant: "Olive Garden",
        name: "Famous Italian Dressing",
        sugar: "2g",
        carbs: "2g",
        verdict: "Safe",
        desc: "Relatively safe for a commercial dressing."
    },
    {
        restaurant: "Panda Express",
        name: "SweetFire Chicken Sauce",
        sugar: "19g",
        carbs: "20g",
        verdict: "Deadly",
        desc: "More sugar than a glazed donut (10-15g)!"
    },
    {
        restaurant: "Panda Express",
        name: "Sweet & Sour Sauce",
        sugar: "19g",
        carbs: "21g",
        verdict: "Deadly",
        desc: "Essentially a cup of syrup. Stick to soy sauce or hot mustard."
    },
    {
        restaurant: "Panera Bread",
        name: "Balsamic Vinaigrette",
        sugar: "4g",
        carbs: "5g",
        verdict: "Caution",
        desc: "Healthier than creamy, but still has sugar."
    },
    {
        restaurant: "Popeyes",
        name: "Blackened Ranch",
        sugar: "1g",
        carbs: "2g",
        verdict: "Safe",
        desc: "Flavorful without the sugar spike."
    },
    {
        restaurant: "Punjab Cafe",
        name: "Sweet Tamarind Chutney",
        sugar: "12g",
        carbs: "14g",
        verdict: "Danger",
        desc: "Traditional sweet chutney."
    },
    {
        restaurant: "Raising Cane's",
        name: "Cane's Sauce",
        sugar: "5g",
        carbs: "6g",
        verdict: "Caution",
        desc: "One cup is usually fine, but don't double dip."
    },
    {
        restaurant: "Red Lobster",
        name: "Piña Colada Sauce",
        sugar: "14g",
        carbs: "16g",
        verdict: "Danger",
        desc: "Dessert in a dipping cup. Avoid."
    },
    {
        restaurant: "San Tung",
        name: "Dry Fried Glaze",
        sugar: "15g",
        carbs: "18g",
        verdict: "Deadly",
        desc: "Essentially liquid candy on chicken wings."
    },
    {
        restaurant: "Shake Shack",
        name: "ShackSauce",
        sugar: "0g",
        carbs: "0g",
        verdict: "Safe",
        desc: "Mayo-based savory sauce. Zero carb win."
    },
    {
        restaurant: "Sonic",
        name: "Signature Sauce",
        sugar: "4g",
        carbs: "5g",
        verdict: "Caution",
        desc: "A blend of honey mustard and BBQ. Watch out."
    },
    {
        restaurant: "Souvla",
        name: "Granch Dressing",
        sugar: "1g",
        carbs: "2g",
        verdict: "Safe",
        desc: "Greek Yogurt Ranch. High protein, ultra low sugar."
    },
    {
        restaurant: "Square Pie Guys",
        name: "Hot Honey",
        sugar: "12g",
        carbs: "13g",
        verdict: "Danger",
        desc: "Pure liquid sugar. Use very sparingly on the crust."
    },
    {
        restaurant: "Starbird",
        name: "Starbird Sauce",
        sugar: "4g",
        carbs: "6g",
        verdict: "Caution",
        desc: "Standard dipping sauce; one cup is usually okay."
    },
    {
        restaurant: "Starbucks",
        name: "Classic Syrup (2 pumps)",
        sugar: "10g",
        carbs: "10g",
        verdict: "Danger",
        desc: "Liquid sugar. Hits blood stream instantly."
    },
    {
        restaurant: "Subway",
        name: "Sweet Onion Teriyaki",
        sugar: "15g",
        carbs: "18g",
        verdict: "Deadly",
        desc: "Sugar is the second ingredient. Avoid."
    },
    {
        restaurant: "Taco Bell",
        name: "Diablo Sauce",
        sugar: "0g",
        carbs: "0g",
        verdict: "Safe",
        desc: "Spicy and sugar-free."
    },
    {
        restaurant: "The Melt",
        name: "Cheese Sauce",
        sugar: "2g",
        carbs: "4g",
        verdict: "Caution",
        desc: "Starchy but low in added sugar."
    },
    {
        restaurant: "Wendy's",
        name: "Ghost Pepper Ranch",
        sugar: "1g",
        carbs: "2g",
        verdict: "Safe",
        desc: "Spicy and low carb. A great option."
    },
    {
        restaurant: "Wingstop",
        name: "Mango Habanero",
        sugar: "12g",
        carbs: "15g",
        verdict: "Danger",
        desc: "Sweet glaze masks the danger."
    },
    {
        restaurant: "Zaxby's",
        name: "Zax Sauce",
        sugar: "2g",
        carbs: "3g",
        verdict: "Caution",
        desc: "Creamy and low sugar, but high fat/calories."
    }
]

export function SauceScannerView() {
    const [isInteractiveMode, setIsInteractiveMode] = useState(false);

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            {/* Header */}
            <div className="text-center space-y-2 py-4 relative z-10">
                <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Sauce Scanner
                </h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto">
                    Discover hidden carbs and sugars in common condiments.
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center relative z-20">
                <button
                    onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                    className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-xl border ${isInteractiveMode
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-cyan-500/25'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400'
                        }`}
                >
                    <Zap size={18} className={isInteractiveMode ? 'animate-pulse' : ''} />
                    {isInteractiveMode ? 'Interactive Mode ON' : 'Try Interactive Mode'}
                </button>
            </div>

            {isInteractiveMode ? (
                <InteractiveSauceAnalyzer />
            ) : (
                <div className="space-y-6 animate-fadeIn">
                    <div className="bg-rose-950/40 border border-rose-900/50 rounded-2xl p-5 shadow-lg">
                        <div className="flex gap-4 items-start">
                            <div className="bg-rose-500/20 p-2 rounded-xl shrink-0">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                                <h3 className="text-rose-300 font-black text-lg tracking-wide mb-1">Hidden Sugar Trap</h3>
                                <p className="text-rose-200/70 text-sm leading-relaxed">
                                    Condiments are the #1 reason for unexpected glucose spikes. A "healthy" chicken breast can become a sugar bomb with just one dip cup.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sauceData.map((sauce, idx) => (
                            <div key={idx} className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all hover:scale-[1.02] ${sauce.verdict === 'Deadly' ? 'bg-rose-950/20 border-rose-900/50 shadow-rose-900/10' :
                                sauce.verdict === 'Danger' ? 'bg-orange-950/20 border-orange-900/50 shadow-orange-900/10' :
                                    sauce.verdict === 'Caution' ? 'bg-amber-950/20 border-amber-900/50 shadow-amber-900/10' :
                                        'bg-emerald-950/20 border-emerald-900/50 shadow-emerald-900/10'
                                }`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-slate-400 mb-1 block">
                                            {sauce.restaurant}
                                        </span>
                                        <h3 className="font-bold text-xl text-white leading-tight">
                                            {sauce.name}
                                        </h3>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${sauce.verdict === 'Deadly' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                        sauce.verdict === 'Danger' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                            sauce.verdict === 'Caution' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                        {sauce.verdict}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-400 italic mb-6 leading-relaxed">"{sauce.desc}"</p>

                                <div className="flex gap-4 relative z-10">
                                    <div className="bg-slate-900/80 p-3 rounded-2xl text-center min-w-[70px] border border-slate-700/50">
                                        <div className="text-2xl font-black text-white">{sauce.sugar}</div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Sugar</div>
                                    </div>
                                    <div className="bg-slate-900/80 p-3 rounded-2xl text-center min-w-[70px] border border-slate-700/50">
                                        <div className="text-xl font-bold text-slate-300">{sauce.carbs}</div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Carbs</div>
                                    </div>
                                </div>

                                <div className="absolute right-[-20px] bottom-[-20px] text-current opacity-5 pointer-events-none">
                                    <Droplet size={140} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

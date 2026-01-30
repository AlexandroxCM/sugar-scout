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
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Tap a sauce to analyze
                </h3>
                <div className="overflow-x-auto pb-2 -mx-2 px-2">
                    <div className="flex gap-3 min-w-max">
                        {interactiveSauces.map((sauce) => {
                            const colors = getRiskColor(sauce.risk_level);
                            const isSelected = selectedSauce?.id === sauce.id;
                            return (
                                <button
                                    key={sauce.id}
                                    onClick={() => setSelectedSauce(sauce)}
                                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 min-w-[72px] ${isSelected
                                        ? 'bg-slate-100 ring-2 ring-offset-2 scale-105'
                                        : 'bg-slate-50 hover:bg-slate-100 hover:scale-102'
                                        }`}
                                    style={{
                                        ringColor: isSelected ? colors.bg : 'transparent'
                                    }}
                                >
                                    <span className="text-3xl mb-1">{sauce.icon}</span>
                                    <span className="text-xs font-medium text-slate-700 text-center leading-tight">
                                        {sauce.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sugar Meter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 text-center">
                    Sugar Meter
                </h3>

                {selectedSauce ? (
                    <div className="flex flex-col items-center">
                        {/* Circular Gauge */}
                        <div className="relative w-48 h-48 mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="12"
                                />
                                {/* Progress arc */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={riskColors.bg}
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={`${meterAnimation * 2.51} 251`}
                                    className="transition-all duration-700 ease-out"
                                />
                            </svg>
                            {/* Center content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl mb-1">{selectedSauce.icon}</span>
                                <span
                                    className="text-3xl font-black"
                                    style={{ color: riskColors.bg }}
                                >
                                    {selectedSauce.sugar_value}g
                                </span>
                                <span className="text-xs font-medium text-slate-500">sugar</span>
                            </div>
                        </div>

                        {/* Risk Level Badge */}
                        <div
                            className="px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider"
                            style={{
                                backgroundColor: riskColors.bg + '20',
                                color: riskColors.text
                            }}
                        >
                            {riskColors.label}
                        </div>

                        {/* Legend */}
                        <div className="flex gap-4 mt-4 text-xs">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-slate-600">0-2g</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="text-slate-600">3-6g</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="text-slate-600">7g+</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-8 text-slate-400">
                        <Droplet size={48} className="mb-2 opacity-50" />
                        <p className="text-sm">Select a sauce above to see its sugar content</p>
                    </div>
                )}
            </div>

            {/* Watchout Tooltip Popup */}
            {showTooltip && selectedSauce && (
                <div className="fixed inset-x-4 bottom-24 md:static md:inset-auto z-50">
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 shadow-lg relative animate-pulse">
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex gap-3 items-start">
                            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-red-900 font-bold text-sm mb-1">
                                    ⚠️ High Sugar Alert!
                                </h4>
                                <p className="text-red-800 text-sm">
                                    {selectedSauce.tip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-center text-slate-400 italic px-4">
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
        <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex justify-center">
                <button
                    onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-md ${isInteractiveMode
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                        }`}
                >
                    <Zap size={18} className={isInteractiveMode ? 'animate-pulse' : ''} />
                    {isInteractiveMode ? 'Interactive Mode ON' : 'Try Interactive Mode'}
                </button>
            </div>

            {isInteractiveMode ? (
                <InteractiveSauceAnalyzer />
            ) : (
                <>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex gap-3 items-start">
                            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                            <div>
                                <h3 className="text-red-900 font-bold text-lg">Hidden Sugar Trap</h3>
                                <p className="text-red-800 text-sm">
                                    Condiments are the #1 reason for unexpected glucose spikes. A "healthy" chicken breast can become a sugar bomb with just one dip cup.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sauceData.map((sauce, idx) => (
                            <div key={idx} className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${sauce.verdict === 'Deadly' ? 'bg-red-50 border-red-200' :
                                sauce.verdict === 'Danger' ? 'bg-orange-50 border-orange-200' :
                                    sauce.verdict === 'Caution' ? 'bg-yellow-50 border-yellow-200' :
                                        'bg-green-50 border-green-200'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 block">
                                            {sauce.restaurant}
                                        </span>
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight">
                                            {sauce.name}
                                        </h3>
                                    </div>
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${sauce.verdict === 'Deadly' ? 'bg-red-200 text-red-800' :
                                        sauce.verdict === 'Danger' ? 'bg-orange-200 text-orange-800' :
                                            sauce.verdict === 'Caution' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-green-200 text-green-800'
                                        }`}>
                                        {sauce.verdict}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-700 italic mb-4">"{sauce.desc}"</p>

                                <div className="flex gap-4">
                                    <div className="bg-white/60 p-2 rounded-lg text-center min-w-[60px]">
                                        <div className="text-xl font-black text-slate-800">{sauce.sugar}</div>
                                        <div className="text-[10px] font-bold uppercase text-slate-500">Sugar</div>
                                    </div>
                                    <div className="bg-white/60 p-2 rounded-lg text-center min-w-[60px]">
                                        <div className="text-lg font-bold text-slate-700">{sauce.carbs}</div>
                                        <div className="text-[10px] font-bold uppercase text-slate-500">Carbs</div>
                                    </div>
                                </div>

                                <div className="absolute right-[-20px] bottom-[-20px] text-current opacity-5 pointer-events-none">
                                    <Droplet size={120} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

import { AlertTriangle, Droplet, Search } from 'lucide-react'

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
    return (
        <div className="space-y-6">
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
        </div>
    )
}

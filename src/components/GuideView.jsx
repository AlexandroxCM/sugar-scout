import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { restaurantData } from '../restaurantData'

export function GuideView() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', ...new Set(restaurantData.map(r => r.category))]

    const filteredRestaurants = restaurantData.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.green.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.red.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
        return matchesSearch && matchesCategory;
    })

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            {/* Header */}
            <div className="text-center space-y-2 py-4 relative z-10">
                <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Restaurant Guide
                </h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto">
                    Navigate your favorite chains with safe bets and hacks.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-4 border border-slate-700 rounded-2xl leading-5 bg-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xl text-white"
                        placeholder="Search restaurants, foods, or hacks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-600'
                                : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Restaurant List */}
            <div className="space-y-4">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.name} className="bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 overflow-hidden hover:shadow-2xl hover:border-slate-700 transition-all">
                        <div className="bg-slate-800/80 px-5 py-4 flex justify-between items-center border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">{restaurant.name}</h2>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 text-slate-400 rounded-full uppercase tracking-widest border border-slate-700">
                                {restaurant.category}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                            {/* Safe Bet */}
                            <div className="p-5 space-y-2 bg-emerald-900/10 hover:bg-emerald-900/20 transition-colors">
                                <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">Safe Bet</div>
                                <div className="font-semibold text-white leading-relaxed">{restaurant.green}</div>
                            </div>

                            {/* The Trap */}
                            <div className="p-5 space-y-2 bg-rose-900/10 hover:bg-rose-900/20 transition-colors">
                                <div className="text-xs font-black text-rose-400 uppercase tracking-widest">The Trap</div>
                                <div className="font-semibold text-white leading-relaxed">{restaurant.red}</div>
                            </div>

                            {/* Pro Tip */}
                            <div className="p-5 space-y-2 bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                                <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Pro Tip</div>
                                <div className="font-semibold text-white italic leading-relaxed">"{restaurant.hack}"</div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12 bg-slate-900 rounded-3xl border border-dashed border-slate-700">
                        <div className="text-slate-400 mb-2 font-medium">No results found</div>
                        <div className="text-sm text-slate-500">Try adjusting your search or category filter</div>
                    </div>
                )}
            </div>
        </div>
    )
}

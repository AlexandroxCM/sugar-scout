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
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-4 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
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
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:bg-blue-50'
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
                    <div key={restaurant.name} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-slate-900 px-4 py-3 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{restaurant.name}</h2>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full uppercase tracking-tighter border border-slate-700">
                                {restaurant.category}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                            {/* Safe Bet */}
                            <div className="p-4 space-y-1 bg-green-50/50">
                                <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Safe Bet</div>
                                <div className="font-semibold text-slate-800 leading-tight">{restaurant.green}</div>
                            </div>

                            {/* The Trap */}
                            <div className="p-4 space-y-1 bg-red-50/50">
                                <div className="text-xs font-bold text-red-600 uppercase tracking-wider">The Trap</div>
                                <div className="font-semibold text-slate-800 leading-tight">{restaurant.red}</div>
                            </div>

                            {/* Pro Tip */}
                            <div className="p-4 space-y-1 bg-blue-50/50">
                                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pro Tip</div>
                                <div className="font-semibold text-slate-800 italic leading-tight">"{restaurant.hack}"</div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                        <div className="text-slate-400 mb-2">No results found</div>
                        <div className="text-sm text-slate-500">Try adjusting your search or category filter</div>
                    </div>
                )}
            </div>
        </div>
    )
}

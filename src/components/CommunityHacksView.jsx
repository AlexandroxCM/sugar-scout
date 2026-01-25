import { useState } from 'react'
import { MessageSquare, ThumbsUp, User } from 'lucide-react'

const initialHacks = [
    {
        id: 1,
        restaurant: "Chipotle",
        title: "The Double-Fiber Hack",
        desc: "Ask for double black beans and no rice. Then ask for 'extra fajita veggies'. The fiber load creates a much slower spike than a standard bowl.",
        user: "T1D_Ninja",
        likes: 124
    },
    {
        id: 2,
        restaurant: "Starbucks",
        title: "'Pink Drink' Low Carb Dupe",
        desc: "Order an Iced Passion Tango Tea (unsweetened), add a splash of heavy cream, and 2 pumps of sugar-free vanilla. Tastes just like the Pink Drink but ~2g carbs.",
        user: "GlucoseGuardian",
        likes: 89
    },
    {
        id: 3,
        restaurant: "McDonald's",
        title: "The Bunless Triple",
        desc: "Order a Triple Cheeseburger 'No Bun, Lettuce Wrapped'. It's cheaper than the Quarter Pounder and has less sugar because there's no ketchup by default (add mustard yourself).",
        user: "BurgerKing_Kong",
        likes: 56
    }
]

export function CommunityHacksView() {
    const [hacks, setHacks] = useState(initialHacks)
    const [newHack, setNewHack] = useState({ restaurant: '', title: '', desc: '', user: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const hackToAdd = {
                id: hacks.length + 1,
                ...newHack,
                likes: 0
            }
            setHacks([hackToAdd, ...hacks])
            setNewHack({ restaurant: '', title: '', desc: '', user: '' })
            setIsSubmitting(false)
        }, 800)
    }

    return (
        <div className="space-y-6">
            <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Community Kitchen</h2>
                <p className="opacity-90">
                    Real hacks from real diabetics. Share your custom orders that kept your blood sugar steady.
                </p>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare size={18} /> Submit Your Hack
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Restaurant Name"
                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            value={newHack.restaurant}
                            onChange={(e) => setNewHack({ ...newHack, restaurant: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Hack Title (e.g. 'The Keto Bowl')"
                            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            value={newHack.title}
                            onChange={(e) => setNewHack({ ...newHack, title: e.target.value })}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Describe the order and why it works..."
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-sm min-h-[80px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        value={newHack.desc}
                        onChange={(e) => setNewHack({ ...newHack, desc: e.target.value })}
                        required
                    />
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Your Username"
                            className="w-1/2 rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            value={newHack.user}
                            onChange={(e) => setNewHack({ ...newHack, user: e.target.value })}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Hack'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {hacks.map((hack) => (
                    <div key={hack.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-indigo-200 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                                    {hack.restaurant}
                                </span>
                                <h3 className="font-bold text-lg text-slate-900">
                                    {hack.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                                <ThumbsUp size={14} /> {hack.likes}
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                            {hack.desc}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                <User size={12} />
                            </div>
                            by @{hack.user}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

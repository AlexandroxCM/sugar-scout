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
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-cyan-900/30 rounded-[2rem] p-8 border border-cyan-800/50 shadow-xl relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-3 tracking-tight text-white drop-shadow-md">Community Kitchen</h2>
                    <p className="text-cyan-100/80 leading-relaxed max-w-2xl">
                        Real hacks from real diabetics. Share your custom orders that kept your blood sugar steady.
                    </p>
                </div>
            </div>

            {/* Submission Form */}
            <div className="bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 p-6 md:p-8 relative z-10">
                <h3 className="font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-sm">
                    <MessageSquare size={18} className="text-cyan-400" /> Submit Your Hack
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Restaurant Name"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 p-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner"
                            value={newHack.restaurant}
                            onChange={(e) => setNewHack({ ...newHack, restaurant: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Hack Title (e.g. 'The Keto Bowl')"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 p-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner"
                            value={newHack.title}
                            onChange={(e) => setNewHack({ ...newHack, title: e.target.value })}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Describe the order and why it works..."
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 p-4 text-sm text-white placeholder-slate-500 min-h-[100px] focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner"
                        value={newHack.desc}
                        onChange={(e) => setNewHack({ ...newHack, desc: e.target.value })}
                        required
                    />
                    <div className="flex justify-between items-center pt-2">
                        <input
                            type="text"
                            placeholder="Your Username"
                            className="w-1/2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner"
                            value={newHack.user}
                            onChange={(e) => setNewHack({ ...newHack, user: e.target.value })}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-cyan-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Hack'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {hacks.map((hack) => (
                    <div key={hack.id} className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-6 md:p-8 hover:border-cyan-500/50 hover:shadow-cyan-900/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2 block">
                                    {hack.restaurant}
                                </span>
                                <h3 className="font-bold text-xl text-white">
                                    {hack.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-1.5 text-cyan-300 bg-cyan-900/30 px-3 py-1.5 rounded-full border border-cyan-800 text-sm font-bold">
                                <ThumbsUp size={14} className="text-cyan-400" /> {hack.likes}
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {hack.desc}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                <User size={14} className="text-slate-400" />
                            </div>
                            <span>by @{hack.user}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

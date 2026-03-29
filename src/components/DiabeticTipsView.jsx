import { generalTips, restaurantWarnings } from '../diabeticTipsData'

export function DiabeticTipsView() {
    return (
        <div className="space-y-8 animate-fadeIn pb-12">
            {/* Header */}
            <div className="text-center space-y-2 py-4 relative z-10">
                <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    Diabetic Tips
                </h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto">
                    Essential strategies for managing diabetes on the go.
                </p>
            </div>

            {/* General Tips Section */}
            <section className="bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 p-8 overflow-hidden relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        💡
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Essential Dining Strategies</h2>
                        <p className="text-slate-400 text-sm font-medium mt-1">Master the art of eating out with diabetes</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {generalTips.map((tip, idx) => (
                        <div key={idx} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-lg transition-all duration-300">
                            <h3 className="font-bold text-slate-200 mb-3 flex items-center text-lg">
                                <span className="w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                                    {idx + 1}
                                </span>
                                {tip.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed pl-10">
                                {tip.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Restaurant Warnings Section */}
            <section className="bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 p-8 relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                        ⚠️
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Restaurant Watchouts</h2>
                        <p className="text-slate-400 text-sm font-medium mt-1">Specific things to avoid at popular chains</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {restaurantWarnings.map((item, idx) => (
                        <div key={idx} className="border-l-[6px] border-orange-500 bg-orange-950/30 rounded-r-2xl p-5 md:p-6 hover:bg-orange-900/40 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="font-black text-white text-xl mb-3 tracking-wide">{item.restaurant}</h3>
                                    <div className="space-y-3">
                                        <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                            <strong className="text-orange-400 uppercase tracking-widest text-[10px] block mb-1">Warning:</strong> {item.warning}
                                        </p>
                                        <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                            <strong className="text-emerald-400 uppercase tracking-widest text-[10px] block mb-1">Better Choice:</strong> {item.tip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

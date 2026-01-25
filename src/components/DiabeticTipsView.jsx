import { generalTips, restaurantWarnings } from '../diabeticTipsData'

export function DiabeticTipsView() {
    return (
        <div className="space-y-8 animate-fadeIn">

            {/* General Tips Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                        💡
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Essential Dining Strategies</h2>
                        <p className="text-slate-500 text-sm">Master the art of eating out with diabetes</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {generalTips.map((tip, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-colors">
                            <h3 className="font-bold text-slate-700 mb-2 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                                    {idx + 1}
                                </span>
                                {tip.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed pl-8">
                                {tip.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Restaurant Warnings Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                        ⚠️
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Restaurant Watchouts</h2>
                        <p className="text-slate-500 text-sm">Specific things to avoid at popular chains</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {restaurantWarnings.map((item, idx) => (
                        <div key={idx} className="border-l-4 border-orange-400 bg-orange-50/50 rounded-r-xl p-4 md:p-5">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">{item.restaurant}</h3>
                                    <div className="space-y-2">
                                        <p className="text-slate-700 text-sm">
                                            <strong className="text-orange-700">Warning:</strong> {item.warning}
                                        </p>
                                        <p className="text-slate-700 text-sm">
                                            <strong className="text-green-700">Better Choice:</strong> {item.tip}
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

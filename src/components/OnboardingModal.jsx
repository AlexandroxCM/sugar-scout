import { useState, useEffect } from 'react'
import { X, Shield, Users, Rocket, ArrowRight } from 'lucide-react'

export function OnboardingModal({ onClose }) {
    // Start as open every time the component is mounted
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        if (onClose) onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-blue-100">
                <div className="relative bg-slate-900 p-8 text-white overflow-hidden">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-10 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                            <Rocket className="w-3 h-3" />
                            Scout Briefing
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">What is <span className="text-blue-400">Sugar Scout</span>?</h2>
                        <p className="text-slate-400 font-medium text-sm">Your dynamic toolkit for the T1D life.</p>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full"></div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-4 rounded-2xl bg-blue-50 border border-blue-100 group hover:border-blue-200 transition-colors">
                            <div className="mt-1 p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Project Scope</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Moving beyond static guides to provide immediate, actionable data for insulin dosing and meal planning.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-2xl bg-indigo-50 border border-indigo-100 group hover:border-indigo-200 transition-colors">
                            <div className="mt-1 p-2 bg-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Target Audience</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Optimized for <span className="font-bold text-indigo-700">Type 1 Diabetics</span>, focusing on precise carb counts and glycemic impact.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-2xl bg-orange-50 border border-orange-100 group hover:border-orange-200 transition-colors">
                            <div className="mt-1 p-2 bg-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Future Roadmap</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Expansion for <span className="font-bold text-orange-700">Type 2 Diabetics</span> and smart integration features coming soon!
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
                    >
                        Explore Sugar Scout
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

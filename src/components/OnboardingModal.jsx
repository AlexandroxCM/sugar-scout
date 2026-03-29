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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-slate-900 w-full max-w-lg rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.1)] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-800">
                <div className="relative bg-slate-950/80 p-8 text-white overflow-hidden border-b border-slate-800">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-10 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                            <Rocket className="w-3 h-3" />
                            Scout Briefing
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">What is <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Sugar Scout</span>?</h2>
                        <p className="text-slate-400 font-medium text-sm">Your dynamic toolkit for the T1D life.</p>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full"></div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-800/50 border border-slate-700 group hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300">
                            <div className="mt-1 p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                                <Shield className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Project Scope</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                    Moving beyond static guides to provide immediate, actionable data for insulin dosing and meal planning.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-800/50 border border-slate-700 group hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300">
                            <div className="mt-1 p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
                                <Users className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Target Audience</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                    Optimized for <span className="font-bold text-indigo-400">Type 1 Diabetics</span>, focusing on precise carb counts and glycemic impact.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-800/50 border border-slate-700 group hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300">
                            <div className="mt-1 p-2 bg-orange-500/20 border border-orange-500/30 rounded-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all">
                                <Rocket className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Future Roadmap</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                    Expansion for <span className="font-bold text-orange-400">Type 2 Diabetics</span> and smart integration features coming soon!
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98]"
                    >
                        Explore Sugar Scout
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

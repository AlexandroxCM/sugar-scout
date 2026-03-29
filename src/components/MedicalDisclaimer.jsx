import { useState, useEffect } from 'react'
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react'

export function MedicalDisclaimer({ onAccept }) {
    // Start as open every time the component mounts (on ogni refresh)
    const [isOpen, setIsOpen] = useState(true)

    const handleAccept = () => {
        setIsOpen(false)
        if (onAccept) onAccept()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-slate-900 w-full max-w-xl rounded-[2rem] shadow-[0_0_50px_rgba(225,29,72,0.15)] overflow-hidden border border-rose-900/50 animate-in slide-in-from-bottom-4 duration-500">

                {/* Header with Warning Icon */}
                <div className="bg-rose-950/80 p-8 text-white text-center relative overflow-hidden border-b border-rose-900/50">
                    <div className="absolute top-[-20px] right-[-20px] opacity-10">
                        <AlertCircle size={160} />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl mb-5 backdrop-blur-sm shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                            <ShieldAlert className="w-10 h-10 text-rose-400" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Medical Disclaimer</h2>
                        <p className="text-red-100 text-sm font-medium mt-1">Please read carefully before proceeding</p>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 space-y-4">
                            <p className="text-sm text-slate-200 leading-relaxed font-bold">
                                Sugar Scout is an educational tool and does NOT provide medical advice.
                            </p>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                All carb counts, nutritional data, and suggested insulin doses are estimates based on general restaurant information. Individual recipes and portion sizes may vary.
                            </p>
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80">
                                <p className="text-[11px] text-slate-300 leading-relaxed italic">
                                    "I understand that the Bolus Calculator and nutritional guides are for educational purposes only. I agree to consult with my medical professional before making any changes to my treatment or insulin regimen."
                                </p>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                The developers of Sugar Scout are not responsible for any adverse health outcomes resulting from the use of this application. By clicking "I Understand & Accept", you agree to the terms of use.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] active:scale-[0.98] group"
                    >
                        <span className="tracking-wide">I UNDERSTAND & ACCEPT</span>
                        <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Required for use of Sugar Scout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

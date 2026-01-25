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
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden border border-red-100 animate-in slide-in-from-bottom-4 duration-500">

                {/* Header with Warning Icon */}
                <div className="bg-red-600 p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-[-20px] right-[-20px] opacity-10">
                        <AlertCircle size={160} />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                            <ShieldAlert className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Medical Disclaimer</h2>
                        <p className="text-red-100 text-sm font-medium mt-1">Please read carefully before proceeding</p>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                            <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                                Sugar Scout is an educational tool and does NOT provide medical advice.
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                All carb counts, nutritional data, and suggested insulin doses are estimates based on general restaurant information. Individual recipes and portion sizes may vary.
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                                    "I understand that the Bolus Calculator and nutritional guides are for educational purposes only. I agree to consult with my medical professional before making any changes to my treatment or insulin regimen."
                                </p>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                The developers of Sugar Scout are not responsible for any adverse health outcomes resulting from the use of this application. By clicking "I Understand & Accept", you agree to the terms of use.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-200 active:scale-[0.98] group"
                    >
                        <span>I UNDERSTAND & ACCEPT</span>
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
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

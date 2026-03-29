import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { initGA, trackPageView, trackEvent } from './analytics'
import { GuideView } from './components/GuideView'
import { NutritionalFactsView } from './components/NutritionalFactsView'
import { DiabeticTipsView } from './components/DiabeticTipsView'
import { SauceScannerView } from './components/SauceScannerView'
import { CommunityHacksView } from './components/CommunityHacksView'
import { SupplyFinderView } from './components/SupplyFinderView'
import { EventsView } from './components/EventsView'
import { GlucoseLabView } from './components/GlucoseLabView'
import { InsulinDecayView } from './components/InsulinDecayView'

import { OnboardingModal } from './components/OnboardingModal'
import { MedicalDisclaimer } from './components/MedicalDisclaimer'
import logo from './assets/logo.png'

export default function App() {
    const [activeTab, setActiveTab] = useState('guide')
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)

    useEffect(() => {
        initGA();
        trackPageView(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        trackPageView(`/${activeTab}`);
    }, [activeTab]);

    const tabs = [
        { id: 'guide', label: 'Restaurants' },
        { id: 'nutrition', label: 'Nutrition' },
        { id: 'scanner', label: 'Sauce Scanner' },
        { id: 'lab', label: 'The Lab' },
        { id: 'iob', label: 'IOB Math' },
        { id: 'supplies', label: 'Supplies' },
        { id: 'hacks', label: 'Hacks' },
        { id: 'events', label: 'Events' },
        { id: 'tips', label: 'Tips' }
    ]

    return (
        <div className="min-h-screen bg-slate-950 p-4 md:p-8 selection:bg-cyan-500/30">
            {!disclaimerAccepted && (
                <MedicalDisclaimer onAccept={() => {
                    setDisclaimerAccepted(true);
                    trackEvent("User", "Accepted Disclaimer", "Medical Policy");
                }} />
            )}
            {disclaimerAccepted && <OnboardingModal />}
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <img src={logo} alt="Sugar Scout Logo" className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
                    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">Sugar Scout</h1>
                    <p className="text-cyan-400 font-bold tracking-wide uppercase text-sm drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">Diabetic-friendly guide</p>
                </div>

                {/* Tab Navigation - Scrollable on mobile */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0">
                    <div className="flex p-1.5 space-x-1 bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl rounded-xl min-w-max md:min-w-0 shadow-xl shadow-slate-900/50">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 md:px-0 md:w-full py-2.5 text-sm leading-5 rounded-lg transition-all duration-300 whitespace-nowrap
                                    ${activeTab === tab.id
                                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30 text-white font-bold'
                                        : 'text-slate-400 font-medium hover:bg-slate-800/80 hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="transition-all duration-300 ease-in-out">
                    {activeTab === 'guide' ? <GuideView /> :
                        activeTab === 'nutrition' ? <NutritionalFactsView /> :
                            activeTab === 'scanner' ? <SauceScannerView /> :
                                activeTab === 'lab' ? <GlucoseLabView /> :
                                    activeTab === 'iob' ? <InsulinDecayView /> :
                                        activeTab === 'supplies' ? <SupplyFinderView /> :
                                            activeTab === 'hacks' ? <CommunityHacksView /> :
                                                activeTab === 'events' ? <EventsView /> :
                                                    <DiabeticTipsView />}
                </div>
            </div>
            <Analytics />
        </div>
    )
}

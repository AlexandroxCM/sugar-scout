import { useState, useEffect } from 'react'
import { initGA, trackPageView, trackEvent } from './analytics'
import { GuideView } from './components/GuideView'
import { NutritionalFactsView } from './components/NutritionalFactsView'
import { DiabeticTipsView } from './components/DiabeticTipsView'
import { SauceScannerView } from './components/SauceScannerView'
import { CommunityHacksView } from './components/CommunityHacksView'
import { SupplyFinderView } from './components/SupplyFinderView'
import { EventsView } from './components/EventsView'

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
        { id: 'supplies', label: 'Supplies' },
        { id: 'hacks', label: 'Hacks' },
        { id: 'events', label: 'Events' },
        { id: 'tips', label: 'Tips' }
    ]

    return (
        <div className="min-h-screen bg-[#E0F2FE] p-4 md:p-8">
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
                    <img src={logo} alt="Sugar Scout Logo" className="w-32 h-32 mx-auto object-contain mb-4" />
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sugar Scout</h1>
                    <p className="text-slate-500 font-medium">Diabetic-friendly guide</p>
                </div>

                {/* Tab Navigation - Scrollable on mobile */}
                <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0">
                    <div className="flex p-1 space-x-1 bg-slate-200/50 rounded-xl min-w-max md:min-w-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 md:px-0 md:w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 whitespace-nowrap
                                    ${activeTab === tab.id
                                        ? 'bg-white shadow text-slate-900'
                                        : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'
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
                                activeTab === 'supplies' ? <SupplyFinderView /> :
                                    activeTab === 'hacks' ? <CommunityHacksView /> :
                                        activeTab === 'events' ? <EventsView /> :
                                            <DiabeticTipsView />}
                </div>
            </div>
        </div>
    )
}

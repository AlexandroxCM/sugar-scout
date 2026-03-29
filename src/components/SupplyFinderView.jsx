import { useState } from 'react'

export function SupplyFinderView() {
    const resources = [
        {
            id: 'mad',
            name: 'Mutual Aid Diabetes',
            category: 'Emergency / Mutual Aid',
            description: 'Community-run network connecting people with extra supplies to those in need. Request insulin, pumps, or funds directly.',
            link: 'https://mutualaiddiabetes.com/',
            tags: ['Urgent', 'Community', 'Global']
        },
        {
            id: 'ifl',
            name: 'Insulin for Life USA',
            category: 'Non-Profit Assistance',
            description: 'Provides free insulin and supplies to those in desperate need. Requires an application but is a reliable safety net.',
            link: 'https://iflusa.org/',
            tags: ['Application Required', 'Free Supplies']
        },
        {
            id: 'embrace',
            name: 'The Embrace Foundation',
            category: 'Emergency / Mutual Aid',
            description: 'Sends free diabetes supplies to people in need. Run by people with T1D, for people with T1D.',
            link: 'https://www.theembracefoundation.org/',
            tags: ['Free Supplies', 'T1D Focused']
        },

        {
            id: 'lilly',
            name: 'Lilly Cares Foundation',
            category: 'Manufacturer Program',
            description: 'Patient assistance program for those prescribed Lilly medications (Humalog, Basaglar, etc.) who cannot afford them.',
            link: 'https://www.lillycares.com/',
            tags: ['Medication', 'USA Only']
        },
        {
            id: 'novo',
            name: 'NovoCare',
            category: 'Manufacturer Program',
            description: 'Assistance for Novo Nordisk products (Novolog, Tresiba). Offers free medication to eligible patients.',
            link: 'https://www.novocare.com/',
            tags: ['Medication', 'USA Only']
        },
        {
            id: 'sanofi',
            name: 'Sanofi Patient Connection',
            category: 'Manufacturer Program',
            description: 'Support program for Sanofi insulins (Lantus, Toujeo). detailed eligibility criteria for free meds.',
            link: 'https://www.sanofipatientconnection.com/',
            tags: ['Medication', 'USA Only']
        },
        {
            id: 'dww',
            name: "Diabetes Will's Way",
            category: 'Non-Profit Assistance',
            description: 'Provides grants for insulin pumps, CGMs, and emergency complications for families with T1D under age 26.',
            link: 'https://diabeteswillsway.com/',
            tags: ['Grants', 'Pumps', 'CGM']
        },
        {
            id: 'bt1',
            name: 'Beyond Type 1',
            category: 'Community Hub',
            description: 'Global non-profit with a massive community app for peer support, news, and resource sharing.',
            link: 'https://beyondtype1.org/',
            tags: ['Community', 'App', 'Resources']
        },
        {
            id: 'needymeds',
            name: 'NeedyMeds',
            category: 'Directory',
            description: ' extensive database of patient assistance programs, drug discount cards, and scholarships.',
            link: 'https://www.needymeds.org/',
            tags: ['Database', 'Discounts']
        },
        {
            id: 'reddit-t1',
            name: 'r/diabetes_t1',
            category: 'Community Hub',
            description: 'Active Reddit community where users often share tips on affording supplies and sometimes facilitate emergency trades (use caution).',
            link: 'https://www.reddit.com/r/diabetes_t1/',
            tags: ['Forum', 'Advice', 'Community']
        },
        {
            id: 'rxassist',
            name: 'RxAssist',
            category: 'Directory',
            description: 'Comprehensive database of patient assistance programs to help pay for medications.',
            link: 'https://www.rxassist.org/',
            tags: ['Search Tool', 'Discounts']
        }
    ]

    const [filter, setFilter] = useState('All')
    const categories = ['All', ...new Set(resources.map(r => r.category))]

    const filteredResources = filter === 'All'
        ? resources
        : resources.filter(r => r.category === filter)

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 p-8 relative z-10">
                <div className="max-w-2xl relative z-10">
                    <h2 className="text-3xl font-black text-white mb-3 tracking-tight drop-shadow-md">Supply Finder</h2>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                        A collection of resources for uninsured or underinsured diabetics.
                        These organizations and communities help provide essential supplies like insulin, test strips, and pump parts.
                    </p>

                    <div className="p-5 bg-cyan-950/40 border border-cyan-900/50 rounded-2xl text-sm text-cyan-200/90 leading-relaxed shadow-inner">
                        <strong className="text-cyan-400 uppercase tracking-widest text-xs">Note:</strong> Sugar Scout shares these resources for informational purposes.
                        We do not manage these programs directly. Always verify safety when receiving supplies from community sources.
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 relative z-10">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${filter === cat
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-slate-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Resource Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {filteredResources.map((resource) => (
                    <a
                        key={resource.id}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-6 hover:border-emerald-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                                {resource.category}
                            </span>
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                            {resource.name}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                            {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {resource.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

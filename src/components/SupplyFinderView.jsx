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
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Supply Finder</h2>
                    <p className="text-slate-600 mb-4">
                        A collection of resources for uninsured or underinsured diabetics.
                        These organizations and communities help provide essential supplies like insulin, test strips, and pump parts.
                    </p>

                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-800">
                        <strong>Note:</strong> Sugar Scout shares these resources for informational purposes.
                        We do not manage these programs directly. Always verify safety when receiving supplies from community sources.
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                            : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
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
                        className="group flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                {resource.category}
                            </span>
                            <svg className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700">
                            {resource.name}
                        </h3>

                        <p className="text-slate-600 text-sm mb-4 flex-grow">
                            {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {resource.tags.map(tag => (
                                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
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

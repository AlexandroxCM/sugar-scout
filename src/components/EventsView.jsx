import { Calendar, MapPin, ExternalLink, Heart } from 'lucide-react'

export function EventsView() {
    const events = [
        {
            id: 'bearskin',
            title: 'BearSkin Meadow Camp',
            organizer: 'Diabetes Youth Families (DYF)',
            description: 'One of the oldest and most well-regarded camps for children and families affected by Type 1 diabetes. Located in the Sequoia National Forest, it offers a supportive community mixed with diabetes education.',
            location: 'Miramonte, CA',
            type: 'Camp',
            tags: ['Summer Camp', 'Family Retreats', 'T1D'],
            link: 'https://dyf.org/camps/bearskin-meadow-camp/',
            highlight: true
        },
        {
            id: 'ucsf-clinics',
            title: 'Pediatric Diabetes Clinic Events',
            organizer: 'UCSF Benioff Children\'s Hospital Oakland',
            description: 'Regular clinics, classes, and one-on-one sessions for children and young adults (0-21). Call (510) 428-3654 for more information or visit their website.',
            location: 'Oakland, CA',
            type: 'Medical/Educational',
            tags: ['Education', 'Clinic', 'Support'],
            link: 'https://www.ucsfbenioffchildrens.org'
        },
        {
            id: 'dyf-community',
            title: 'Community Programs & Day Camps',
            organizer: 'Diabetes Youth Families (DYF)',
            description: 'Year-round events including the T2D Community Day Program, family retreats, and educational workshops designed to foster peer connection.',
            location: 'Various Locations (Bay Area)',
            type: 'Community',
            tags: ['Community', 'T2D', 'Workshops'],
            link: 'https://dyf.org'
        },
        {
            id: 'breakthrough-t1d',
            title: 'Breakthrough T1D (formerly JDRF) Events',
            organizer: 'Breakthrough T1D',
            description: 'Major community walks, annual galas, and educational summits. Visit the homepage and look for the "Northern California" chapter or "Events" section to find local activities.',
            location: 'Northern California',
            type: 'Community/Fundraising',
            tags: ['Walks', 'Gala', 'Research'],
            link: 'https://www.breakthrought1d.org/'
        },
        {
            id: 'tcoyd',
            title: 'TCOYD Conferences & ONE Conference',
            organizer: 'Taking Control Of Your Diabetes',
            description: 'Large-scale conferences featuring humor-infused education and innovation. The massive "ONE" conference is held annually in San Diego, connecting thousands of T1Ds.',
            location: 'San Diego / National',
            type: 'Conference',
            tags: ['Conference', 'Education', 'T1D'],
            link: 'https://tcoyd.org'
        },
        {
            id: 'beyond-type1',
            title: 'Beyond Type 1 Community',
            organizer: 'Beyond Type 1',
            description: 'Hosts the "Beyond Type 1" app for digital connection and organizes local meetups, slipstreams, and endurance events. A modern, high-energy community focus.',
            location: 'Global / Online',
            type: 'Community',
            tags: ['App', 'Social', 'Online'],
            link: 'https://community.beyondtype1.org'
        },
        {
            id: 'local-meetups',
            title: 'Bay Area T1D Meetups',
            organizer: 'Community Lead',
            description: 'Grassroots local groups for casual hangouts, hiking, and "Type 1 Drinks". Includes groups like the "Closed Loop Artificial Pancreas Systems" meetup for tech enthusiasts.',
            location: 'SF Bay Area',
            type: 'Social',
            tags: ['Social', 'Meetup', 'Tech'],
            link: 'https://www.meetup.com/topics/diabetes/us/ca/san_francisco/'
        }
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-8 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-3 tracking-tight drop-shadow-md">Connect with the Community</h2>
                    <p className="text-cyan-100/90 leading-relaxed max-w-2xl">
                        Discover camps, meetups, and events to connect with other Type 1 and Type 2 diabetics.
                        You are not alone in this journey!
                    </p>
                </div>
            </div>

            <div className="bg-amber-950/40 border border-amber-900/50 rounded-2xl p-5 text-sm text-amber-200/90 flex gap-4 shadow-inner relative z-10">
                <Calendar className="w-5 h-5 flex-shrink-0 text-amber-500" />
                <p className="leading-relaxed">
                    <strong className="text-amber-400 uppercase tracking-widest text-xs">Tip:</strong> Many of these camps fill up quickly! It's recommended to check their websites early in the year (Jan/Feb) for summer registration.
                </p>
            </div>

            <div className="grid gap-6 relative z-10">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`bg-slate-900 rounded-3xl border transition-all duration-300 hover:shadow-2xl overflow-hidden hover:-translate-y-1 ${event.highlight ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-1">
                                        {event.title}
                                        {event.highlight && <Heart className="w-5 h-5 text-rose-500 fill-current drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />}
                                    </h3>
                                    <p className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">{event.organizer}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${event.highlight
                                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                    }`}>
                                    {event.type}
                                </span>
                            </div>

                            <p className="text-slate-300 mb-8 leading-relaxed max-w-4xl">
                                {event.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
                                <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg">
                                    <MapPin className="w-4 h-4 text-cyan-500" />
                                    <span className="text-slate-300">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {event.tags.map(tag => (
                                        <span key={tag} className="text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1.5 rounded-md">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-sm tracking-wide rounded-full transition-all duration-300 gap-2 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                            >
                                Visit Website
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

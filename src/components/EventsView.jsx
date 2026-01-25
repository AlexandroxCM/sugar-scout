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
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Connect with the Community</h2>
                <p className="text-blue-50">
                    Discover camps, meetups, and events to connect with other Type 1 and Type 2 diabetics.
                    You are not alone in this journey!
                </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <p>
                    <strong>Tip:</strong> Many of these camps fill up quickly! It's recommended to check their websites early in the year (Jan/Feb) for summer registration.
                </p>
            </div>

            <div className="grid gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`bg-white rounded-xl border transition-all hover:shadow-md overflow-hidden ${event.highlight ? 'border-blue-200 ring-4 ring-blue-50/50' : 'border-slate-200'
                            }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        {event.title}
                                        {event.highlight && <Heart className="w-5 h-5 text-red-500 fill-current" />}
                                    </h3>
                                    <p className="text-slate-500 font-medium">{event.organizer}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.highlight
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {event.type}
                                </span>
                            </div>

                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {event.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {event.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    {event.tags.map(tag => (
                                        <span key={tag} className="text-slate-400">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors gap-2"
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

export interface JournalEntry {
  title: string;
  subtitle: string;
  note: string;
  photo: string;
  detail: string;
  art: string;
  alt: string;
  detailAlt: string;
  artAlt: string;
  color: string;
}

export const journalAsset = (name: string) => `/images/journal/${name}.webp`;

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    title: 'Somewhere, slower.', subtitle: 'FIELD NOTES / THE MOUNTAINS',
    note: 'No alarms. No hurry. Just a little mountain air and a road we hadn’t taken before.',
    photo: 'mountain-morning', detail: 'alpine-walk', art: 'mountain-collage',
    alt: 'Travelers looking toward the mountains from a village street',
    detailAlt: 'A traveler sitting in a sunlit alpine landscape',
    artAlt: 'Mountain landscape with playful red collage elements', color: '#d6ddd0',
  },
  {
    title: 'Salt in the air.', subtitle: 'FIELD NOTES / BY THE WATER',
    note: 'Stayed for one more wave. Then one more. Some days don’t need much of a plan.',
    photo: 'surfers', detail: 'ocean-play', art: 'blue-seats',
    alt: 'Two surfers watching waves from a coastal path',
    detailAlt: 'Friends jumping above the shallow ocean water',
    artAlt: 'Rows of blue seats beneath a clear blue sky', color: '#d1dfe4',
  },
  {
    title: 'The scenic way.', subtitle: 'FIELD NOTES / SMALL DETOURS',
    note: 'A wrong turn, a good view. Collecting the moments that never make it onto the itinerary.',
    photo: 'on-the-road', detail: 'crosswalk', art: 'color-city',
    alt: 'A rider traveling down a sunlit road',
    detailAlt: 'A pedestrian crossing bright yellow stripes',
    artAlt: 'A city photograph reimagined with vertical colorful ribbons', color: '#e7d9bf',
  },
  {
    title: 'A pocket of quiet.', subtitle: 'FIELD NOTES / OUT IN THE GREEN',
    note: 'Put the phone away. Look up. There’s a whole world happening between the big moments.',
    photo: 'grass-daydream', detail: 'valley', art: 'green-trail',
    alt: 'A person lying in a field of tall green grass',
    detailAlt: 'Two travelers walking through a misty green valley',
    artAlt: 'A mountain trail stretched into an imaginative green landscape', color: '#d5ddbd',
  },
  {
    title: 'After the rain.', subtitle: 'FIELD NOTES / ORDINARY MAGIC',
    note: 'The streets went quiet, the colors came alive, and we found a reason to take the long way home.',
    photo: 'rainy-afternoon', detail: 'birds', art: 'tulips',
    alt: 'People with pink umbrellas walking on a rain-soaked street',
    detailAlt: 'Birds flying around a seated person under a blue sky',
    artAlt: 'Dreamy pink tulips rendered with a dotted texture', color: '#ead4d1',
  },
  {
    title: 'Under the same sky.', subtitle: 'FIELD NOTES / AFTER HOURS',
    note: 'A tiny tent. A very big sky. The kind of evening you wish you could fold up and keep.',
    photo: 'camping', detail: 'moon', art: 'sky-streaks',
    alt: 'A glowing tent and a camper van above a blue coastline',
    detailAlt: 'People silhouetted in front of a giant orange moon',
    artAlt: 'A surreal sweeping sky over a mountain landscape', color: '#ced6e1',
  },
  {
    title: 'Better, together.', subtitle: 'FIELD NOTES / GOOD COMPANY',
    note: 'Forgot the name of the place. Remember every laugh. That feels like the right kind of souvenir.',
    photo: 'friends', detail: 'laughter', art: 'enjoy-now',
    alt: 'Friends gathered in a circle beneath a bright blue sky',
    detailAlt: 'Two friends laughing together',
    artAlt: 'A playful red typographic collage reading enjoy the now', color: '#e4d6c0',
  },
  {
    title: 'Nothing on the list.', subtitle: 'FIELD NOTES / JUST BEING HERE',
    note: 'One last pause before going home. Keeping a little room in the journal for whatever comes next.',
    photo: 'sunlit-pause', detail: 'mountain-morning', art: 'cloud-daydream',
    alt: 'A traveler pausing on a mountain beneath a blue sky',
    detailAlt: 'A quiet village street opening onto mountain views',
    artAlt: 'A pastel cloud floating above a green hill', color: '#dcd8e8',
  },
];

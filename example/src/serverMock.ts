import {http, HttpResponse} from 'msw';
import {setupWorker} from 'msw/browser';

type BROWSE_PARAMS = { page: number, page_length: number, searchvalues: string[] };
type FACET_POST_PARAMS = { name: string, amount: number, filter: string, searchvalues: string[] };

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Etiam venenatis lobortis nunc quis vehicula. Mauris efficitur, odio ut eleifend tempus, ' +
    'felis elit fringilla nisi, ut aliquam ligula nunc ut purus. Nullam id interdum lorem, ' +
    'eget tristique elit. Vestibulum laoreet arcu ante, vitae euismod ante fermentum at. ' +
    'Cras suscipit, nibh vel finibus convallis, neque nulla interdum urna, ' +
    'sed vulputate ipsum enim vel tortor. Donec sit amet turpis eget lacus sodales convallis ' +
    'sit amet sit amet mauris. Fusce nec vestibulum nisi, id elementum erat. ' +
    'Maecenas pretium viverra metus vel lobortis. Praesent neque augue, auctor vel bibendum quis, ' +
    'rhoncus et elit. Etiam vitae sapien ut purus venenatis tempus. Sed id ornare lectus.'
const RANDOM_OCCUPATION_FACETS = [
    {key: 'Architect', doc_count: 994},
    {key: 'Mechanical Engineer', doc_count: 876},
    {key: 'Web Developer', doc_count: 812},
    {key: 'Doctor', doc_count: 782},
    {key: 'Marketing Specialist', doc_count: 760},
    {key: 'Pilot', doc_count: 723},
    {key: 'Operations Manager', doc_count: 712},
    {key: 'Hairdresser', doc_count: 689},
    {key: 'Anesthesiologist', doc_count: 674},
    {key: 'Interior Designer', doc_count: 645},
    {key: 'HR Manager', doc_count: 642},
    {key: 'Nurse', doc_count: 639},
    {key: 'Plumber', doc_count: 555},
    {key: 'Economist', doc_count: 553},
    {key: 'Supply Chain Analyst', doc_count: 551},
    {key: 'Software Engineer', doc_count: 523},
    {key: 'Software Developer', doc_count: 523},
    {key: 'Chef', doc_count: 478},
    {key: 'Business Analyst', doc_count: 473},
    {key: 'Surgeon', doc_count: 456},
    {key: 'Graphic Designer', doc_count: 435},
    {key: 'Lawyer', doc_count: 432},
    {key: 'Real Estate Agent', doc_count: 431},
    {key: 'Psychologist', doc_count: 412},
    {key: 'Journalist', doc_count: 398},
    {key: 'Dermatologist', doc_count: 389},
    {key: 'Event Planner', doc_count: 374},
    {key: 'Flight Attendant', doc_count: 348},
    {key: 'Data Scientist', doc_count: 331},
    {key: 'Interpreter', doc_count: 321},
    {key: 'Dentist', doc_count: 312},
    {key: 'Recruiter', doc_count: 299},
    {key: 'Photographer', doc_count: 287},
    {key: 'Loan Officer', doc_count: 284},
    {key: 'Social Worker', doc_count: 283},
    {key: 'General Practitioner', doc_count: 267},
    {key: 'Bartender', doc_count: 257},
    {key: 'Veterinarian', doc_count: 249},
    {key: 'Accountant', doc_count: 248},
    {key: 'Logistics Coordinator', doc_count: 218},
    {key: 'Statistician', doc_count: 211},
    {key: 'Electrician', doc_count: 192},
    {key: 'Translator', doc_count: 176},
    {key: 'UX Designer', doc_count: 135},
    {key: 'Teacher', doc_count: 115},
    {key: 'Civil Engineer', doc_count: 89}
];

export default setupWorker(
    http.get('https://example.org/detail', ({request}) => detailResolver(request.url)),
    http.get('https://example.org/facet', ({request}) => facetGetResolver(request.url)),
    http.post<{}, BROWSE_PARAMS>('https://example.org/browse', async ({request}) => browseResolver(await request.json())),
    http.post<{}, FACET_POST_PARAMS>('https://example.org/facet', async ({request}) => facetPostResolver(await request.json()))
);

function detailResolver(url: string) {
    console.log(`Detail request: ${url}`);

    const parsedUrl = new URL(url);
    const id = parsedUrl.searchParams.get('rec');

    return HttpResponse.json({
        id,
        title: `Item ${id}`,
        content: LOREM_IPSUM
    });
}

function facetGetResolver(url: string) {
    console.log(`Facet GET request ${url}`);

    const parsedUrl = new URL(url);
    const filter = parsedUrl.searchParams.get('filter') || '';
    const amount = parsedUrl.searchParams.has('amount') ? Number(parsedUrl.searchParams.get('amount')) : undefined;

    return createFacetsResponse(filter, amount);
}

function browseResolver({page, page_length, searchvalues}: BROWSE_PARAMS) {
    console.log(`Browse request: page=${page}, page_length=${page_length}, searchvalues=${searchvalues}`);

    const amount = 50;
    const pages = Math.min(amount, Math.ceil(amount / page_length));
    const items = [...Array(page_length).keys()].map(i => {
        const id = (page - 1) * page_length + i + 1;
        return {
            id,
            title: `Item ${id}`,
            content: LOREM_IPSUM
        };
    });

    return HttpResponse.json({amount, pages, items});
}

function facetPostResolver({name, amount, filter, searchvalues}: FACET_POST_PARAMS) {
    console.log(`Facet POST request: name=${name}, amount=${amount}, filter=${filter}, searchvalues=${searchvalues}`);

    return createFacetsResponse(filter, amount);
}

function createFacetsResponse(filter: string | undefined, amount: number | undefined) {
    let facets = RANDOM_OCCUPATION_FACETS;
    if (filter)
        facets = facets.filter(facet => filter.trim().includes(facet.key));
    if (amount)
        facets = facets.slice(0, Math.min(amount, RANDOM_OCCUPATION_FACETS.length));

    return HttpResponse.json(facets);
}

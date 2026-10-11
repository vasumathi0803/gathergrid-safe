import { createFileRoute } from '@tanstack/react-router';
import { IncidentsPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/incidents')({validateSearch:(search:Record<string,unknown>)=>({q:typeof search.q==='string'?search.q:''}),head:()=>routeHead('Incident Reports','Report, review, locate, and resolve simulated festival safety incidents in CrowdSafe.'),component:Page});
function Page(){const {q}=Route.useSearch();return <IncidentsPage key={q} query={q}/>;}

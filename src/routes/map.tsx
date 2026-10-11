import { createFileRoute } from '@tanstack/react-router';
import { CrowdMapPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/map')({validateSearch:(search:Record<string,unknown>)=>({location:typeof search['location']==='string'?search['location']:undefined}),head:()=>routeHead('Crowd Map','Explore CrowdSafe’s interactive fictional festival map and clearly simulated crowd-risk zones.'),component:Page});
function Page(){const {location}=Route.useSearch();return <CrowdMapPage location={location}/>;}

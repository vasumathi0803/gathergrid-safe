import { createFileRoute } from '@tanstack/react-router';
import { Overview } from '@/features/crowdsafe/overview';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/')({head:()=>routeHead('Overview','CrowdSafe festival safety operations dashboard with simulated crowd zones, incidents, and emergency facilities.'),component:Overview});

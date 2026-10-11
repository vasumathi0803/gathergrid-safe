import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/analytics')({head:()=>routeHead('Simulation Analytics','Analyze simulated crowd levels, incident categories, status distributions, and fictional crowd-risk trends.'),component:AnalyticsPage});

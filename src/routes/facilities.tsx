import { createFileRoute } from '@tanstack/react-router';
import { FacilitiesPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/facilities')({head:()=>routeHead('Emergency Facilities','Find and filter simulated medical stations, ambulance access, emergency exits, and assembly points.'),component:FacilitiesPage});

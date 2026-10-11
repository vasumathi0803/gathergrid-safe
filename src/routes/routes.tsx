import { createFileRoute } from '@tanstack/react-router';
import { RoutesPage } from '@/features/crowdsafe/pages';
import { routeHead } from '@/features/crowdsafe/data';
export const Route=createFileRoute('/routes')({head:()=>routeHead('Evacuation Routes','Plan demonstration routes through fictional festival corridors and simulate blocked-path alternatives.'),component:RoutesPage});

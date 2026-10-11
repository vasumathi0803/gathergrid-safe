import { lazy, Suspense } from 'react';
import { ClientOnly } from '@tanstack/react-router';
import { Map } from 'lucide-react';
import type { Incident, Position } from './data';
const SiteMap=lazy(()=>import('./map'));
export function MapView(props:{incidents:Incident[];focus?:Position|undefined;filter?:string|undefined;route?:Position[]|undefined;blocked?:string[]|undefined;large?:boolean|undefined}){return <ClientOnly fallback={<div className="map-loading"><Map/>Preparing demonstration map…</div>}><Suspense fallback={<div className="map-loading"><Map/>Preparing demonstration map…</div>}><SiteMap {...props}/></Suspense></ClientOnly>;}

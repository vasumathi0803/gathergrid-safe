import { lazy, Suspense } from 'react';
import { ClientOnly } from '@tanstack/react-router';
import { Map } from 'lucide-react';
import type { Incident, Position } from './data';
const SiteMap=lazy(()=>import('./map'));
export function MapView(props:{incidents:Incident[];focus?:Position;filter?:string;route?:Position[];blocked?:string[];large?:boolean}){return <ClientOnly fallback={<div className="map-loading"><Map/>Preparing demonstration map…</div>}><Suspense fallback={<div className="map-loading"><Map/>Preparing demonstration map…</div>}><SiteMap {...props}/></Suspense></ClientOnly>;}

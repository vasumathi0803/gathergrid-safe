import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initialIncidents, type Incident } from './data';
const Store=createContext<{incidents:Incident[];addIncident:(i:Omit<Incident,'id'|'time'|'status'>)=>void;setStatus:(id:string,status:Incident['status'])=>void;reset:()=>void;storageError:boolean}|null>(null);
export function CrowdSafeProvider({children}:{children:ReactNode}){
 const [incidents,setIncidents]=useState(initialIncidents); const [ready,setReady]=useState(false); const [storageError,setStorageError]=useState(false);
 useEffect(()=>{try{ const raw=localStorage.getItem('crowdsafe-incidents-v1'); if(raw){const data=JSON.parse(raw); if(Array.isArray(data)&&data.every(i=>typeof i.id==='string'&&typeof i.location==='string'&&typeof i.description==='string'&&typeof i.time==='string'&&['New','Under Review','Resolved'].includes(i.status)&&['Low','Medium','High'].includes(i.severity)))setIncidents(data); }}catch{setStorageError(true);}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('crowdsafe-incidents-v1',JSON.stringify(incidents));}catch{setStorageError(true);}},[incidents,ready]);
 const addIncident=(i:Omit<Incident,'id'|'time'|'status'>)=>setIncidents(prev=>[{...i,id:`INC-${String(Date.now()).slice(-6)}`,time:new Date().toISOString(),status:'New'},...prev]);
 return <Store.Provider value={{incidents,addIncident,setStatus:(id,status)=>setIncidents(prev=>prev.map(i=>i.id===id?{...i,status}:i)),reset:()=>setIncidents(initialIncidents),storageError}}>{children}</Store.Provider>;
}
export function useCrowdSafe(){ const context=useContext(Store); if(!context)throw new Error('CrowdSafe provider missing'); return context; }

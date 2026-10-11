export type Risk = 'normal' | 'moderate' | 'high';
export type Position = [number, number];
export type Zone = { id: string; name: string; position: Position; risk: Risk; crowd: number; capacity: number; radius: number };
export type Facility = { id: string; name: string; location: string; type: 'Medical' | 'Ambulance' | 'Exit' | 'Assembly'; position: Position; available: boolean };
export type Incident = { id: string; location: string; type: string; severity: 'Low' | 'Medium' | 'High'; description: string; time: string; status: 'New' | 'Under Review' | 'Resolved' };
export const center: Position = [25.4295, 81.8826];
export const zones: Zone[] = [
 { id:'a',name:'Main Entrance',position:[25.4281,81.8796],risk:'normal',crowd:820,capacity:1600,radius:95 },
 { id:'b',name:'Entrance B',position:[25.4312,81.8804],risk:'high',crowd:1850,capacity:2000,radius:115 },
 { id:'c',name:'North Corridor',position:[25.4315,81.883],risk:'moderate',crowd:640,capacity:1000,radius:85 },
 { id:'d',name:'Temple Courtyard',position:[25.4298,81.8835],risk:'high',crowd:2350,capacity:2500,radius:140 },
 { id:'e',name:'East Gathering Area',position:[25.4297,81.886],risk:'normal',crowd:980,capacity:2000,radius:110 },
 { id:'f',name:'South Corridor',position:[25.4276,81.8831],risk:'normal',crowd:450,capacity:1000,radius:80 },
 { id:'g',name:'Food Court',position:[25.4277,81.8814],risk:'moderate',crowd:760,capacity:1200,radius:95 },
 { id:'h',name:'West Gathering Area',position:[25.4295,81.8806],risk:'normal',crowd:720,capacity:1600,radius:90 },
 { id:'i',name:'River Walk',position:[25.4309,81.8861],risk:'normal',crowd:560,capacity:1400,radius:80 },
 { id:'j',name:'Assembly Area',position:[25.4275,81.8851],risk:'normal',crowd:220,capacity:1800,radius:90 },
 { id:'k',name:'Exit Gate 1',position:[25.4266,81.8818],risk:'normal',crowd:310,capacity:1000,radius:65 },
 { id:'l',name:'Exit Gate 2',position:[25.4282,81.8867],risk:'normal',crowd:190,capacity:900,radius:65 },
];
export const facilities: Facility[] = [
 {id:'m1',name:'First Aid Station 1',location:'Main Entrance',type:'Medical',position:[25.4281,81.8803],available:true},
 {id:'m2',name:'Medical Zone 2',location:'North Corridor',type:'Medical',position:[25.4321,81.8827],available:true},
 {id:'m3',name:'Medical Center',location:'South Corridor',type:'Medical',position:[25.4269,81.8832],available:true},
 {id:'m4',name:'First Aid Station 4',location:'East Gathering Area',type:'Medical',position:[25.43,81.8871],available:true},
 {id:'am',name:'Ambulance Access',location:'South service road',type:'Ambulance',position:[25.4265,81.8803],available:true},
 {id:'ex1',name:'Exit Gate 1',location:'Southwest perimeter',type:'Exit',position:[25.4266,81.8818],available:true},
 {id:'ex2',name:'Exit Gate 2',location:'East perimeter',type:'Exit',position:[25.4282,81.8867],available:true},
 {id:'as',name:'Emergency Assembly Point',location:'Southeast open ground',type:'Assembly',position:[25.4275,81.8851],available:true},
];
export const initialIncidents: Incident[] = [
 {id:'INC-001',location:'Entrance B',type:'Crowd congestion',severity:'High',description:'Congestion reported near the secondary entrance. The simulated queue extends into the pedestrian corridor. A site assessment and additional crowd stewards are requested.',time:'2026-10-11T10:32:00+05:30',status:'New'},
 {id:'INC-002',location:'North Corridor',type:'Blocked route',severity:'Medium',description:'Temporary vendor equipment is obstructing part of the walking corridor. Staff review and clearance are requested in this demonstration.',time:'2026-10-11T10:24:00+05:30',status:'Under Review'},
 {id:'INC-003',location:'Medical Zone 2',type:'Medical emergency',severity:'Medium',description:'A visitor has requested medical assistance. The simulated medical team is available at Medical Zone 2. No real emergency service has been contacted.',time:'2026-10-11T10:18:00+05:30',status:'Under Review'},
];
export const riskLabels: Record<Risk,string> = {normal:'Normal',moderate:'Moderate congestion',high:'Potential high risk'};
export function incidentPosition(incident: Incident): Position | undefined { return zones.find(z=>z.name===incident.location)?.position ?? facilities.find(f=>f.name===incident.location)?.position; }
export function openIncidentCount(items: Incident[]) { return items.filter(i=>i.status!=='Resolved').length; }
export function distanceMeters(a: Position,b: Position) { const r=Math.PI/180; const dlat=(b[0]-a[0])*r, dlon=(b[1]-a[1])*r; const h=Math.sin(dlat/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dlon/2)**2; return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h)); }
export const nodes: Record<string,Position> = { west:[25.4293,81.8804],north:[25.4314,81.8826],central:[25.4293,81.8826],east:[25.4293,81.8855],south:[25.4272,81.8826],assembly:[25.4272,81.8855] };
export const corridors = [ {id:'north-central',a:'north',b:'central',name:'North Corridor'}, {id:'west-central',a:'west',b:'central',name:'West Corridor'}, {id:'central-east',a:'central',b:'east',name:'Temple–East Corridor'}, {id:'central-south',a:'central',b:'south',name:'South Corridor'}, {id:'north-west',a:'north',b:'west',name:'Northwest Bypass'}, {id:'east-assembly',a:'east',b:'assembly',name:'East Perimeter'}, {id:'south-assembly',a:'south',b:'assembly',name:'South Perimeter'} ];
export function planRoute(start: Position,end: Position,blocked:string[]): {points:Position[];distance:number} | null {
 const closest=(p:Position)=>Object.keys(nodes).reduce((best,key)=>distanceMeters(p,nodes[key])<distanceMeters(p,nodes[best])?key:best,'central');
 const source=closest(start), target=closest(end); const costs:Record<string,number>={}; const previous:Record<string,string>={}; const pending=new Set(Object.keys(nodes)); Object.keys(nodes).forEach(n=>costs[n]=Infinity); costs[source]=0;
 while(pending.size){ const next=[...pending].reduce((a,b)=>costs[a]<costs[b]?a:b); pending.delete(next); if(!Number.isFinite(costs[next])) break; if(next===target) break;
 for(const edge of corridors.filter(c=>!blocked.includes(c.id)&&(c.a===next||c.b===next))){ const neighbor=edge.a===next?edge.b:edge.a; const cost=costs[next]+distanceMeters(nodes[next],nodes[neighbor]); if(cost<costs[neighbor]){costs[neighbor]=cost;previous[neighbor]=next;} }
 }
 if(!Number.isFinite(costs[target]))return null; const path=[target]; while(path[0]!==source){ const p=previous[path[0]]; if(!p)return null; path.unshift(p); } const points=[start,...path.map(n=>nodes[n]),end]; return {points,distance:points.slice(1).reduce((sum,p,i)=>sum+distanceMeters(points[i],p),0)};
}
export function routeHead(title:string,description:string) { return {meta:[{title:`${title} | CrowdSafe`},{name:'description',content:description},{property:'og:title',content:`${title} | CrowdSafe`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }

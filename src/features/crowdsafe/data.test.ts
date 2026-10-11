import { describe, expect, it } from 'vitest';
import { zones,facilities,initialIncidents,openIncidentCount,planRoute,nodes,distanceMeters } from './data';
describe('CrowdSafe demo rules',()=>{
 it('monitors 12 zones',()=>expect(zones).toHaveLength(12));
 it('has 2 high-risk zones requiring attention',()=>expect(zones.filter(z=>z.risk==='high')).toHaveLength(2));
 it('has 4 medical stations',()=>expect(facilities.filter(f=>f.type==='Medical')).toHaveLength(4));
 it('starts with 3 open incidents',()=>expect(openIncidentCount(initialIncidents)).toBe(3));
 it('excludes resolved incidents from open count',()=>expect(openIncidentCount(initialIncidents.map((i,n)=>n===0?{...i,status:'Resolved'}:i))).toBe(2));
 it('updates open count for submitted incidents',()=>expect(openIncidentCount([...initialIncidents,{...initialIncidents[0],id:'new'}])).toBe(4));
 it('uses an alternate route when North Corridor is blocked',()=>{const direct=planRoute(nodes.north,nodes.south,[]);const alternate=planRoute(nodes.north,nodes.south,['north-central']);expect(alternate?.points).toContainEqual(nodes.west);expect(alternate?.distance).toBeGreaterThan(direct?.distance??Infinity);});
 it('reports no route when the destination is disconnected',()=>expect(planRoute(nodes.north,nodes.assembly,['east-assembly','south-assembly'])).toBeNull());
 it('calculates distance from the displayed route',()=>{const route=planRoute(nodes.north,nodes.assembly,[]);expect(route).not.toBeNull();if(!route)return;expect(route.distance).toBeCloseTo(route.points.slice(1).reduce((s,p,i)=>s+distanceMeters(route.points[i],p),0),6);});
});

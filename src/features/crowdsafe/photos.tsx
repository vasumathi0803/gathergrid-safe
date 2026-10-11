import festival from '@/assets/festival.jpg.asset.json';
import corridor from '@/assets/corridor.jpg.asset.json';
import ambulance from '@/assets/ambulance.jpg.asset.json';
export const photos={festival:festival.url,corridor:corridor.url,ambulance:ambulance.url};
export function Photo({kind,alt}:{kind:keyof typeof photos;alt:string}){return <img src={photos[kind]} alt={alt} onError={e=>{e.currentTarget.style.visibility='hidden';}}/>;}

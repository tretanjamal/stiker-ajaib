(function(g){
const W=g.WORDS,SZ=['big','small','long','short','tall'],SH=['round','square'],CL=['red','blue','yellow','green','brown','white','black'],ADJ=new Set([...Object.keys(W),...CL]);
const F=new Set(['a','an','The','is','are','and']),rank=a=>SH.includes(a)?1:CL.includes(a)?2:0,vow=w=>/^[aeiou]/.test(w);
function gErr(t){for(const x of t)if(x.length>2&&x.endsWith('s')&&ADJ.has(x.slice(0,-1)))return's';
if(t[0]==='a'||t[0]==='an'){const r=t.slice(1);if(r.length<2)return'coba';if(r.findIndex(x=>!ADJ.has(x))!==r.length-1||F.has(r[r.length-1]))return'urut';const a=r.slice(0,-1);if(t[0]!==(vow(a[0])?'an':'a'))return'art';for(let i=1;i<a.length;i++)if(rank(a[i])<rank(a[i-1]))return'ord';return null}
if(t[0]==='The'){const n=t[1];if(!n||ADJ.has(n)||F.has(n))return'urut';if(t[2]!==(/s$/.test(n)?'are':'is'))return'cop';const r=t.slice(3);if(r.length===1&&ADJ.has(r[0]))return null;if(r.length===3&&ADJ.has(r[0])&&r[1]==='and'&&ADJ.has(r[2]))return null}
return'coba'}
function mkPool(t,seed){const p=t.slice(),add=x=>{if(!p.includes(x))p.push(x)};if(t[0]==='a'||t[0]==='an')add(t[0]==='a'?'an':'a');else{add(t[2]==='is'?'are':'is');if(t.length<6)add(t[3]+'s')}
let s=seed;for(let i=p.length-1;i>0;i--){s=(s*1103515245+12345)>>>0;const j=s%(i+1);[p[i],p[j]]=[p[j],p[i]]}return p}
const apply=(R,ids)=>{const d=Object.assign({},R.dims);ids.forEach(i=>Object.assign(d,R.fx[i]));return d};
const wins=(R,d)=>Object.entries(R.win).every(([k,[o,v]])=>o==='>'?d[k]>v:o==='>='?d[k]>=v:o==='<='?d[k]<=v:d[k]<v);
const subs=(a,m)=>{const o=[[]];a.forEach(x=>o.slice().forEach(s=>s.length<m&&o.push([...s,x])));return o};
const solve=R=>subs(Object.keys(R.fx),R.max||1).filter(s=>s.length&&wins(R,apply(R,s)));
const visible=R=>Object.keys(R.fx).every(i=>JSON.stringify(apply(R,[i]))!==JSON.stringify(R.dims));
function mkListen(seed){let s=seed*7919+13;const rnd=()=>(s=(s*1664525+1013904223)>>>0)/4294967296,pick=a=>a[Math.floor(rnd()*a.length)];
const t={size:pick(['big','small']),color:pick(['red','blue','yellow','green']),shape:pick(['round','square'])},oc=pick(['red','blue','yellow','green'].filter(c=>c!==t.color));
const it=[Object.assign({ok:1},t),Object.assign({},t,{size:t.size==='big'?'small':'big'}),Object.assign({},t,{color:oc}),Object.assign({},t,{shape:t.shape==='round'?'square':'round'})];
for(let i=3;i>0;i--){const j=Math.floor(rnd()*(i+1));[it[i],it[j]]=[it[j],it[i]]}
return{say:`Can you find a ${t.size} ${t.color} ${t.shape==='round'?'ball':'box'}?`,items:it}}
const same=(a,k)=>a.join(' ')===k.join(' ')||(k.includes('and')&&a.length===k.length&&gErr(a)===null&&a.slice().sort().join()===k.slice().sort().join());
g.LOGIC={same,gErr,mkPool,apply,wins,solve,visible,mkListen,ADJ};
if(typeof module!=='undefined')module.exports=g.LOGIC;
})(typeof window!=='undefined'?window:global);

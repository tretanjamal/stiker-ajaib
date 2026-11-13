(function(){'use strict';
const $=s=>document.querySelector(s),ease={out:t=>1-Math.pow(1-t,3),io:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,back:t=>1+2.70158*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2),elastic:t=>t===0||t===1?t:Math.pow(2,-10*t)*Math.sin((t*10-.75)*2.0944)+1,lin:t=>t,in:t=>t*t};
const G=window.G={reduced:matchMedia('(prefers-reduced-motion:reduce)').matches||location.search.includes('fast=1'),music:true,sound:true,ease,k:1};
/* Preferensi (musik, suara, kurangi animasi) disimpan terpisah dari progres; aman bila localStorage diblokir. */
G.pref={get(){try{return JSON.parse(localStorage.getItem('stikersifat-pref')||'{}')}catch(e){return{}}},set(){try{localStorage.setItem('stikersifat-pref',JSON.stringify({music:G.music,sound:G.sound,reduced:G.reduced}))}catch(e){}}};
(()=>{const p=G.pref.get();if(typeof p.music==='boolean')G.music=p.music;if(typeof p.sound==='boolean')G.sound=p.sound;if(typeof p.reduced==='boolean'&&!location.search.includes('fast=1'))G.reduced=p.reduced})();
if(G.reduced)document.body.classList.add('red');
const live=new Set();let last=0;
function loop(ts){const dt=Math.min(50,ts-(last||ts));last=ts;live.forEach(a=>{a.t+=dt;const k=Math.min(1,a.t/a.d);a.f(a.e(k),k);if(k>=1){live.delete(a);a.r()}});requestAnimationFrame(loop)}
requestAnimationFrame(loop);
G.tween=(d,f,e=ease.io)=>new Promise(r=>{if(G.reduced)d=Math.max(1,d*.15);live.add({t:0,d,f,e,r})});
G.wait=d=>G.tween(d,()=>{},ease.lin);
let ac,master,mg,mt,au=null,want='',duck=0;
function A(){if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.connect(ac.destination);mg=ac.createGain();mg.gain.value=.1;mg.connect(master);master.gain.value=G.sound?1:0}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac}
G.tone=(f,d=.12,type='sine',v=.2,at=0,f2,dest)=>{if(!G.sound)return;const c=A();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+at;o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.02)};
const r=n=>Math.pow(2,n/12);
G.sfx={click:()=>G.tone(660,.06,'triangle',.15),plok:()=>G.tone(320,.14,'sine',.3,0,110),ok:()=>[523,659,784,1047].forEach((f,i)=>G.tone(f,.2,'triangle',.18,i*.09)),no:()=>G.tone(230,.22,'sine',.12,0,170),dong:i=>G.tone(330*r(i*2),.22,'square',.08),meow:()=>G.tone(750,.4,'sawtooth',.05,0,420),star:i=>G.tone(523*r(i*2),.28,'triangle',.2)};
G.duck=b=>{duck=b;if(G.cur&&G.cur())G.cur().volume=b?.12:.35;if(mg)mg.gain.setTargetAtTime(b?.03:.1,ac.currentTime,.1)};
G.startMusic=()=>{if(mt||!A())return;const n=[0,4,7,9,12,9,7,4],ch=[0,0,5,5];let i=0;mt=setInterval(()=>{if(!G.music||!G.sound||document.hidden)return;const b=ch[(i>>3)%4];G.tone(262*r(n[i%8]+b),.35,'triangle',.5,0,0,mg);if(i%8===0)G.tone(131*r(b),.9,'sine',.5,0,0,mg);i++},300)};
G.say=t=>(location.search.includes('test=1')||!G.sound)?Promise.resolve():new Promise(res=>{let done=false;const fin=()=>{if(!done){done=true;G.duck(0);res()}};try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.9;u.pitch=1.1;u.onend=u.onerror=fin;G.duck(1);speechSynthesis.speak(u);setTimeout(fin,5000)}catch(e){fin()}});
G.setSound=on=>{G.sound=on;if(master&&ac)master.gain.setTargetAtTime(on?1:0,ac.currentTime,.02);if(!on){try{speechSynthesis.cancel()}catch(e){}}G.musicToggle&&G.musicToggle();G.pref.set()};
G.save={get(){try{return JSON.parse(localStorage.getItem('stikersifat')||'{}')}catch(e){return{}}},set(o){try{localStorage.setItem('stikersifat',JSON.stringify(o))}catch(e){}}};
function fit(){const k=Math.min(innerWidth/1280,innerHeight/720);G.k=k;$('#stage').style.transform='translate(-50%,-50%) scale('+k+')'}
addEventListener('resize',fit);fit();
document.addEventListener('visibilitychange',()=>{if(document.hidden){G.cur&&G.cur()&&G.cur().pause();try{ac&&ac.suspend();speechSynthesis.cancel()}catch(e){}}else{G.resume();if(ac)ac.resume()}});
})();

(function(){const G=window.G;let au=null,want='';const vol=()=>.35;
G.cur=()=>au;G.play=(name,loop=true)=>{want=name+(loop?'':'!');if(au&&au.dataset.n===name){G.resume();return}const old=au;if(old){const v=old.volume;G.tween(500,k=>{old.volume=Math.max(0,v*(1-k))},G.ease.lin).then(()=>old.pause())}
au=new Audio(ASSETS.mus(name));const a=au;a.dataset.n=name;a.loop=loop;a.volume=0;a.onerror=()=>{if(au===a){au=null;G.startMusic()}};if(G.music&&G.sound)a.play().then(()=>{a.volume=vol()}).catch(()=>{})};
G.resume=()=>{if(au&&au.paused&&G.music&&G.sound)au.play().then(()=>{au.volume=vol()}).catch(()=>{})};G.musicToggle=()=>{if(!au)return;if(G.music&&G.sound)G.resume();else au.pause()};
addEventListener('pointerdown',()=>G.resume(),true)})();

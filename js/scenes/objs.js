(function(w){
const rc=(x,y,a,b,f,r=8)=>`<rect class="o" x="${x}" y="${y}" width="${Math.max(0,a)}" height="${Math.max(0,b)}" rx="${r}" fill="${f}"/>`,el=(x,y,a,b,f)=>`<ellipse class="o" cx="${x}" cy="${y}" rx="${Math.max(1,a)}" ry="${Math.max(1,b)}" fill="${f}"/>`,ph=(d,f,s=6)=>`<path class="o" d="${d}" fill="${f}" stroke-width="${s}"/>`;
const cab=()=>rc(70,-240,240,240,'#8A63FF',24)+rc(88,-224,204,100,'#A98BFF',14)+rc(88,-114,204,100,'#A98BFF',14)+`<image href="${ASSETS.img('prop-lemari')}" x="55" y="-251" width="270" height="251"/>`,V=(d,k,v)=>d[k]===undefined?v:d[k];
w.OBJ={
ladder:d=>{let s=cab()+rc(-d.w/2,-d.len,22,d.len,'#4FB3FF',6)+rc(d.w/2-22,-d.len,22,d.len,'#4FB3FF',6);for(let y=-30;y>-d.len+10;y-=44)s+=rc(-d.w/2,y,d.w,12,'#4FB3FF',5);return s},
ball:d=>rc(80,-200,260,140,'#8A63FF',20)+rc(80,-70,20,70,'#6B4BD6',4)+rc(320,-70,20,70,'#6B4BD6',4)+el(150,-d.h,d.w,d.h,'#FF5C8A'),
bench:d=>rc(110,-370,150,120,'#4FB3FF',16)+rc(-80,-d.h,d.w,18,'#C98A5B')+rc(-70,-d.h+18,16,d.h-18,'#C98A5B',4)+rc(d.w-90,-d.h+18,16,d.h-18,'#C98A5B',4),
car:d=>rc(170,-150,220,150,'#8A63FF',50)+rc(200,-110,160,110,'#2B2A4C',30)+rc(-d.w/2,-d.h-16,d.w,d.h,'#FF5C8A',16)+el(-d.w/3,-14,16,16,'#FFC93C')+el(d.w/3,-14,16,16,'#FFC93C'),
plate:d=>{const k=Math.min(d.wt*.2,18),g=d.wt>=60?-170:0;return rc(130,-230+g,40,230,'#8A63FF',8)+rc(-80,-12+k,160,14,'#FFC93C')+el(0,-34+k,64,28*V(d,'sq',1),'#FFF4DC')},
box:d=>rc(-65,-130+d.y,130,130,d.c||'#C98A5B',10)+rc(-10,-130+d.y,20,130,'#FFC93C',2)+rc(-195,-100+d.y,110,100,d.c||'#C98A5B',10),
eggbench:d=>{const t=70,s=d.s;let o=rc(-90,-d.h,180,18,s>0?'#FF9AC0':s<0?'#8E8E9A':'#C98A5B')+rc(-80,-d.h+18,16,d.h-18,'#C98A5B',4)+rc(64,-d.h+18,16,d.h-18,'#C98A5B',4);if(s>0)o+=el(0,-d.h-10,80,16,'#FF9AC0');if(s<0)for(let x=-60;x<=60;x+=40)o+=ph(`M${x-14} ${-d.h}l14 -30l14 30z`,'#8E8E9A',5);return o+rc(-60,-300,120,14,'#C98A5B',6)+el(0,-336,22,30,'#fff')},
bridge:d=>{const c=d.s<=.2?'#8E8E9A':'#3DDBB0',h=d.w/2;return rc(-h-90,-70,90,70,'#8A63FF')+rc(h,-70,90,70,'#8A63FF')+`<path d="M${-h} -76 Q0 ${-76+d.s*140} ${h} -76" fill="none" stroke="#2B2A4C" stroke-width="46" stroke-linecap="round"/><path d="M${-h} -76 Q0 ${-76+d.s*140} ${h} -76" fill="none" stroke="${c}" stroke-width="34" stroke-linecap="round"/>`},
river:d=>{const h=30*d.wv;let o=rc(-260,-50,130,50,'#8A63FF')+rc(130,-50,130,50,'#8A63FF')+rc(-130,-h,260,h,d.ice>=1?'#E8F7FF':'#4FB3FF',4);if(d.ice>=1)o+=ph('M-80 -30l30 -10l20 12M20 -34l40 8','none',4);if(d.ice<0)for(let x=-80;x<=80;x+=80)o+=el(x,-60,18,12,'#fff');return o},
iceblock:d=>{const s=d.ice;return s<.15?el(0,-6,90,10,'#4FB3FF')+el(0,-20,16,16,'#FFC93C'):rc(-80*s,-130*s,160*s,130*s,'#CFEAFB',16)+el(0,-50*s,16,16,'#FFC93C')},
plant:d=>{const g=d.g,c=d.frost?'#E8F7FF':g<.3?'#C98A5B':'#3DDBB0';return rc(-40,-40,80,40,'#FF9A3C')+`<path d="M0 -40 Q${g*70} ${-40-g*140} ${g*190} ${-40-g*90}" fill="none" stroke="#2B2A4C" stroke-width="22" stroke-linecap="round"/><path d="M0 -40 Q${g*70} ${-40-g*140} ${g*190} ${-40-g*90}" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>`+el(g*190,-40-g*90,14+g*22,10+g*14,c)},
bucket:d=>{let o=ph('M-50 -100L50 -100L40 0L-40 0Z','#fff')+rc(-44,-d.f*90,88,d.f*90,'#4FB3FF',4)+el(160,-90,70,70,d.f>=1?'#3DDBB0':'#FFC93C');if(d.e)o+=ph('M-20 -60q20 -20 40 0','none',4);return o},
lantern:d=>{const y=d.y;return `<circle r="${40+d.b*230}" cy="${y}" fill="#FFE066" opacity="${Math.min(.5,d.b*.5)}"/>`+rc(-26,y-30,52,60,'#FFC93C',14)+rc(-90,-12,180,12,'#8E8E9A',6)+rc(-6,y-50,12,20,'#2B2A4C',4)},
belt:d=>{const n=Math.max(1,Math.round(d.v/2));let o=rc(-170,-40+(d.sag?10:0),340,40,'#8A63FF',20)+rc(-40+Math.min(d.v,14)*8-60,-100+(d.sag?10:0),80,60,'#C98A5B',8);for(let i=1;i<=n;i++)o+=ph(`M${-170+i*340/(n+1)} -30l10 10l-10 10`,'none',5);return o},
door:d=>{const s=d.s,w=120*s,h=200*s,p=w*(1-d.o*.85);return rc(-w/2-10,-h-10,w+20,h+10,'#8A63FF')+rc(-w/2,-h,w,h,'#2B2A4C',4)+rc(-w/2,-h,p,h,'#FF9A3C',4)+(d.lock?el(-w/2+p-16,-h/2,10,10,'#FFC93C'):'')},
plank:d=>rc(-170,-60,40,60,'#8A63FF')+rc(130,-60,40,60,'#8A63FF')+rc(-d.len/2,-60-(12+d.wt*.12)+(d.wt>150?10:0),d.len,12+d.wt*.12,'#C98A5B',6)
};
})(window);

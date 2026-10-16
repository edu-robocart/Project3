// stars
(()=>{const c=document.getElementById('stars'),x=c.getContext('2d');let w,h,s=[];
function r(){w=c.width=innerWidth;h=c.height=innerHeight;s=Array.from({length:Math.round(w*h/6000)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.2,v:Math.random()*.25+.03,t:Math.random()*6}))}
function d(){x.clearRect(0,0,w,h);s.forEach(a=>{a.t+=.03;a.y+=a.v;if(a.y>h)a.y=0;x.globalAlpha=.5+.5*Math.sin(a.t);x.fillStyle=a.r>1.1?'#fccb1c':'#fff';x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill()});requestAnimationFrame(d)}
r();addEventListener('resize',r);d()})();
// menu
const m=document.querySelector('.menu');m&&m.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
// reveal + bars
const io=new IntersectionObserver(e=>e.forEach(i=>{if(i.isIntersecting){i.target.classList.add('in');i.target.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(i.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
// tabs
document.querySelectorAll('.tabs').forEach(t=>t.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{t.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const p=t.parentElement;p.querySelectorAll('.pane').forEach(x=>x.classList.toggle('on',x.id===b.dataset.t))})));
// lightbox
const lb=document.getElementById('lb');document.querySelectorAll('.fig img,details img').forEach(i=>i.addEventListener('click',()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')}));lb&&lb.addEventListener('click',()=>lb.classList.remove('on'));
// 360 viewer
const sp=document.querySelector('.spin');if(sp){const im=sp.querySelector('img'),tag=sp.querySelector('.tag'),bt=[...document.querySelectorAll('.ctrl [data-i]')];
const F=['images/IMG1.jpg','images/IMG2.jpg','images/IMG3.jpg','images/IMG4.jpg'],N=['มุมที่ 1','มุมที่ 2','มุมที่ 3','มุมที่ 4'];F.forEach(f=>new Image().src=f);
let k=0,auto=true,tm;function go(n){k=(n+4)%4;im.src=F[k];tag.textContent=N[k];bt.forEach(b=>b.classList.toggle('on',+b.dataset.i===k))}
function play(){clearInterval(tm);if(auto)tm=setInterval(()=>go(k+1),1800)}
bt.forEach(b=>b.addEventListener('click',()=>{auto=false;go(+b.dataset.i);play();ap.classList.remove('on')}));
const ap=document.getElementById('auto');ap.classList.add('on');ap.addEventListener('click',()=>{auto=!auto;ap.classList.toggle('on',auto);play()});
let sx=null,acc=0;sp.addEventListener('pointerdown',e=>{sx=e.clientX;acc=0;auto=false;ap.classList.remove('on');clearInterval(tm);sp.style.cursor='grabbing'});
addEventListener('pointerup',()=>{sx=null;sp.style.cursor='grab'});
addEventListener('pointermove',e=>{if(sx===null)return;const d=e.clientX-sx;if(Math.abs(d)>60){go(k+(d<0?1:-1));sx=e.clientX}});
go(0);play()}

(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const app=$('#app'),ghost=$('#ghost'),toast=$('#toast'),txt=$('#txt');
const BASE=['Locked Folder','Drafts'];
let notes=[],cols=[...BASE],cur='home',rec=false,tm,ed=-1,col='',tab='r',nt='n',sel=27,mode='',story=0,ch=1,playing=false,run=0,liked={};
const MAIN=['home','notes','journal','novels'];
const GR=['linear-gradient(150deg,#7a1230,#1b1030 60%,#c8943a)','linear-gradient(150deg,#1b2a4a,#6a4a8a 70%,#e0b36a)','linear-gradient(150deg,#3a1a10,#8a3a2a 60%,#2a2a3a)','linear-gradient(150deg,#10303a,#2a6a7a 60%,#d8c08a)','linear-gradient(150deg,#2a1a3a,#7a2a5a 60%,#e8a0a0)'];
const ST=['Forgive Me Never','Bound by the Stars','Twice the Vows','The Secrets of Home','Blood Debts'];
const PH=[' Research, new tools and technology are related to the project.',' Call the vendor and confirm the delivery date.',' Prepare slides for Friday’s review.'];
const R={todo:'To-do list\n• Review the file and folder structure\n• Research new tools for the project',points:'Main points\n• Files and folders were checked\n• New tools relate to the project',sum:'Summary\nFiles and folders were reviewed; new tools and research relate to the project.'};
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const say=t=>{toast.textContent=t;toast.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('on'),1500)};
const open=id=>$('#'+id).classList.add('on'),close=id=>$('#'+id).classList.remove('on'),closeAll=()=>$$('.sh').forEach(s=>s.classList.remove('on'));

function go(id){
 if(rec)stopRec();closeAll();$('#mini').classList.remove('on');cur=id;
 $$('.scr').forEach(s=>s.classList.toggle('on',s.id===id));const sc=$('#'+id);if(sc&&sc.classList.contains('scr'))sc.scrollTop=0;
 const m=MAIN.includes(id);$('#nav').classList.toggle('off',!m);$('#fab').classList.toggle('off',!(id==='home'||id==='notes'));
 $('#sBtm').style.display=id==='story'?'flex':'none';
 const ix={home:0,notes:1,journal:3,novels:4};$$('#nav button').forEach((b,i)=>b.classList.toggle('on',ix[id]===i));
 if(id==='editor'){txt.innerHTML='';$('#ttl').textContent='Untitled';ed=-1;col=''}
 if(id==='story')drawStory();
 render();
}
const card=(n,i)=>`<div class="note ${n.fresh?'new':''}" data-note="${i}" tabindex="0"><b>${esc(n.t)}</b><small>${esc(n.b)}</small><span class="pin ${n.pin?'on':''}" data-pin="${i}">📌</span></div>`;
function render(){
 const all=notes.map(card).join('')||'<p class="empty">Start transcribing to see your notes here</p>';
 const pin=notes.map((n,i)=>n.pin?card(n,i):'').join('')||'<p class="empty">Pin a note to find it here</p>';
 $('#homeList').innerHTML=tab==='r'?all:pin;
 $('#noteList').innerHTML=nt==='n'?all:cols.map((c,i)=>{const k=notes.filter(n=>n.col===c).length;return `<div class="note" data-toast="${esc(c)} · ${k} note${k==1?'':'s'}"><b>${i<2?'🔒 ':'▤ '}${esc(c)}</b><small>${k} note${k==1?'':'s'}</small></div>`}).join('');
 $('#jList').innerHTML=sel===27&&notes.length?notes.map(card).join(''):'<p class="empty">No stories created on this date</p>';
 $$('#htabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
 $$('[data-nt]').forEach(b=>b.classList.toggle('on',b.dataset.nt===nt));
 $('#week').innerHTML=['M','T','W','T','F','S','S'].map((d,i)=>{const n=i+26>31?i-5:i+26;return `<button class="${n===sel?'on':''}" data-day="${n}"><span>${d}</span><b>${n}</b></button>`}).join('');
 notes.forEach(n=>n.fresh=0);
}
// ---- voice: simulated live dictation ----
let vi=0,vw=[],vs=null;
function startRec(){if(rec)return;rec=true;$('#bar').classList.add('rec');
 vw=PH[vi++%PH.length].split(' ');vs=document.createElement('span');vs.className='v';txt.append(vs);let k=0;
 tm=setInterval(()=>{if(k<vw.length)vs.textContent+=(k?' ':'')+vw[k++];else stopRec()},320)}
function stopRec(){rec=false;clearInterval(tm);$('#bar').classList.remove('rec');if(vs)vs.classList.remove('v')}
function save(){const t=txt.innerText.trim();if(t){const ti=$('#ttl').textContent.trim();const n={t:ti&&ti!=='Untitled'?ti:t.split(/\s+/).slice(0,4).join(' ')+'…',b:t.replace(/\n/g,' '),col,pin:ed>=0&&notes[ed].pin,fresh:1};
 if(ed>=0)notes[ed]=n;else notes.unshift(n);say('Note saved')}go('home')}
// ---- stories ----
function covers(el,ids,fn){el.innerHTML=ids.map(i=>`<button data-story="${i}"><span class="cov" style="--g:${GR[i]}">${ST[i]}</span>${ST[i]}<br><span style="color:var(--ac)">♥ ${30+ST[i].length}</span></button>`).join('')}
function drawStory(){$('#sTop').style.setProperty('--g',GR[story]);$('#sT').textContent=ST[story];$('#heart').textContent=liked[story]?'♥':'♡';$('#lk').textContent=33+(liked[story]?1:0);
 $$('#stars span').forEach(s=>s.classList.remove('on'));$('#rt').textContent='Tap a star to rate';$('.st').scrollTop=0}
covers($('#shelf'),[0,1,2,3]);covers($('#shelf2'),[4,3,1,0]);covers($('#shelf3'),[2,3,4]);
$('#cats').innerHTML=['Action','Adventure','Biography','Classic','Sci‑fi'].map(c=>`<button data-toast="Showing ${c}">${c}</button>`).join('');
// ---- calendar ----
function drawCal(){$('#calG').innerHTML=['M','T','W','T','F','S','S'].map(d=>`<span>${d}</span>`).join('')+'<i></i><i></i><i></i>'+Array.from({length:31},(_,i)=>`<button class="cd ${i+1===sel?'on':''}" data-d="${i+1}">${i+1}</button>`).join('')}
$('#wave').innerHTML=$('#mw').innerHTML=$('#gw').innerHTML='<i></i>'.repeat(22);
$$('.wave i').forEach((e,i)=>e.style.animationDelay=(i*73%900)+'ms');
drawCal();

// ---- one delegated click handler ----
const A={
 recent(){notes.length?(go('editor'),openNote(0)):say('No notes yet')},
 rename(){close('menu');const t=$('#ttl');t.focus();getSelection().selectAllChildren(t)},
 addcol(){const v=$('#cin').value.trim()||'work stuff';if(!cols.includes(v))cols.push(v);col=v;$('#cin').value='';close('col');say('Note added to collection')},
 ai(e,b){mode=b.dataset.m;close('ai');open('gen');setTimeout(()=>{if(!$('#gen').classList.contains('on'))return;close('gen');$('#resT').textContent=R[mode];open('res')},2000)},
 apply(){txt.textContent=R[mode];close('res');say('AI changes applied')},
 scan(){close('scan');txt.append('\nScanned: Team meeting – Friday 4 PM');say('Text extracted')},
 mini(){$('#mini').classList.add('on')},
 ministop(){$('#mini').classList.remove('on');notes.unshift({t:'Voice note',b:'Quick voice note: call the vendor tomorrow.',col:'',fresh:1});render();say('Note saved')},
 unlock(){ch++;$('#chN').textContent='Chapter '+ch;$('#reader').scrollTop=0;say('Chapter '+ch+' unlocked')},
 comment(){const v=$('#cmi').value.trim();if(!v)return;$('#cList').innerHTML=($('#cList').querySelector('.empty')?'':$('#cList').innerHTML)+`<p style="margin:10px 0;font-size:14px"><b>User</b><br>${esc(v)}</p>`;$('#cmi').value=''},
 tapgame(){const g=A.g=A.g||{n:0,on:0};if(!g.on){g.on=1;g.n=0;$('#gT').textContent='Go!';setTimeout(()=>{g.on=0;$('#gT').textContent='Score: '+g.n+' taps in 5 s – tap to play again'},5000)}if(g.on)$('#gB').textContent='Tap! '+ ++g.n}
};
function openNote(i){ed=i;txt.textContent=notes[i].b;$('#ttl').textContent=notes[i].t;col=notes[i].col}
app.addEventListener('click',e=>{
 const q=s=>e.target.closest(s);let x;
 if(x=q('[data-pin]')){const i=+x.dataset.pin;notes[i].pin=!notes[i].pin;render();return}
 if(x=q('[data-note]')){go('editor');openNote(+x.dataset.note);return}
 if(x=q('[data-act]'))A[x.dataset.act](e,x);
 if(x=q('[data-go]'))go(x.dataset.go);
 if(x=q('[data-open]'))open(x.dataset.open);
 if(q('[data-close]')){closeAll()}
 if(e.target.classList.contains('sh'))e.target.classList.remove('on');
 if(x=q('[data-toast]'))say(x.dataset.toast);
 if(x=q('[data-tab]')){tab=x.dataset.tab;render()}
 if(x=q('[data-nt]')){nt=x.dataset.nt;render()}
 if(x=q('[data-day]')){sel=+x.dataset.day;render()}
 if(x=q('.cd')){sel=+x.dataset.d;drawCal();render();setTimeout(()=>close('cal'),250)}
 if(x=q('[data-story]')){story=+x.dataset.story;go('story')}
 if(q('[data-read]')){story=1;ch=1;$('#chN').textContent='Chapter 1';go('reader')}
 if(q('#readBtn')){ch=1;$('#chN').textContent='Chapter 1';go('reader')}
 if(q('#heart')){liked[story]=!liked[story];drawStory();if(liked[story])say('Added to favourites')}
 if(x=q('#stars span')){const k=[...x.parentNode.children].indexOf(x);$$('#stars span').forEach((s,i)=>s.classList.toggle('on',i<=k));$('#rt').textContent=(k+1)+'.0 – thanks for rating'}
 if(x=q('[data-plan]')){$$('[data-plan]').forEach(p=>{p.classList.toggle('on',p===x);p.firstChild.textContent=p===x?'●':'○'})}
 if(x=q('[data-cmd]')){txt.focus();document.execCommand(x.dataset.cmd)}
 if(q('#mic'))rec?stopRec():startRec();
 if(q('#back'))save();
 if(q('#premBtn')||q('#calBtn')){}
});
$('#replay').onclick=()=>{if(!playing)reset(),demo()};

// ---- auto demo: a ghost finger taps the real buttons ----
async function tap(sel,w=600){const el=$(sel);if(!playing||!el)return;
 el.scrollIntoView({block:'nearest',inline:'nearest'});
 const a=app.getBoundingClientRect(),r=el.getBoundingClientRect();ghost.style.opacity=.9;
 ghost.style.transform=`translate(${r.left-a.left+r.width/2}px,${r.top-a.top+r.height/2}px)`;
 await sleep(950);if(!playing)return;ghost.classList.remove('rip');void ghost.offsetWidth;ghost.classList.add('rip');
 el.classList.add('pressed');await sleep(100);el.classList.remove('pressed');el.click();await sleep(w*1.9)}
async function typeIn(sel,t){const el=$(sel);for(const c of t){if(!playing)return;el.value+=c;await sleep(100)}}
async function typeTxt(t){for(const c of t){if(!playing)return;txt.append(c);await sleep(50)}}
const S=[()=>tap('#newTile',450),()=>typeTxt('Checked existing files and folder structure.'),()=>tap('#mic',2100),()=>rec&&tap('#mic',300),
 ()=>tap('#aiBtn',450),()=>tap('.chip[data-m=todo]',1900),()=>tap('#apply',700),
 ()=>tap('#dots',400),()=>tap('#miCol',450),()=>typeIn('#cin','work stuff'),()=>tap('#csend',700),()=>tap('#back',900),
 ()=>tap('#nav [data-go=notes]',400),()=>tap('#tabC',1000),()=>tap('#nav [data-go=journal]',500),()=>tap('#calBtn',500),()=>tap('.cd[data-d="27"]',600),
 ()=>tap('#nav [data-go=novels]',500),()=>tap('#shelf [data-story="1"]',700),()=>tap('#stars span:nth-child(4)',400),()=>tap('#heart',900),()=>tap('#readBtn',1100),
 ()=>tap('[data-open=cm]',700),()=>typeIn('#cmi','Loved this chapter!'),()=>tap('[data-act=comment]',900),()=>closeAll(),()=>tap('[data-act=unlock]',900),()=>tap('#reader [data-go=story]',500),()=>tap('#story [data-go=novels]',500),
 ()=>tap('#nav [data-go=home]',500),()=>tap('#premBtn',1300),()=>closeAll()];
function reset(){notes=[];cols=[...BASE];liked={};tab='r';nt='n';sel=27;txt.innerHTML='';go('home')}
async function demo(){const my=++run;playing=true;$('#replay').innerHTML='<b>Live demo</b> · touch to take over';reset();await sleep(1800);
 for(const s of S){if(!playing||my!==run)return;await s()}
 if(playing&&my===run){await sleep(2000);demo()}}
function stop(){if(!playing)return;playing=false;run++;ghost.style.opacity=0;clearInterval(tm);rec=false;$('#bar').classList.remove('rec');$('#replay').innerHTML='<b>▶ Replay demo</b>'}
app.addEventListener('pointerdown',e=>{if(e.isTrusted&&e.target.id!=='replay')stop()},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
render();
if(matchMedia('(prefers-reduced-motion:reduce)').matches)$('#replay').innerHTML='<b>▶ Replay demo</b>';else setTimeout(demo,500);
})();

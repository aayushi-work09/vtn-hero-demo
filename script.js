(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const app=$('#app'),ghost=$('#ghost'),toast=$('#toast'),txt=$('#txt'),ttl=$('#ttl');
// ---- icons: small outline SVGs, drawn in the same style as the app ----
const I={back:'<path d="m15 18-6-6 6-6"/>',dots:'<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',cam:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',fplus:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/><path d="M12 10v6M9 13h6"/>',send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21v-1a6 6 0 0 1 12 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 6 5v2"/>',bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',srch:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',fil:'<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',chk:'<path d="M20 6 9 17l-5-5"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z"/>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',pic:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',star:'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z"/>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',bag:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',theme:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/>',stack:'<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M7 6h10M9 3h6"/>'};
const ic=(n,s=20)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
$$('[data-i]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.i,+e.dataset.s||20)));
// ---- state, real labels and data (taken from the app recording) ----
let notes=[],cols=[],cur='home',rec=false,tm,vi=0,ed=-1,col='',tab='r',nt='n',sel=29,mode='',xf='PDF',playing=false,run=0;
const MAIN=['home','notes','journal'];
const PH=[' Researched relevant tools.',' Checked project updates.',' Documented key findings.'];
const R={todo:['"To-do lists"','Project Overview','• Check project updates.','• Review project files.','','Research & Analysis','• Research relevant tools.','','Documentation','• Document key findings.'],points:['"Main points"','Project Overview','• Project files and updates were checked.','','Research & Analysis','• Relevant tools were researched.','','Documentation','• Key findings were documented.'],sum:['"Summary"','Project files were reviewed and updates checked. Relevant tools were researched and key findings documented.']};
const SET=[['General',[['user','Profile'],['theme','Theme','<b class="th" style="display:flex;gap:6px"><i></i><i></i><i></i></b>'],['spark','AI Model','Gemini 2.5 Pro ›'],['mic','Speech Language','🇮🇳 ›'],['users','Transcription Mode','▯ ›'],['globe','App Language','🇬🇧 ›'],['bell','Notifications','<b class="tg"></b>'],['bag','Change plan','Free ›']]],['Support',[['help','FAQ — Get answers'],['star','Rate us'],['send','Share the app'],['flag','Report a bug']]],['About',[['shield','Privacy Policy'],['file','Terms of service'],['info','About'],['msg','Feedback']]],['Need to leave?',[['out','Delete Account']]]];
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const say=t=>{toast.textContent=t;toast.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('on'),1600)};
const open=id=>{if(id!=='menu')close('menu');$('#'+id).classList.add('on')},close=id=>$('#'+id).classList.remove('on'),closeAll=()=>$$('.sh').forEach(s=>s.classList.remove('on'));
// ---- static pieces built from data (keeps the HTML small) ----
$('#wave').innerHTML=$('#mw').innerHTML=$('#gw').innerHTML='<i></i>'.repeat(24);$$('.wave i').forEach((e,i)=>e.style.animationDelay=(i*73%900)+'ms');
$('#menuL').innerHTML=[['edit','Rename','data-act="rename" id="m-ren"'],['folder','Add to Collection','data-open="col" id="m-col"'],['send','Share link','data-open="shr" id="m-shr"'],['dl','Export file','data-open="exp" id="m-exp"'],['trash','Delete file','data-act="del"']].map(m=>`<button ${m[2]}>${ic(m[0],18)}${m[1]}</button>`).join('');
$('#setL').innerHTML=SET.map(g=>`<div class="sgt">${g[0]}</div><div class="sg">${g[1].map(r=>`<div>${ic(r[0],20)}<span>${r[1]}</span>${r[2]?`<span>${r[2]}</span>`:'<span>›</span>'}</div>`).join('')}</div>`).join('')+'<p class="cp">©2026 VoiceToNotes Pvt. Ltd.</p>';
$('#expL').innerHTML=[['PDF','(.pdf)','Export note as PDF document','file'],['Word','(.docx)','Export note as editable document','file'],['Plain Text','(.txt)','Export note as plain text file','file']].map((x,i)=>`<button class="cr ${i?'':'on'}" data-x="${x[0]}">${ic('file',18)}<span>${x[0]} ${x[1]}<small>${x[2]}</small></span><i class="rd"></i></button>`).join('');
function drawCol(edit){$('#colL').innerHTML=(edit?`<div class="row" style="margin-top:8px"><input class="cin" id="cin" placeholder="Name your collection" aria-label="Collection name"><button class="send" id="csend" data-act="addcol" aria-label="Create">${ic('send',16)}</button></div>`:`<button class="cr w" id="newcol" data-act="newcol">＋ New collection</button>`)+['Locked Folder',...cols].map(c=>`<button class="cr" data-act="pickcol" data-c="${esc(c)}">${ic('folder',18)}${esc(c)}</button>`).join('')}
function drawCal(){$('#calG').innerHTML=['M','T','W','T','F','S','S'].map(d=>`<span>${d}</span>`).join('')+'<i></i><i></i><i></i>'+Array.from({length:31},(_,i)=>`<button class="cd ${i+1===sel?'on':''}" data-d="${i+1}">${i+1}</button>`).join('')}
// ---- screens ----
function go(id){
 if(rec)stopRec();closeAll();$('#mini').classList.remove('on');cur=id;
 $$('.scr').forEach(s=>s.classList.toggle('on',s.id===id));const sc=$('#'+id);if(sc)sc.scrollTop=0;
 $('#nav').classList.toggle('off',!MAIN.includes(id));
 $('#fab').classList.toggle('off',!(id==='home'||id==='editor'||(id==='notes'&&nt==='n')));$('#fab2').classList.toggle('off',!(id==='notes'&&nt==='c'));
 const ix={home:0,notes:1,journal:3};$$('#nav .np button').forEach((b,i)=>b.classList.toggle('on',ix[id]===i));
 if(id==='editor'){txt.innerHTML='';ttl.textContent='Untitled';ed=-1;col=''}
 render();
}
const card=(n,i)=>`<div class="note ${n.fresh?'new':''}" data-note="${i}" tabindex="0"><b>${esc(n.t)}</b><small>${esc(n.b)}</small><em>Today, 09:46</em><span class="pp">${ic('users',16)}</span></div>`;
function render(){
 const all=notes.map(card).join('');
 $('#homeList').innerHTML=tab==='r'?(all||'<p class="empty">No recent notes</p>'):'<p class="empty">No pinned notes</p>';
 $('#noteList').innerHTML=nt==='n'?(all||'<p class="empty">Start transcribing to see your notes here</p>'):`<div class="cc"><div class="note">${ic('lock',22)}<b>Locked Folder</b><small>0 notes</small></div><div class="note">${ic('stack',22)}<b>Drafts</b><small>0 notes</small></div></div>`+cols.map(c=>{const k=notes.filter(n=>n.col===c).length;return `<div class="note" style="padding-left:50px"><span style="position:absolute;left:14px;top:16px">${ic('folder',22)}</span><b>${esc(c)}</b><small>27 Oct, 04:24</small><span style="position:absolute;right:14px;top:18px;color:var(--mu);font-size:12px">${k} note${k==1?'':'s'}</span></div>`}).join('');
 $('#jList').innerHTML=sel===29&&notes.length?notes.map(card).join(''):'<p class="empty">No stories created on this date</p>';
 $('#week').innerHTML=['M','T','W','T','F','S','S'].map((d,i)=>{const n=i+26>31?i-5:i+26;return `<button class="${n===sel?'on':''}" data-day="${n}"><span>${d}</span><b>${n}</b></button>`}).join('');
 $$('#htabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));$$('[data-nt]').forEach(b=>b.classList.toggle('on',b.dataset.nt===nt));
 notes.forEach(n=>n.fresh=0);
}
// ---- voice dictation (simulated): words appear in red, then turn normal ----
let vs=null;
function startRec(){if(rec)return;rec=true;$('#bar').classList.add('rec');
 const w=PH[vi++%PH.length].trim().split(' '),d=document.createElement('div');vs=document.createElement('span');vs.className='v';d.append(vs);txt.append(d);let k=0;
 tm=setInterval(()=>{if(k<w.length)vs.textContent+=(k?' ':'')+w[k++];else stopRec()},320)}
function stopRec(){rec=false;clearInterval(tm);$('#bar').classList.remove('rec');if(vs)vs.classList.remove('v')}
function save(){const t=txt.innerText.trim();if(t){const ti=ttl.textContent.trim();const n={t:ti&&ti!=='Untitled'?ti:t.split(/\s+/).slice(0,4).join(' '),b:t.replace(/\n/g,' '),col,fresh:1};
 if(ed>=0)notes[ed]=n;else notes.unshift(n);say('Story saved')}go('home')}
function openNote(i){ed=i;txt.textContent=notes[i].b;ttl.textContent=notes[i].t;col=notes[i].col}
// ---- named actions ----
const A={
 recent(){notes.length?(go('editor'),openNote(0)):say('No notes yet')},
 rename(){close('menu');ttl.focus();getSelection().selectAllChildren(ttl)},
 del(){close('menu');say('Delete is off in this demo')},
 newcol(){drawCol(1)},
 addcol(){const v=($('#cin')||{}).value.trim()||'work stuff';if(!cols.includes(v))cols.push(v);col=v;close('col');say('Story added to collection successfully')},
 pickcol(e,b){col=b.dataset.c;close('col');say('Story added to collection successfully')},
 ai(e,b){mode=b.dataset.m;close('ai');open('gen');setTimeout(()=>{if(!$('#gen').classList.contains('on'))return;close('gen');$('#resT').textContent=R[mode].join('\n');open('res')},1500)},
 apply(){const L=R[mode].slice(1);txt.innerHTML=L.map(l=>mode==='sum'||!l||l[0]==='•'?esc(l):'<b>'+esc(l)+'</b>').join('\n');if(mode!=='sum')ttl.textContent='Project Overview';close('res');say('AI changes applied')},
 pic(){close('img');txt.insertAdjacentHTML('beforeend','<div class="pic"><b>My Favourite Lesson</b>English is not difficult</div>');say('Image uploaded successfully')},
 scan(){close('scan');txt.append('\nScanned: Team meeting – Friday 4 PM');say('Text extracted')},
 export(){close('exp');say(xf+' export ready')},
 anyone(){const t=$('#anyT');t.textContent=t.textContent==='Anyone with the link'?'Only invited people':'Anyone with the link'},
 share(){close('shr');say('Link copied to clipboard')},
 mini(){$('#mini').classList.add('on')},
 ministop(){$('#mini').classList.remove('on');notes.unshift({t:'Voice note',b:'Call the vendor and confirm the delivery date.',col:'',fresh:1});render();say('Story saved')}
};
// ---- one delegated click handler: this is what makes every component work ----
app.addEventListener('click',e=>{
 const q=s=>e.target.closest(s);let x;
 if(x=q('[data-note]')){go('editor');openNote(+x.dataset.note);return}
 if(x=q('[data-act]'))A[x.dataset.act](e,x);
 if(x=q('[data-go]'))go(x.dataset.go);
 if(x=q('[data-open]'))open(x.dataset.open);
 if(x=q('[data-toast]'))say(x.dataset.toast);
 if(q('[data-close]'))closeAll();
 if(e.target.classList.contains('sh'))e.target.classList.remove('on');
 if(x=q('[data-tab]')){tab=x.dataset.tab;render()}
 if(x=q('[data-nt]')){nt=x.dataset.nt;go('notes')}
 if(x=q('[data-day]')){sel=+x.dataset.day;render()}
 if(x=q('.cd')){sel=+x.dataset.d;drawCal();render();setTimeout(()=>close('cal'),250)}
 if(x=q('[data-x]')){xf=x.dataset.x;$$('[data-x]').forEach(b=>b.classList.toggle('on',b===x))}
 if(x=q('[data-plan]'))$$('[data-plan]').forEach(p=>{p.classList.toggle('on',p===x);p.firstChild.textContent=p===x?'●':'○'});
 if(x=q('[data-f]')){$$('[data-f]').forEach(c=>c.classList.toggle('on',c===x));const l=txt.firstElementChild;if(l&&x.dataset.f==='h')l.classList.toggle('hl')}
 if(x=q('[data-cmd]')){txt.focus();try{document.execCommand(x.dataset.cmd)}catch(_){}}
 if(q('#mic'))rec?stopRec():startRec();
 if(q('#chk'))stopRec();
 if(q('#back'))save();
 if(q('#dots')||q('#m-col'))drawCol(0);
});
// ---- auto demo: ghost finger + spotlight ring + explanation bubble ----
const ring=$('#ring'),tip=$('#tip'),prog=$('#prog');
function point(el,t,d,g=1){
 const a=app.getBoundingClientRect(),r=el.getBoundingClientRect(),x=r.left-a.left,y=r.top-a.top;
 if(g){ghost.style.opacity=.9;ghost.style.transform=`translate(${x+r.width/2}px,${y+r.height/2}px)`}
 Object.assign(ring.style,{opacity:1,left:x-5+'px',top:y-5+'px',width:r.width+10+'px',height:r.height+10+'px'});
 if(t){tip.innerHTML='<b>'+t+'</b>'+d;tip.style.opacity=1;
  const w=tip.offsetWidth,h=tip.offsetHeight,up=y>a.height*.55;
  tip.style.left=Math.max(8,Math.min(a.width-w-8,x+r.width/2-w/2))+'px';
  tip.style.top=Math.max(8,Math.min(a.height-h-8,up?y-h-14:y+r.height+14))+'px'}}
async function tap(sel,w=600,t='',d=''){const el=$(sel);if(!playing||!el)return;
 el.scrollIntoView({block:'nearest',inline:'nearest'});point(el,t,d);
 await sleep(1200);if(!playing)return;
 ghost.classList.remove('rip');void ghost.offsetWidth;ghost.classList.add('rip');
 el.classList.add('pressed');await sleep(100);el.classList.remove('pressed');ring.style.opacity=0;el.click();await sleep(w)}
async function look(sel,t,d,ms){const el=$(sel);if(!playing||!el)return;point(el,t,d,0);if(ms){await sleep(ms);ring.style.opacity=0}}
async function typeIn(sel,t){const el=$(sel);for(const c of t){if(!playing)return;el.value+=c;await sleep(70)}}
async function typeTxt(t){if(!txt.firstElementChild)txt.innerHTML='<div></div>';for(const c of t){if(!playing)return;txt.firstElementChild.append(c);await sleep(40)}}
async function typeTitle(t){ttl.textContent='';for(const c of t){if(!playing)return;ttl.textContent+=c;await sleep(80)}}
const dots=(t,d)=>tap('#dots',450,t,d);
const S=[
 ()=>tap('#newTile',600,'New Note','Start a note from the home screen.'),
 async()=>{await look('#txt','Write or speak','Type your note, or use your voice.',0);await typeTxt('Reviewed project files.');ttl.textContent='Reviewed project files';await sleep(400)},
 ()=>tap('#mic',3800,'Voice dictation','Tap the mic and speak. Your words appear live, then settle as normal text.'),
 ()=>rec?tap('#chk',500,'Done','Tap the check to finish recording.'):0,
 ()=>tap('#fmtBtn',500,'Format','Title, Heading, Bold, Italic, Underline and more.'),
 ()=>tap('.chip[data-f=h]',1000,'Heading','Style any line as a heading.'),
 ()=>closeAll(),
 ()=>tap('#aiBtn',500,'AI Text Assistant','Create to-dos, main points or a summary from your note.'),
 ()=>tap('.chip[data-m=todo]',2400,'To-do lists','Pick an action, or write your own prompt.'),
 ()=>tap('#apply',900,'Apply changes','Replace your note with the AI result.'),
 ()=>tap('#cam',500,'Insert image','Add a picture from the camera or gallery.'),
 ()=>tap('#gal',1100,'From Gallery','The image is added to your note.'),
 ()=>dots('Note options','Rename, add to collection, share, export or delete.'),
 ()=>tap('#m-ren',500,'Rename','Give your note a new title.'),
 async()=>{await typeTitle('Sample 1');say('Story updated successfully');await sleep(700)},
 ()=>dots(),
 ()=>tap('#m-col',500,'Add to Collection','Create a collection or pick an existing one.'),
 ()=>tap('#newcol',400,'New collection','Name it and tap send.'),
 ()=>typeIn('#cin','work stuff'),
 ()=>tap('#csend',1000,'Create','Your note now lives in this collection.'),
 ()=>dots(),
 ()=>tap('#m-exp',500,'Export file','Choose PDF, Word or Plain Text.'),
 ()=>tap('#xbtn',900,'Export','Your note is exported in the chosen format.'),
 ()=>dots(),
 ()=>tap('#m-shr',500,'Share link','Invite people, or share a link to the note.'),
 ()=>tap('#sbtn',1000,'Share Link','The link is copied, ready to send.'),
 ()=>tap('#back',1100,'Story saved','Going back saves the note on the home screen.'),
 ()=>tap('#nav .np button:nth-child(2)',600,'My Notes','Every note in one place.'),
 ()=>tap('#tabC',1300,'Collections','Locked Folder, Drafts and your own collections.'),
 ()=>tap('#nav .np button:nth-child(4)',600,'Daily Journal','Your notes arranged by day.'),
 ()=>tap('#calBtn',600,'Calendar','Open the month view.'),
 ()=>tap('.cd[data-d="29"]',900,'Pick a date','See what you wrote on any day.'),
 ()=>tap('#nav .np button:nth-child(1)',600,'Home','Back to the start.'),
 ()=>tap('#fab',2000,'Quick voice note','Record straight from the home screen.'),
 ()=>tap('#miniStop',900,'Stop and save','Your recording becomes a new note.'),
 ()=>tap('#gear',700,'Settings','Profile, theme, AI model, languages and more.'),
 ()=>look('#setL','Your preferences','Theme, AI model, speech and app language, notifications and plan.',2600),
 ()=>tap('#settings [data-go=home]',600,'Back','Return to the home screen.'),
 ()=>tap('#premBtn',700,'Go Premium','Compare plans and features.'),
 ()=>tap('#pro [data-plan]',600,'Choose a plan','Monthly or yearly membership.'),
 ()=>tap('#pro .big[data-close]',900,'Continue','Confirm your plan.'),
 ()=>look('#nav','Your turn','Touch the screen to try every feature yourself.',3000)];
function reset(){notes=[];cols=[];tab='r';nt='n';sel=29;txt.innerHTML='';drawCol(0);go('home')}
async function demo(){const my=++run;playing=true;$('#splash').classList.add('on');reset();$('#replay').className='demo';$('#replay').innerHTML='<i></i>Live demo';await sleep(650);$('#splash').classList.remove('on');await sleep(250);
 for(let i=0;i<S.length;i++){if(!playing||my!==run)return;
  prog.style.width=((i+1)/S.length*100)+'%';await S[i]()}
 if(playing&&my===run){tip.style.opacity=0;await sleep(2500);demo()}}
function stop(){if(!playing)return;playing=false;run++;$('#splash').classList.remove('on');ghost.style.opacity=0;ring.style.opacity=0;tip.style.opacity=0;prog.style.width=0;clearInterval(tm);rec=false;$('#bar').classList.remove('rec');$('#replay').className='demo re';$('#replay').innerHTML='▶ Replay demo'}
$('#replay').onclick=()=>{if(!playing)demo()};
app.addEventListener('pointerdown',e=>{if(e.isTrusted&&e.target.id!=='replay')stop()},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
drawCol(0);drawCal();render();
if(matchMedia('(prefers-reduced-motion:reduce)').matches){$('#replay').className='demo re';$('#replay').innerHTML='▶ Replay demo';setTimeout(()=>$('#splash').classList.remove('on'),600)}else setTimeout(demo,50);
})();

/* Dimensional Core Survival — script partagé */

// ---- Menu mobile ----
(function(){
  var burger=document.getElementById('burger');
  var links=document.getElementById('navlinks');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
  }
})();

// ---- Recherche de minerais (page minerais uniquement) ----
(function(){
  var q=document.getElementById('q');
  if(!q) return;
  var countEl=document.getElementById('count');
  var emptyEl=document.getElementById('empty');
  var sections=[].slice.call(document.querySelectorAll('section.dim'));
  var ores=[].slice.call(document.querySelectorAll('.ore'));
  var chips=[].slice.call(document.querySelectorAll('.chip'));
  var ccs=[].slice.call(document.querySelectorAll('details.cc'));

  function norm(t){return t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}

  function run(){
    var term=norm(q.value.trim());
    if(!term){
      ores.forEach(function(o){o.classList.remove('hidden');});
      chips.forEach(function(c){c.classList.remove('hidden');});
      sections.forEach(function(s){s.classList.remove('hidden');});
      ccs.forEach(function(d){d.classList.remove('hidden');});
      if(emptyEl)emptyEl.classList.add('hidden');
      if(countEl)countEl.textContent='';
      return;
    }
    var shown=0;
    ores.forEach(function(o){var m=norm(o.textContent).indexOf(term)>-1;o.classList.toggle('hidden',!m);if(m)shown++;});
    chips.forEach(function(c){var m=norm(c.textContent).indexOf(term)>-1;c.classList.toggle('hidden',!m);if(m)shown++;});
    sections.forEach(function(s){
      var vis=[].slice.call(s.querySelectorAll('.ore,.chip')).some(function(e){return !e.classList.contains('hidden');});
      s.classList.toggle('hidden',!vis);
    });
    ccs.forEach(function(d){
      var vis=[].slice.call(d.querySelectorAll('.chip')).some(function(e){return !e.classList.contains('hidden');});
      d.classList.toggle('hidden',!vis);
      if(vis)d.open=true;
    });
    if(emptyEl)emptyEl.classList.toggle('hidden',shown>0);
    if(countEl)countEl.textContent=shown+' minerai'+(shown>1?'s':'')+' trouvé'+(shown>1?'s':'');
  }
  q.addEventListener('input',run);

  // Construit la navigation par portails depuis les sections
  var nav=document.getElementById('portalnav');
  if(nav){
    sections.forEach(function(s){
      var a=document.createElement('a');
      var accent=getComputedStyle(s).getPropertyValue('--accent').trim();
      a.href='#'+s.id;a.style.setProperty('--dot',accent);
      a.innerHTML='<span class="dot"></span>'+(s.dataset.name||s.id);
      nav.appendChild(a);
    });
  }
})();

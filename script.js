/* Dimensional Core Survival — script partagé */

// ---- Menu mobile ----
(function(){
  var burger=document.getElementById('burger');
  var links=document.getElementById('navlinks');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
  }
})();

// ---- Recherche de minerais + navigation par dimension (page minerais) ----
(function(){
  var cards=[].slice.call(document.querySelectorAll('.boss-mod'));

  // Navigation par dimension (pastilles) — uniquement si #portalnav existe
  var nav=document.getElementById('portalnav');
  if(nav){
    cards.forEach(function(c){
      if(!c.dataset.name) return;
      var a=document.createElement('a');
      var accent=getComputedStyle(c).getPropertyValue('--accent').trim();
      a.href='#'+c.id; a.style.setProperty('--dot',accent);
      a.innerHTML='<span class="dot"></span>'+c.dataset.name;
      nav.appendChild(a);
    });
  }

  var q=document.getElementById('q');
  if(!q) return; // pas de recherche sur les autres pages
  var countEl=document.getElementById('count');
  var emptyEl=document.getElementById('empty');
  var drops=[].slice.call(document.querySelectorAll('details.bd'));
  var chips=[].slice.call(document.querySelectorAll('.chip'));

  function norm(t){return t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}

  function run(){
    var term=norm(q.value.trim());
    if(!term){
      drops.forEach(function(d){d.classList.remove('hidden');});
      chips.forEach(function(c){c.classList.remove('hidden');});
      cards.forEach(function(c){c.classList.remove('hidden');});
      if(emptyEl)emptyEl.classList.add('hidden');
      if(countEl)countEl.textContent='';
      return;
    }
    var shown=0;
    drops.forEach(function(d){
      var nameEl=d.querySelector('.nm');
      var hay=norm(nameEl?nameEl.textContent:d.textContent);
      var m=hay.indexOf(term)>-1;
      d.classList.toggle('hidden',!m);if(m)shown++;
    });
    chips.forEach(function(c){var m=norm(c.textContent).indexOf(term)>-1;c.classList.toggle('hidden',!m);if(m)shown++;});
    cards.forEach(function(c){
      var vis=[].slice.call(c.querySelectorAll('details.bd,.chip')).some(function(e){return !e.classList.contains('hidden');});
      c.classList.toggle('hidden',!vis);
    });
    if(emptyEl)emptyEl.classList.toggle('hidden',shown>0);
    if(countEl)countEl.textContent=shown+' résultat'+(shown>1?'s':'');
  }
  q.addEventListener('input',run);
})();

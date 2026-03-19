/* ==============================================
   SHEYILAW COMPUTER INSTITUTE — script.js
   ============================================== */

var WA_NUMBER = '2348169381248';

/* ---------- WhatsApp form sender ---------- */
function sendToWhatsApp(fields, formType) {
  var msg = '*' + formType + ' \u2014 Sheyilaw Computer Institute*\n\n';
  fields.forEach(function(f){ if(f.value) msg += '*' + f.label + ':* ' + f.value + '\n'; });
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ---------- Theme: apply before first paint ---------- */
(function(){
  var saved = localStorage.getItem('sheyilaw-theme') || 'red';
  document.documentElement.setAttribute('data-theme', saved);
})();

/* ---------- Theme toggle ---------- */
function updateAllToggles(theme) {
  document.querySelectorAll('.theme-toggle').forEach(function(toggle){
    var sun  = toggle.querySelector('.tt-sun');
    var moon = toggle.querySelector('.tt-moon');
    if(!sun || !moon) return;
    if(theme === 'red'){
      sun.classList.add('active');
      moon.classList.remove('active');
      toggle.title = 'Switch to Dark theme';
    } else {
      moon.classList.add('active');
      sun.classList.remove('active');
      toggle.title = 'Switch to Red theme';
    }
  });
}

function initThemeToggles() {
  var current = document.documentElement.getAttribute('data-theme') || 'red';
  updateAllToggles(current);
  document.querySelectorAll('.theme-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(){
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'red' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sheyilaw-theme', next);
      updateAllToggles(next);
    });
  });
}

/* ---------- DOM ready ---------- */
document.addEventListener('DOMContentLoaded', function(){

  initThemeToggles();

  /* Custom cursor */
  var cur = document.getElementById('cur'), ring = document.getElementById('ring');
  if(cur && ring){
    var mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
    (function tick(){
      cur.style.left=mx+'px'; cur.style.top=my+'px';
      rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a,button,.svc,.cc,.wc,.ic').forEach(function(el){
      el.addEventListener('mouseenter',function(){ cur.classList.add('big'); ring.classList.add('big'); });
      el.addEventListener('mouseleave',function(){ cur.classList.remove('big'); ring.classList.remove('big'); });
    });
  }

  /* Navbar shrink on scroll */
  var nb = document.getElementById('nb');
  if(nb) window.addEventListener('scroll', function(){ nb.classList.toggle('sc', window.scrollY>60); });

  /* Active nav link */
  var pg = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nlinks a').forEach(function(a){
    if(a.getAttribute('href')===pg) a.classList.add('act');
  });

  /* Mobile menu */
  var hbg=document.getElementById('hbg'), mm=document.getElementById('mm');
  if(hbg && mm){
    hbg.addEventListener('click',function(){
      hbg.classList.toggle('op'); mm.classList.toggle('op');
      document.body.style.overflow = mm.classList.contains('op') ? 'hidden' : '';
    });
    mm.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){ hbg.classList.remove('op'); mm.classList.remove('op'); document.body.style.overflow=''; });
    });
  }

  /* Reveal on scroll */
  var revs = document.querySelectorAll('.reveal,.rl,.rr');
  if(revs.length && 'IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e,i){
        if(e.isIntersecting){
          var delay = parseInt(e.target.dataset.d||0) || i%5*100;
          setTimeout(function(){ e.target.classList.add('on'); }, delay);
          ro.unobserve(e.target);
        }
      });
    },{threshold:.08});
    revs.forEach(function(el){ ro.observe(el); });
  }

  /* Accordion */
  document.querySelectorAll('.ach').forEach(function(h){
    h.addEventListener('click',function(){
      var it=h.parentElement, op=it.classList.contains('op');
      document.querySelectorAll('.aci.op').forEach(function(i){ i.classList.remove('op'); });
      if(!op) it.classList.add('op');
    });
  });

  /* Training apply modal */
  var ov=document.getElementById('ov'), mod=document.getElementById('mod');
  function openModal(course){
    if(!mod) return;
    var s=document.getElementById('mCourse');
    if(s && course) s.value=course;
    mod.classList.add('op'); if(ov) ov.classList.add('op');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    if(mod) mod.classList.remove('op');
    if(ov) ov.classList.remove('op');
    document.body.style.overflow='';
  }
  document.querySelectorAll('.om').forEach(function(b){
    b.addEventListener('click',function(e){ e.preventDefault(); openModal(b.dataset.course||''); });
  });
  document.querySelectorAll('.cm').forEach(function(b){ b.addEventListener('click',closeModal); });
  if(ov) ov.addEventListener('click',closeModal);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeModal(); });

  /* ---- Wire ALL forms to WhatsApp ---- */
  function wireForm(id, labels, formType){
    var form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var inputs = form.querySelectorAll('input,select,textarea');
      var fields = [];
      inputs.forEach(function(inp,i){
        if(inp.value) fields.push({label: labels[i] || 'Field', value: inp.value});
      });
      sendToWhatsApp(fields, formType);
      var b = form.querySelector('[type=submit]');
      var orig = b.textContent;
      b.textContent = 'Sent to WhatsApp \u2713';
      b.style.opacity = '.7';
      b.disabled = true;
      var sb = document.getElementById('sb');
      if(sb) sb.classList.add('on');
      setTimeout(function(){
        b.textContent = orig;
        b.style.opacity = '';
        b.disabled = false;
        if(sb) sb.classList.remove('on');
      }, 4000);
    });
  }

  wireForm('af',   ['First Name','Last Name','Phone Number','Course','Preferred Schedule','Message'], 'Training Application');
  wireForm('af2',  ['First Name','Last Name','Phone Number','Course','Preferred Schedule'],           'Training Application');
  wireForm('cf',   ['First Name','Last Name','Phone Number','Email','Service Needed','Message'],      'Contact / Enquiry');
  wireForm('admf', ['Full Name','Phone Number','Email','Exam Type','School of Choice','Message'],     'Admission Enquiry');
});

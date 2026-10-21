(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  var money = function (n) { return fmt.format(n).replace(/\u00a0/g, ' '); };

  var CATS = window.CATEGORIAS, LIST = window.PRODUCTOS, WA = window.WHATSAPP, P = {}, CAT = {};
  LIST.forEach(function (p) { P[p.id] = p; });
  CATS.forEach(function (c) { CAT[c.id] = c.nombre; });

  var filtro = 'todos', cart = {}, cur = null, sel = 0, qty = 1, pushed = false;
  try { cart = JSON.parse(localStorage.getItem('vc-pedido') || '{}'); } catch (e) { cart = {}; }
  Object.keys(cart).forEach(function (k) {
    var a = k.split('|');
    if (!P[a[0]] || !P[a[0]].pres[a[1]]) delete cart[k];
  });
  function save() { try { localStorage.setItem('vc-pedido', JSON.stringify(cart)); } catch (e) {} }
  function desde(p) { return Math.min.apply(null, p.pres.map(function (x) { return x.p; })); }

  /* ---------- Navegación ---------- */
  var burger = $('.burger'), nav = $('#menu');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });
  if ('IntersectionObserver' in window) {
    var links = $$('nav a[href^="#"]');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id], main .hero[id], main .lema[id]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Galería ---------- */
  function renderFiltros() {
    var box = $('#filtros'); box.innerHTML = '';
    CATS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = c.nombre;
      b.setAttribute('aria-pressed', c.id === filtro);
      b.onclick = function () { filtro = c.id; renderFiltros(); renderGaleria(); };
      box.appendChild(b);
    });
  }
  function renderGaleria() {
    var items = LIST.filter(function (p) { return filtro === 'todos' || p.cat === filtro; });
    $('#galeria').innerHTML = items.map(function (p) {
      return '<a class="card" href="#producto/' + p.id + '" data-id="' + p.id + '">' +
        '<img src="' + p.img + '" alt="' + p.alt + '" loading="lazy">' +
        '<span class="info"><small>' + CAT[p.cat] + '</small><h3>' + p.nombre + '</h3>' +
        '<span class="desde">Desde <b>' + money(desde(p)) + '</b></span></span></a>';
    }).join('');
    $('#conteo').textContent = items.length + (items.length === 1 ? ' producto' : ' productos');
  }
  $('#galeria').addEventListener('click', function (e) {
    var a = e.target.closest('.card');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault(); abrir(a.dataset.id);
  });

  /* ---------- Ficha de producto (con precios) ---------- */
  var dlg = $('#producto');
  function abrir(id) {
    if (!P[id]) return;
    history.pushState({ p: id }, '', '#producto/' + id); pushed = true;
    mostrar(id);
  }
  function mostrar(id) {
    cur = P[id]; sel = 0; qty = 1;
    var img = $('#pm-img'); img.src = cur.img; img.alt = cur.alt;
    $('#pm-cat').textContent = CAT[cur.cat];
    $('#pm-nombre').textContent = cur.nombre;
    $('#pm-desc').textContent = cur.desc;
    $('#pm-pres').innerHTML = cur.pres.map(function (x, i) {
      return '<label class="opt"><input type="radio" name="pres" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' +
        '<span>' + x.n + '<small>' + x.d + '</small></span><b>' + money(x.p) + '</b></label>';
    }).join('');
    $('#pm-qty').textContent = qty;
    totales();
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }
  function totales() {
    var x = cur.pres[sel], t = x.p * qty;
    $('#pm-total').textContent = money(t);
    var m = 'Hola Velvet Crumb Bakery, quiero pedir:\n- ' + qty + ' x ' + cur.nombre + ' (' + x.n + ') — ' + money(t) +
      '\n¿Me confirman disponibilidad y entrega? Gracias.';
    $('#pm-wa').href = 'https://wa.me/' + WA[0].numero + '?text=' + encodeURIComponent(m);
  }
  $('#pm-pres').addEventListener('change', function (e) { sel = +e.target.value; totales(); });
  $('#pm-menos').onclick = function () { if (qty > 1) { qty--; $('#pm-qty').textContent = qty; totales(); } };
  $('#pm-mas').onclick = function () { if (qty < 50) { qty++; $('#pm-qty').textContent = qty; totales(); } };
  $('#pm-add').onclick = function () {
    var k = cur.id + '|' + sel;
    cart[k] = (cart[k] || 0) + qty; save(); renderCart();
    toast(cur.nombre + ' agregado al pedido'); cerrar();
  };
  function cerrar() {
    if (!dlg.open) return;
    if (pushed) { pushed = false; history.back(); }
    else { dlg.close(); history.replaceState(null, '', location.pathname + location.search); }
  }
  $('#pm-x').onclick = cerrar;
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); cerrar(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) cerrar(); });
  function route() {
    var m = location.hash.match(/^#producto\/(.+)$/);
    if (m && P[m[1]]) mostrar(m[1]); else if (dlg.open) dlg.close();
  }
  window.addEventListener('popstate', route);

  /* ---------- Pedido ---------- */
  var dr = $('#drawer'), sh = $('#shade');
  function drawer(o) {
    dr.classList.toggle('open', o); sh.classList.toggle('open', o);
    dr.setAttribute('aria-hidden', !o); dr.inert = !o;
    if (o) $('#close').focus(); else $('#fab').focus();
  }
  function renderCart() {
    var ks = Object.keys(cart), n = 0, total = 0, ul = $('#items'); ul.innerHTML = '';
    ks.forEach(function (k) {
      var a = k.split('|'), p = P[a[0]], x = p.pres[a[1]], q = cart[k], li = document.createElement('li');
      n += q; total += x.p * q;
      li.innerHTML = '<div class="it"><b></b><small></small></div><div class="q"><button type="button" aria-label="Quitar uno">&minus;</button><b>' +
        q + '</b><button type="button" aria-label="Añadir uno">+</button></div><span class="lt">' + money(x.p * q) + '</span>';
      $('.it b', li).textContent = p.nombre;
      $('.it small', li).textContent = x.n + ' · ' + money(x.p) + ' c/u';
      var b = $$('.q button', li);
      b[0].onclick = function () { if (--cart[k] < 1) delete cart[k]; save(); renderCart(); };
      b[1].onclick = function () { cart[k]++; save(); renderCart(); };
      ul.appendChild(li);
    });
    if (!ks.length) ul.innerHTML = '<li class="empty">Tu pedido está vacío. Explora los productos y agrégalos aquí.</li>';
    $('#cnt').textContent = n; $('#total').textContent = money(total);
    var a = $('#send');
    if (!ks.length) { a.setAttribute('aria-disabled', 'true'); a.href = '#'; return; }
    var m = 'Hola Velvet Crumb Bakery, quiero hacer este pedido:\n' + ks.map(function (k) {
      var s = k.split('|'), p = P[s[0]], x = p.pres[s[1]];
      return '- ' + cart[k] + ' x ' + p.nombre + ' (' + x.n + ') — ' + money(x.p * cart[k]);
    }).join('\n') + '\nTotal: ' + money(total) + '\n¿Me confirman disponibilidad y entrega? Gracias.';
    a.href = 'https://wa.me/' + $('#num').value + '?text=' + encodeURIComponent(m);
    a.removeAttribute('aria-disabled');
  }
  $('#num').innerHTML = WA.map(function (w) { return '<option value="' + w.numero + '">' + w.etiqueta + '</option>'; }).join('');
  $('#num').onchange = renderCart;
  $('#fab').onclick = function () { drawer(true); };
  $('#close').onclick = sh.onclick = function () { drawer(false); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dr.classList.contains('open')) drawer(false); });

  var tt;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  dr.inert = true;
  renderFiltros(); renderGaleria(); renderCart(); route();
})();

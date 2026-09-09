(function () {
  'use strict';

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  /* ---------- demo de digitação no hero ---------- */
  var boxesEl = document.querySelector('[data-demo-boxes]');
  if (!boxesEl) return;

  var clockEl = document.querySelector('[data-demo-clock]');
  var wpmEl = document.querySelector('[data-demo-wpm]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PALAVRAS = ['CARRO', 'VERDE', 'NOITE', 'TIGRE', 'PONTE', 'LIVRO'];
  var indiceP = 0;
  var indiceLetra = 0;
  var tempo = 60;
  var acertos = 0;

  function montarCaixas(palavra) {
    boxesEl.innerHTML = '';
    for (var i = 0; i < palavra.length; i++) {
      var box = document.createElement('div');
      box.className = 'demo-box';
      boxesEl.appendChild(box);
    }
  }

  function passo() {
    var palavra = PALAVRAS[indiceP];
    var caixas = boxesEl.children;

    if (indiceLetra < palavra.length) {
      caixas[indiceLetra].textContent = palavra[indiceLetra];
      caixas[indiceLetra].classList.add('filled');
      indiceLetra++;
      setTimeout(passo, 140);
      return;
    }

    acertos++;
    if (wpmEl) wpmEl.textContent = Math.min(99, 24 + acertos * 6) + ' PPM';

    tempo -= 4;
    if (tempo <= 0) tempo = 60;
    if (clockEl) clockEl.textContent = tempo;

    setTimeout(function () {
      indiceP = (indiceP + 1) % PALAVRAS.length;
      indiceLetra = 0;
      montarCaixas(PALAVRAS[indiceP]);
      setTimeout(passo, 220);
    }, 650);
  }

  montarCaixas(PALAVRAS[indiceP]);

  if (!reduced) {
    setTimeout(passo, 500);
  } else {
    // Respeita "reduzir movimento": mostra a palavra já completa, parada.
    var palavraEstatica = PALAVRAS[0];
    for (var i = 0; i < palavraEstatica.length; i++) {
      boxesEl.children[i].textContent = palavraEstatica[i];
      boxesEl.children[i].classList.add('filled');
    }
  }
})();

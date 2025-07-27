function mostrarSessao(id) {
  const secoes = document.querySelectorAll(".sessao");
  secoes.forEach((secao) => secao.classList.remove("active"));

  const secaoAtiva = document.getElementById(id);
  if (secaoAtiva) {
    secaoAtiva.classList.add("active");
  }
}

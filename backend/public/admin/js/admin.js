const navbar = document.getElementById('navbar');
const content = document.getElementById('content');

navbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    navbar.querySelectorAll('a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const module = link.dataset.module;
    const html = await fetch(`${module}.html`).then(res => res.text());
    content.innerHTML = html;
    const script = document.createElement('script');
    script.src = `${module}.js`;
    content.appendChild(script);
  });
});

function loadModule(htmlFile, jsFile) {
  const content = document.getElementById('main-content');

  fetch(htmlFile)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;

      if (jsFile) {
        const existingScript = document.getElementById('module-script');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = jsFile;
        script.id = 'module-script';
        // Ejecutar después de agregar
        script.onload = () => {
          if (typeof initModule === 'function') initModule();
        };
        document.body.appendChild(script);
      }
    })
    .catch(err => {
      content.innerHTML = `<p>Error cargando el módulo: ${err.message}</p>`;
    });
}
   function cerrarSesion() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
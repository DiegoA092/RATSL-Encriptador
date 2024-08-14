const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

function imprimirTexto(target, content, delay = 5)
{
  return new Promise((resolve) => {
    const contentArray = content.split('');
    let current = 0;

    while (current < contentArray.length) {
      ;((curr) => {
        setTimeout(() => {
          target.innerHTML += contentArray[curr];
          window.scrollTo(0, document.body.scrollHeight);
          if (curr === contentArray.length - 1) {
            resolve();
          }
        }, delay * curr)
      })(current++);
    }
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  const asciiTexto = document.getElementById('bienvenida_titulo');
  const asciiArt = asciiTexto.innerText;
  asciiTexto.innerHTML = '';
  const mensaje = document.getElementById('bienvenida_titulo_mensaje');
  const prompt = document.getElementById('prompt');
  const cursor = document.getElementById('cursor');
  
  await wait(1000);
  await imprimirTexto(asciiTexto, asciiArt);
  await wait(500);
  await imprimirTexto(mensaje, `Presiona enter para iniciar`);
  prompt.prepend('>');
  cursor.innerHTML = '_';
  document.addEventListener('keydown', (e) => presionarEnter(e));
  document.addEventListener('touchstart', () => presionarEnter({ key: 'Enter' }));
})

function presionarEnter(e)
{ 
  function enfocarEntrada() {
    const elements = ['INPUT', 'TEXTAREA', 'BUTTON'];
    return elements.indexOf(document.activeElement.tagName) === -1;
  }
  
  if (e.key === 'Enter' && enfocarEntrada()) {
    window.location.href = 'paginaCarga.html';
    }
  }  
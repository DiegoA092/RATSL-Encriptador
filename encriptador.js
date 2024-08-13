const textoEntrada = document.querySelector('.encriptador_proceso_entrada_texto');
const textoSalida = document.querySelector('.encriptador_proceso_salida_texto');
const botonEncriptar = document.getElementById('botonEncriptar');
const botonDesencriptar = document.getElementById('botonDesencriptar');
const botonesSeleccion = [botonEncriptar, botonDesencriptar];
const barraProgreso = document.getElementById('encriptador_proceso_salida_progreso_llenado');
const copyButton = document.querySelector('.encriptador_proceso_salida_botoncopiar');

condicionesIniciales();

botonesSeleccion.forEach(botonSeleccion => {
    botonSeleccion.addEventListener('click', e => {
        let button = e.currentTarget;
        if (!button.classList.contains('selected')) {
            botonesSeleccion.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            botonLimpiar();
        }
    });
});

function botonProcesar() {
    const inputText = textoEntrada.value;
    const mayus = /[A-Z]/g;
    const carEspeciales = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúàèìòù']/g;

    barraProgreso.style.backgroundColor = 'hsl(154, 90%, 50%)';
    barraProgreso.textContent = '';
    barraProgreso.style.width = '0%';
    ocultarASCII();

    if (botonEncriptar.classList.contains('selected')) {
        if (inputText.match(mayus) || inputText.match(carEspeciales)) {
            document.getElementById('proceso_error_ascii').style.display = 'block';
            if (inputText.match(mayus)) {
                barraProgreso.style.backgroundColor = 'hsl(0, 94%, 49%)';
                barraProgreso.textContent = 'Mayusculas detectadas';
                barraProgreso.style.width = '100%';
            }
            else if (inputText.match(carEspeciales)) {
                barraProgreso.style.backgroundColor = 'hsl(0, 94%, 49%)';
                barraProgreso.textContent = 'Car. especiales detectados';
                barraProgreso.style.width = '100%';
            }
        }
        else if (inputText.length === 0 || inputText.length > 500) {
            document.getElementById('proceso_alerta_ascii').style.display = 'block';
            if (inputText.length === 0) {
                barraProgreso.style.backgroundColor = 'hsl(44, 90%, 50%)';
                barraProgreso.textContent = 'Introduce texto';
                barraProgreso.style.width = '100%';
            }
            else if (inputText.length > 500) {
                barraProgreso.style.backgroundColor = 'hsl(44, 90%, 50%)';
                barraProgreso.textContent = 'max. 500 caracteres';
                barraProgreso.style.width = '100%';
            }
        }
        else {
            const textoEncriptado = encriptar(inputText);
            impresionDeTexto(textoEncriptado, 'encrypt');
            document.getElementById('proceso_encriptar_ascii').style.display = 'block';
        }

    } else if (botonDesencriptar.classList.contains('selected')) {
        if (inputText.match(mayus) || inputText.match(carEspeciales)) {
            document.getElementById('proceso_error_ascii').style.display = 'block'; // Show error <pre>
            if (inputText.match(mayus)) {
                barraProgreso.style.backgroundColor = 'hsl(0, 94%, 49%)';
                barraProgreso.textContent = 'Mayusculas detectadas';
                barraProgreso.style.width = '100%';
            }
            else if (inputText.match(carEspeciales)) {
                barraProgreso.style.backgroundColor = 'hsl(0, 94%, 49%)';
                barraProgreso.textContent = 'Car. especiales detectados';
                barraProgreso.style.width = '100%';
            }
        }
        else if (inputText.length === 0) {
            document.getElementById('proceso_alerta_ascii').style.display = 'block';
            barraProgreso.style.backgroundColor = 'hsl(44, 90%, 50%)';
            barraProgreso.textContent = 'Introduce texto';
            barraProgreso.style.width = '100%';
        }
        else {
            const textoDesencriptado = desencriptar(inputText);
            impresionDeTexto(textoDesencriptado, 'decrypt');
            document.getElementById('proceso_desencriptar_ascii').style.display = 'block';
        }
    }
}

function botonLimpiar() {

    textoEntrada.value = '';
    textoSalida.value = '[Ningun mensaje encontrado]';
    barraProgreso.style.width = '0%';
    barraProgreso.textContent = '';
    copyButton.style.display = 'none';
    ocultarASCII();
    if (botonEncriptar.classList.contains('selected')) {
        document.getElementById('proceso_encriptar_ascii').style.display = 'block';
    } 
    else if (botonDesencriptar.classList.contains('selected')) {
        document.getElementById('proceso_desencriptar_ascii').style.display = 'block'; 
    }
}

function botonCopiar() {
    const textoCopiado = textoSalida.value;
    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            barraProgreso.textContent = 'Texto copiado';
            ocultarASCII();
            document.getElementById('proceso_copiar_ascii').style.display = 'block';
        })
        .catch(error => {
            alert("¡Opps! Ocurrió un error al copiar.");
        });
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function condicionesIniciales() {
    botonEncriptar.classList.add('selected');
    botonLimpiar();
}

function impresionDeTexto(text, mode) {
    textoSalida.value = '';
    let index = 0;
    let length = text.length;

    copyButton.style.display = 'none';

    function typeWriter() {
        if (index < length) {
            textoSalida.value += text.charAt(index);
            index++;
            let progress = (index / length) * 100;
            barraProgreso.style.width = progress + '%';
            barraProgreso.textContent = Math.floor(progress) + '%'; 
            setTimeout(typeWriter, 30); 
        } else {
            barraProgreso.textContent = mode === 'encrypt' ? 'Encriptacion completa' : 'Desencriptacion completa';
            copyButton.style.display = 'block'; 
        }
    }
    typeWriter();
}

function ocultarASCII() {
    document.querySelectorAll('.encriptador_proceso_accion_imagen').forEach(pre => pre.style.display = 'none');
}
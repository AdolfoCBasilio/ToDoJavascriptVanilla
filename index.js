
// busqueda de elementos en el DOM
const divTareas = document.querySelector('.contenedorTareasPendientes');
const selectorTareas = document.querySelector('.selectorTareas');
const tituloPendientes = document.querySelector('#tituloPendientes')
const formulario = document.querySelector('.contenedorAgregarTareas')
const input = document.querySelector('input');

let elementosDB = []
let nuevaBD = []

// click sobre tareas
divTareas.addEventListener('click', (e) => {
    let tipoBtn = e.target.alt
    let txtDiv = e.path[2].innerText
    if (tipoBtn === 'realizado') {
        finalizarTarea(txtDiv)
    }
    if (tipoBtn === 'eliminar') {
        eliminarTarea(txtDiv)
        pintarDB()
    }
})

// envio de tarea nueva
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input.value == '') {
        elementosDB.push({ tarea: input.value, estado: 'pendiente' })
        agregarTarea()
        const nuevoDiv = document.createElement('div');
        selectorTareas.appendChild(nuevoDiv);
        elementosDB.forEach((elemento) => {
            nuevoDiv.innerHTML = generarDiv(elemento)
            selectorTareas.appendChild(nuevoDiv);
            input.value = ''
        });
    }
})

const agregarTarea = () => {
    localStorage.setItem('tareas', JSON.stringify(elementosDB))
}

const eliminarTarea = (tarea) => {
    let indexArray;
    elementosDB.forEach((elemento, index) => {
        if (elemento.tarea === tarea) {
            indexArray = index;
        }
    });
    elementosDB.splice(indexArray, 1);
    agregarTarea()
}

const finalizarTarea = (tarea) => {
    console.log('vamó a finalizar: ', tarea)
}

const generarDiv = (elemento) => {
    return (`<div class="componenteTarea"><h2>${elemento.tarea}</h2><div><img src="./src/imagens/cheque.png" alt="realizado"><img src="./src/imagens/cancelar.png" alt="eliminar"></div></div>`)
}

const pintarDB = () => {
    selectorTareas.innerHTML = ''
    nuevaBD = JSON.parse(localStorage.getItem('tareas'))
    if (nuevaBD === null) {
        elementosDB = [];
    } else {
        elementosDB = JSON.parse(localStorage.getItem('tareas'))
        elementosDB.forEach(elemento => {
            const nuevoDiv = document.createElement('div');
            selectorTareas.appendChild(nuevoDiv);
            nuevoDiv.innerHTML = generarDiv(elemento)
            selectorTareas.appendChild(nuevoDiv);
            input.value = ''
        });
    }
    return
}

document.addEventListener('DOMContentLoaded', pintarDB())
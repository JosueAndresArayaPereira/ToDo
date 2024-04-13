let urlActual = window.location.href;
let params = new URLSearchParams(new URL(urlActual).search);
let idTarea = params.get('id');
console.log("ID de la tarea:", idTarea);



var tareas = [];

function Cargar() {
    let datosRecuperados = localStorage.getItem("tareas-lista")
    if (datosRecuperados) {
        let datos = JSON.parse(datosRecuperados);
        tareas = datos.listaTareas;
        console.log(tareas);
        
        for (let i = 0; i < tareas.length; i++) {
            let tarea_actual = tareas[i];
            if (idTarea == tarea_actual.id) {
                console.log(tarea_actual.nombre);
                let nombreElement = document.getElementById('entrada-nombre');
                let fechaElement = document.getElementById('entrada-fecha');
                let descripcionElement = document.getElementById('entrada-descripcion');
                let estadoElementCompletado = document.getElementById('estado-tarea-completado');
                let estadoElementIncompleto = document.getElementById('estado-tarea-incompleto');
                nombreElement.value = tarea_actual.nombre;
                fechaElement.value = tarea_actual.fecha;
                descripcionElement.value = tarea_actual.descripcion;
                if (tarea_actual.estado) {
                    estadoElementCompletado.checked = true;
                } else {
                    estadoElementIncompleto.checked = true;
                }
                break;
            }
        }
    }
}
let formulario = document.getElementById('formulario-tarea');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let urlActual = window.location.href;
    let params = new URLSearchParams(new URL(urlActual).search);
    let idTarea = params.get('id');

    ModificarTarea(idTarea);
});
function ModificarTarea(id) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        let nuevoNombre = document.getElementById('entrada-nombre').value;
        let nuevaFecha = document.getElementById('entrada-fecha').value;
        let nuevaDescripcion = document.getElementById('entrada-descripcion').value;
        let nuevoEstado = document.getElementById('estado-tarea-incompleto').checked;

        tarea.nombre = nuevoNombre || tarea.nombre;
        tarea.fecha = nuevaFecha || tarea.fecha;
        tarea.descripcion = nuevaDescripcion || tarea.descripcion;
        tarea.estado = nuevoEstado ? false : true;
        
        Guardar();

        return tarea;
    } else {
        return null;
    }
}
function EliminarTarea(){
    for(let i = 0 ; i < tareas.length;i++){
        if(tareas[i].id == idTarea){
            tareas.splice(i,1)
        }
    }
    Guardar();
}
function Guardar(){
    let datos = {
        listaTareas: tareas
    };
    let datosJSON = JSON.stringify(datos);
    localStorage.setItem("tareas-lista",datosJSON)
    window.location.href = "../pages/TareasVista.html";
}

Cargar();

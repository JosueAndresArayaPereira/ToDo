function Tarea(nombre, fecha, descripcion, estado) {
    this.nombre = nombre || "";
    this.fecha = fecha || "";
    this.descripcion = descripcion || "";
    this.id = new Date();
    this.estado = estado || false;
}

var tareas = [];

let formulario = document.getElementById('formulario-tarea');
formulario.addEventListener("submit", AgregarTarea)

function AgregarTarea(){
    let nombre = document.getElementById('entrada-nombre').value;
    let fecha = document.getElementById('entrada-fecha').value;
    let descripcion = document.getElementById('entrada-descripcion').value;


    let tarea = new Tarea(nombre, fecha, descripcion);

    tareas.push(tarea);
    console.log(tareas)
    Guardar();
}
function Guardar(){
    let datos = {
        listaTareas: tareas
    };
    let datosJSON = JSON.stringify(datos);
    localStorage.setItem("tareas-lista",datosJSON)
}
function Cargar(){
    let datosRecuperados = localStorage.getItem("tareas-lista")
    if(datosRecuperados){
        let datos = JSON.parse(datosRecuperados);
        tareas = datos.listaTareas;
    }
}
//Guardar()
Cargar();
console.log(tareas)
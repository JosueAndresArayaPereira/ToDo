function Tarea(nombre, fecha, descripcion, estado) {
    this.nombre = nombre || "";
    this.fecha = fecha || "";
    this.descripcion = descripcion || "";
    this.id = new Date();
    this.estado = estado || false;
}
var tareas = [];

function Cargar(){
    let datosRecuperados = localStorage.getItem("tareas-lista")
    if(datosRecuperados){
        let datos = JSON.parse(datosRecuperados);
        tareas = datos.listaTareas;
        console.log(tareas)
    }
}

function IncrustarDatos() {
    let contenedores = document.getElementsByClassName('ContenedorTareas');

    for (let j = 0; j < contenedores.length; j++) {
        let contenedor = contenedores[j];

        for (let i = 0; i < tareas.length; i++) {
            let tarea_actual = tareas[i];
            let capsula = document.createElement("a");
            capsula.classList.add('CartaTarea');
            
            capsula.href = "../pages/Modificar.html?id=" + tarea_actual.id;

            let titulo = document.createElement("h2");
            titulo.textContent = tarea_actual.nombre;
            capsula.appendChild(titulo);

            let parrafo = document.createElement("p");
            parrafo.textContent = tarea_actual.descripcion;
            capsula.appendChild(parrafo);

            let parrafoEstado = document.createElement("p");
            parrafoEstado.textContent = "Estado: ";
            let spanEstado = document.createElement("span");
            let estado_tarea = tarea_actual.estado ? "Completado" : "Incompleto"
            spanEstado.textContent = estado_tarea;
            parrafoEstado.appendChild(spanEstado);
            capsula.appendChild(parrafoEstado);

            capsula.addEventListener('click', function() {
                window.location.href = this.href;
            });

            contenedor.appendChild(capsula);
        }
    }
}



Cargar();
IncrustarDatos();
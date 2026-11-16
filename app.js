
// Elementos de la página
const campoBusqueda = document.getElementById("busqueda");
const botonBuscar = document.getElementById("btnBuscar");
const contenedorResultados = document.getElementById("resultados");

// Función para buscar series en la API
async function buscarSeries() {

    const nombre = campoBusqueda.value.trim();

    // Validar el campo de búsqueda
    if (nombre === "") {
        alert("Por favor, escribe el nombre de una serie.");
        return;
    }

    contenedorResultados.innerHTML = "<p>Buscando series...</p>";

    try {

        // Consultar la API de TVmaze
        const respuesta = await fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nombre)}`
        );

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();

        // Verificar si existen resultados
        if (datos.length === 0) {
            contenedorResultados.innerHTML =
                "<p>No encontramos series con ese nombre.</p>";
            return;
        }

        // Limpiar resultados anteriores
        contenedorResultados.innerHTML = "";

        // Mostrar las series encontradas
        datos.forEach(resultado => {

            const serie = resultado.show;

            const imagen = serie.image
                ? serie.image.medium
                : "https://placehold.co/210x295?text=Sin+imagen";

            const tarjeta = document.createElement("div");

            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <img src="${imagen}" alt="Póster de ${serie.name}">

                <h3>${serie.name}</h3>

                <p>Idioma: ${serie.language || "No disponible"}</p>

                <p>Calificación: ${
                    serie.rating.average || "Sin calificación"
                }</p>

                <p>Géneros: ${
                    serie.genres.length
                        ? serie.genres.join(", ")
                        : "No disponibles"
                }</p>
            `;

            contenedorResultados.appendChild(tarjeta);
        });

    } catch (error) {

        contenedorResultados.innerHTML =
            "<p>Error al consultar la API. Intenta nuevamente.</p>";

        console.error("Error:", error);
    }
}

// Evento del botón Buscar
botonBuscar.addEventListener("click", buscarSeries);

// Buscar también al presionar Enter
campoBusqueda.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        buscarSeries();
    }

});

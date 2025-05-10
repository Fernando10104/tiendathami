
// Cargar los productos desde el archivo JSON
fetch("./src/productos.json")
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        
        console.log(productos);
        console.log(productos[1].imagen);
        cargarproductos(productos);
    })
    .catch(error => console.error('Error al cargar los productos:', error));




const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarproductos(productos){
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <img class="producto-imagen" src="${producto.image}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p>Precio: ${producto.precio} Gs.</p>
                <button class="btn-primary" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorproductos.appendChild(div);
    })

}

// cargarproductos is now called with the productos array from the fetch response

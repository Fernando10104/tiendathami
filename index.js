const opciones = {
  keys: ['nombre'],
  threshold: 0.4
};
// Cargar los productos desde el archivo JSON
fetch("./src/productos.json")
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        cargarproductos(productos);
        const fuse = new Fuse(productos, opciones);
        const input = document.getElementById("search");
        input.addEventListener("input", () => {
        const texto = input.value.trim();
        if (texto === ""){
            cargarproductos(productos);
            console.log(productos,"lololololololo")
            return;

            
        }

            const resultado = fuse.search(texto);
            const filtrados = resultado.map(r => r.item);
            cargarproductos(filtrados);

        });
     
    })
    .catch(error => console.error('Error al cargar los productos:', error));






const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarproductos(productos){
    contenedorproductos.innerHTML = ""; // limpiar lo anterior
    productos.forEach( item  => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <img class="producto-imagen" src="${item.image}" alt="${item.nombre}">
            <div class="producto-info">
                <h3 class="producto-nombre">${item.nombre}</h3>
                <p>Precio: ${item.precio} Gs.</p>
                <button class="btn-primary" id="${item.id}">Agregar al carrito</button>
            </div>
        `;
        div.onclick = () => {
            window.location.href = `producto-detallado.html?id=${item.id}`;
        };
        contenedorproductos.appendChild(div);
    })

}





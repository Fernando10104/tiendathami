
const opciones = {
  keys: ['nombre', 'categoria'],
  threshold: 0.4
};
const boton = document.getElementById("btn-cargar");
const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
menu.classList.toggle('active');
});


let productos = [];
let indiceInicio = 0;
const cantidadPorCarga = 10;

// Cargar los productos desde el archivo JSON
fetch("./src/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data.productos;
        cargarproductos(productos);
        

        const input = document.getElementById("search");
        const categoria = document.getElementById("categoria");
        const price = document.getElementById("price")

        // Establecer valor inicial y activar filtro inmediatamente
        price.value = "MENORAMAYOR";
        actulizarproductos();
        
        input.addEventListener("input", actulizarproductos);
        categoria.addEventListener("change", actulizarproductos);
        price.addEventListener("change", actulizarproductos);
        const fuse = new Fuse(productos, opciones);

        function actulizarproductos (){
            const input = document.getElementById("search");
            const categoria = document.getElementById("categoria");
            const price = document.getElementById("price");

            let price2 = price.value.trim();
            let categoria2 = categoria.value.trim();
            let texto = input.value.trim();
            const query = `${texto} ${categoria2}`;
            let resultadoFinal = [];
            
            if (texto === "" && categoria2 === ""){
                resultadoFinal = [...productos];
                console.log(productos,"array cargando todos los productos")
            }else{
                const resultado = fuse.search(query);
                resultadoFinal = resultado.map(r => r.item);
                console.log("array cargando productos filtrados")
            };
            if (price2 === "MENORAMAYOR"){
                resultadoFinal.sort((a, b) => Number(a.precio) - Number(b.precio))

            }else if (price2 === "MAYORAMENOR"){
                resultadoFinal.sort((a, b) => Number(b.precio) - Number(a.precio))
  
            };
            cargarproductos(resultadoFinal);




    window.addEventListener("pageshow", function (event) {
        const searchInput = document.getElementById("search");
        searchInput.blur();
        cargarproductos(productos); // Guardá una copia antes
    });
     
    }})
    .catch(error => console.error('Error al cargar los productos:', error));





const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarproductos(productos){
    
    console.log("comprobando producto en cargar productos ", productos)
    const nuevosProductos = productos.slice(indiceInicio, indiceInicio + cantidadPorCarga);
    console.log(nuevosProductos, "nuevos productos log")
    nuevosProductos.forEach( item  => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `

        <img class="producto-imagen" src="./src/image/${item.image}" alt="${item.nombre}">
        <div class="producto-info">
            <h3 class="producto-nombre">${item.nombre}</h3>
            <p>Tipo : ${item.nombre2}</p>
            <p>Precio: ${item.precio} Gs.</p>
            
        </div>
    `;
    
    div.onclick = () => {
        const searchInput = document.getElementById("search");
        searchInput.value = "";
        searchInput.blur();
        cargarproductos(productos);
        
        window.location.href = `producto-detallado.html?id=${item.id}`;
        
    };
    
    contenedorproductos.appendChild(div);
    });
    indiceInicio += cantidadPorCarga;
    if (indiceInicio >= productos.length) {
    boton.style.display = "none";
    }

}
boton.addEventListener("click", () => cargarproductos(productos));
  
    
    


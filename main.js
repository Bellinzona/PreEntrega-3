// se crean las variables que se van a utilizar
let btnCarrito = document.querySelector(".container_icono_carrito");
let containerCarrito = document.querySelector(".container_carrito");
let containerTotal = document.querySelector(".containerTotal");
const bodyStyle = document.querySelector("body");
const productosEnCarritoGuardados = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
let productos = []
let productosEnCarrito = []
let precioActualizado = 0

if (productosEnCarritoGuardados.length > 0) {
    // Realizar acciones necesarias con los productos guardados
    for (let i = 0; i < productosEnCarritoGuardados.length; i++) {
        console.log(productosEnCarritoGuardados[i].titulo);
        let productoGuardado = productosEnCarritoGuardados[i];

        let crearElemento = document.createElement("div");
        crearElemento.classList.add("detallesElemento");

        nodoImagen = document.createElement("img")
        nodoTitulo = document.createElement("p")
        nodoPrecio = document.createElement("p")

        nodoImagen.src = productoGuardado.imagen
        nodoTitulo.textContent = productoGuardado.titulo
        nodoPrecio.textContent = "$" + productoGuardado.precio

        crearElemento.appendChild(nodoImagen)
        crearElemento.appendChild(nodoTitulo)
        crearElemento.appendChild(nodoPrecio)

        let añadir = document.querySelector(".elementoCarrito")

        añadir.appendChild(crearElemento)
        actualizarTotal(productoGuardado.precio)
    }
}



bodyStyle.classList.add("transition-background");


// constructor de Productos

function producto(imagen,titulo,precio){
    this.imagen = imagen
    this.titulo = titulo
    this.precio = precio
}


//Creacion de objetos

const pollo = new producto("https://i.blogs.es/8ceb02/pollo_entero/840_560.jpg","Pechuga de Pollo", 4000)
productos.push(pollo)

const milanesaCarne = new producto("https://www.laylita.com/recetas/wp-content/uploads/2021/12/Como-hacer-milanesa-de-carne-de-res-500x500.jpg","milanesa de carne", 3000)
productos.push(milanesaCarne)
const milanesaPollo = new producto("https://cdn-60451594c1ac18116c8abcd2.closte.com/wp-content/uploads/2017/04/Milanesa-de-pollo-600x600.jpg","Milanesa de pollo", 3500)
productos.push(milanesaPollo)
const milanesaBerenjena = new producto("https://www.recetasnestle.com.ar/sites/default/files/srh_recipes/d3bf498bbf36b70dc972378036b5ce48.jpg","milanesa de berenjena",3400)
productos.push(milanesaBerenjena)
const patitasPollo = new producto("https://elmanagermdp.com.ar/wp-content/uploads/2023/03/PATITAS.jpg","Patitas de Pollo",4000)
productos.push(patitasPollo)
const papas = new producto("https://saborargento.com.ar/wp-content/uploads/2023/06/Receta-de-Papas-Noisette.jpg","Papas noisette",3600)
productos.push(papas)
const milanesaDeCerdo = new producto("https://recetinas.com/wp-content/uploads/2018/03/milanesas-de-cerdo.jpg","Milanesa De cerdo",2500)
productos.push(milanesaDeCerdo)


console.log(productos)


largo = productos.length;

// se crean los div segun lo que haya en el array "productos"
    for (let i = 0; i < largo; i++){
        let crearCaja = document.createElement("div");
        crearCaja.classList.add("producto");

        let nodoImagen = document.createElement("img")
        let nodoTitulo = document.createElement("h2")
        let nodoPrecio = document.createElement("p")
        let nodoBoton = document.createElement("button")
        nodoBoton.classList.add("botonComprar")
        let spanPrecio = document.createElement("span");
        let producto = productos[i]

        nodoImagen.src = producto.imagen
        nodoTitulo.textContent = producto.titulo
        spanPrecio.textContent = "$ " + producto.precio
        nodoPrecio.appendChild(spanPrecio)
        nodoBoton.textContent = "Comprar"
        nodoBoton.setAttribute("data-id", i)

        crearCaja.appendChild(nodoImagen)
        crearCaja.appendChild(nodoTitulo)
        crearCaja.appendChild(nodoPrecio)
        crearCaja.appendChild(nodoBoton)

        let añadir = document.querySelector(".container_productos")

        añadir.appendChild(crearCaja)



    }


containerCarrito.style.display = "none";
containerTotal.style.display = "none";


//animacion para que el carrito aparezca y el fondo se oscurezca
btnCarrito.addEventListener("click", function(){

    if (containerCarrito.style.display == "none"){
        containerCarrito.style.display = "block"
        containerTotal.style.display = "block"
        bodyStyle.style.backgroundColor = "rgb(200, 200, 200)"
        actualizarAltura()
        console.log("boton")
        

        
    }else{
        bodyStyle.style.backgroundColor = "rgb(248, 248, 248)"
        containerCarrito.style.display = "none"
        containerTotal.style.display = "none"
        actualizarAltura()

    }
    
})



// funcion para que todos los botones tengan la misma funcionalidad
let btnComprar = document.querySelectorAll(".botonComprar")
btnComprar.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const indiceProducto = boton.getAttribute("data-id");
        const productoSeleccionado = productos[indiceProducto]; 


        let crearElemento = document.createElement("div");
        crearElemento.classList.add("detallesElemento");

        nodoImagen = document.createElement("img")
        nodoTitulo = document.createElement("p")
        nodoPrecio = document.createElement("p")

        nodoImagen.src = productoSeleccionado.imagen
        nodoTitulo.textContent = productoSeleccionado.titulo
        nodoPrecio.textContent = "$" + productoSeleccionado.precio

        crearElemento.appendChild(nodoImagen)
        crearElemento.appendChild(nodoTitulo)
        crearElemento.appendChild(nodoPrecio)

        let añadir = document.querySelector(".elementoCarrito")

        añadir.appendChild(crearElemento)
        productosEnCarrito.push(productoSeleccionado)
        console.log(productosEnCarrito)

        actualizarAltura()
        actualizarTotal(productoSeleccionado.precio)
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));


    





        console.log("Producto seleccionado:", productoSeleccionado.titulo);
    });
});


//funcion para actualizar la altura del carrito
function actualizarAltura(){

    let alturaCarrito = containerCarrito.clientHeight
    let alturaTotal = 0
    alturaTotal += alturaCarrito

    containerTotal.style.top = alturaTotal + "px"
    console.log(alturaTotal)


}

// funcion para actalizar el total
function actualizarTotal(a){
    let detalles = document.querySelector(".detalles");
    let spanTotal = detalles.querySelector("span");

    precioActualizado += a;
    spanTotal.textContent = "$" + precioActualizado;
}


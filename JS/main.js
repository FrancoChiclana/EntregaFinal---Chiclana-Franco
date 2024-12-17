let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuento = parseFloat(localStorage.getItem("descuento")) || 0;

document.addEventListener("DOMContentLoaded", () => {
    actualizarInterfaz();


    document.getElementById("agregar-producto-btn").addEventListener("click", agregarProducto);
    document.getElementById("aplicar-descuento-btn").addEventListener("click", aplicarDescuento);
});

//Funciones

function agregarProducto() {
    let nombre = prompt("Nombre del producto");
    if (!nombre) return;

    let precio = parseFloat(prompt("Precio del producto"));
    if (isNaN(precio) || precio <=0) return;

    let cantidad = parseInt(prompt("Ingrese cantidad de productos"));
    if (isNaN(cantidad) || cantidad <= 0) return; 

    let encontrado = false;
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].nombre === nombre) {
            carrito[i].cantidad += cantidad;
            encontrado = true;
            break;
        }
    }

    if (!encontrado){
        carrito.push({ nombre: nombre, precio: precio, cantidad: cantidad});
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarInterfaz();
}

function actualizarInterfaz() {
    let lista = document.getElementById("productos-lista");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        let divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button onclick="eliminarProducto(${index})">Eliminar</button>
            <button onclick="modificarCantidad(${index})">Modificar Cantidad</button>`
        lista.appendChild(divProducto);

        total += producto.precio * producto.cantidad;
    });


    let totalDescuento = total - descuento;

    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById("descuento").textContent = `Descuento: $${descuento.toFixed(2)}`;
    document.getElementById("total-con-descuento").textContent = `Total con Descuento: $${totalDescuento.toFixed(2)}`;
}


function eliminarProducto(index) {
    carrito.splice(index ,1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarInterfaz();
}


function aplicarDescuento() {
    let codigo = document.getElementById("codigo-descuento").value.trim();

    let total = calcularTotal();

    if (codigo === "descuento10") {
        descuento = 0.10 * total();
    } else if (codigo === "descuento20") {
        descuento = 0.20 * total();
    } else {
        descuento = 0;
        alert("Codigo de descuento no valido");
    }

    localStorage.setItem("descuento", descuento);

    actualizarInterfaz();

}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }
    return total;
}


function modificarCantidad(index) {
    let nuevaCantidad = prompt("Ingrese la nueva cantidad", carrito[index].cantidad);
    nuevaCantidad = parseInt(nuevaCantidad);

    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) return;

    carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarInterfaz();
}
 
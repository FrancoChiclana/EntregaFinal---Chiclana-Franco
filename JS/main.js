let carrito = [];
let descuento = 0;

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
    
    actualizarInterfaz();
}

function actualizarInterfaz() {
    let lista = document.getElementById("productos-lista");
    lista.innerHTML = "";

    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        let divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button onclick="eliminarProducto(${i})">Eliminar</button>
            <button onclick="modificarCantidad(${i})>Modificar Cantidad</button>`;
        lista.appendChild(divProducto);

        total += producto.precio * producto.cantidad;
    }


    let totalDescuento = total - descuento;

    document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById("descuento").textContent = `Descuento: $${descuento.toFixed(2)}`;
    document.getElementById("total-con-descuento").textContent = `Total con Descuento: $${totalDescuento.toFixed(2)}`;
}


function eliminarProducto(index) {
    carrito.splice(index ,1);
    actualizarInterfaz();
}


function aplicarDescuento() {
    let codigo = document.getElementById("codigo-descuento").value.trim();

    if (codigo === "descuento10") {
        descuento = 0.10 * calcularTotal();
    } else if (codigo === "descuento20") {
        descuento = 0.20 * calcularTotal();
    } else {
        descuento = 0;
        alert("Codigo de descuento no valido");
    }

    actualizarInterfaz();

}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }
    return total;
}
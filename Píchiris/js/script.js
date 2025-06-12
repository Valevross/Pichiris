// 🟡 CANDADO
const candado = document.getElementById("imagen-candado");
if (candado) {
  candado.addEventListener("mouseenter", () => {
    candado.src = "assets/candado-abierto.png";
  });

  candado.addEventListener("mouseleave", () => {
    candado.src = "assets/candado-cerrado.png";
  });
}

// 🟡 SCROLL SUAVE
const enlaces = document.querySelectorAll("a[href^='#']");
enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 🟢 CARGAR Y AGREGAR PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito(); // Para carrito.html

  const botones = document.querySelectorAll('.icono-tacha'); // Para tienda.html

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      const imagen = boton.dataset.imagen;

      if (!nombre || !imagen || isNaN(precio)) {
        console.error("Faltan datos del producto");
        return;
      }

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const productoExistente = carrito.find(p => p.nombre === nombre);

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({
          nombre: nombre,
          imagen: imagen,
          precio: precio,
          cantidad: 1
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      window.location.href = "carrito.html";
    });
  });
});

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  const total = document.getElementById("total-pedido");

  if (!contenedor || !total) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedor.innerHTML = "";

  // Incluir Kit Píchiris
  const kit = {
    nombre: "Kit Píchiris",
    imagen: "", // Ya no se usa
    precio: 0,
    cantidad: 1
  };

  const yaIncluido = carrito.find(p => p.nombre === "Kit Píchiris");
  if (!yaIncluido) carrito.push(kit);

  let suma = 70;

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "carrito-item-limpio";
    div.innerHTML = `
      <span class='carrito-nombre'>${producto.nombre}</span>
      <div class='carrito-controles'>
        <button onclick='cambiarCantidad(${index}, -1)'>-</button>
        <span>${producto.cantidad}</span>
        <button onclick='cambiarCantidad(${index}, 1)'>+</button>
      </div>
      <span class='carrito-precio'>$${(producto.precio * producto.cantidad).toFixed(2)} MXN</span>
    `;
    contenedor.appendChild(div);

    suma += producto.precio * producto.cantidad;
  });

  total.textContent = "$" + suma.toFixed(2) + " MXN";
}
function cambiarCantidad(index, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!carrito[index]) return;

  carrito[index].cantidad += delta;

  // No permitir cantidades menores a 1 excepto el Kit Píchiris
  if (carrito[index].cantidad <= 0 && carrito[index].nombre !== "Kit Píchiris") {
    carrito.splice(index, 1);
  } else if (carrito[index].cantidad <= 0) {
    carrito[index].cantidad = 1;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-cliente");
  const btnPagar = document.querySelector(".btn-pagar");

  if (form && btnPagar) {
    btnPagar.addEventListener("click", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        alert("Por favor completa todos los campos del formulario.");
      }
    });
  }
});

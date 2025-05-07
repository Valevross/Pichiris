// Cargar carrito al iniciar si estamos en carrito.html
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("listaCarrito")) {
      mostrarCarrito();
    }
  });
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado: " + nombre);
  }
  
  // Función para mostrar el carrito en carrito.html
  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("total");
  
    if (!lista || !total) return;
  
    lista.innerHTML = "";
    let suma = 0;
  
    carrito.forEach((producto, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>${producto.nombre}</strong><br/>
          <small>$${producto.precio.toFixed(2)} MXN</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      lista.appendChild(li);
      suma += producto.precio;
    });
  
    total.textContent = "$" + suma.toFixed(2);
  }
  
  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
  
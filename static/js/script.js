

document.addEventListener("DOMContentLoaded", function() 
{

  AOS.init();

  const formBusqueda = document.querySelector(".formBusqueda");

  formBusqueda.addEventListener("submit", async function(event) 
  {
    event.preventDefault();


    const ciudad = document.getElementById("destino").value.trim();
    const checkIn = document.getElementById("fechaCheckIn").value;
    const checkOut = document.getElementById("fechaCheckOut").value;
    const huespedes = parseInt(document.getElementById("cantidadHuespedes").value);
    const mensajeBusqueda = document.getElementById("mensajeBusqueda");
    const elementosTabla = document.getElementById("elementosTabla")


    mensajeBusqueda.textContent = "";
    mensajeBusqueda.classList.remove("exito", "error");
  

    elementosTabla.classList.remove("mostrarTabla")


    if (!ciudad) 
    {
      mensajeBusqueda.textContent = "Por favor, ingresa un destino válido.";
      mensajeBusqueda.classList.add("error");
      return;
    }

    if (!checkIn || !checkOut) 
    {
      mensajeBusqueda.textContent = "Por favor, selecciona las fechas de entrada y salida.";
      mensajeBusqueda.classList.add("error");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) 
    {
      mensajeBusqueda.textContent = "La fecha de salida debe ser posterior a la fecha de entrada.";
      mensajeBusqueda.classList.add("error");
      return;
    }

    if (isNaN(huespedes) || huespedes < 1) 
    {
      mensajeBusqueda.textContent = "Debe haber al menos un adulto.";
      mensajeBusqueda.classList.add("error");
      return;
    }


    mensajeBusqueda.textContent = "¡Búsqueda realizada correctamente!";
    mensajeBusqueda.classList.add("exito");


    elementosTabla.classList.add("mostrarTabla")


    const data = await obtenerHoteles(ciudad, checkIn, checkOut, huespedes) 

    if (data.length == 0)
    {
      mensajeBusqueda.textContent = "No se encontraron hoteles."
    }

    const body = document.getElementById("elementosTabla-body")
    let html = ""

    data.forEach(element => 
    { 
      html += 
      `
      <tr>
      <td>${element.ciudad}</td>
      <td>${element.nombre}</td>
      <td>${element.capacidad}</td>
      <td>${element.fecha_inicio_disponible}</td>
      <td>${element.fecha_fin_disponible}</td>
      </tr>
      `

    });

    body.innerHTML = html

  });


  const formContacto = document.getElementById("formContacto");

  formContacto.addEventListener("submit", async function(event) 
  {

    event.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivo = document.getElementById("motivo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    

    if (!nombre || !email || !asunto || motivo == "" || !mensaje) 
    {
      mensajeConfirmacion.textContent = "Por favor, completa todos los campos.";
      mensajeConfirmacion.style.color = "red";
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
    {
      mensajeConfirmacion.textContent = "Por favor, ingresa un correo electrónico válido.";
      mensajeConfirmacion.style.color = "red";
      return;
    }


    if (mensaje.length < 10) 
    {
      mensajeConfirmacion.textContent = "El mensaje debe tener al menos 10 caracteres.";
      mensajeConfirmacion.style.color = "red";
      return;
    }


    mensajeConfirmacion.textContent = "¡Mensaje enviado correctamente!";
    mensajeConfirmacion.style.color = "#FFD700";
    const response = await fetch("/api/contact",{
      method : "POST", headers : {"content-type" : "application/json"}, body : JSON.stringify({nombre, email, asunto, motivo, mensaje})
    })
    const data = await response.json();
    if (!response.ok) 
    {
      mensajeConfirmacion.textContent = "Error al enviar el mensaje. Por favor, inténtalo de nuevo.";
      mensajeConfirmacion.style.color = "red";
      return;
    }
    formContacto.reset();
    mensajeConfirmacion.textContent = data.msg;
    mensajeConfirmacion.style.color = "green"; 


  });


});



async function obtenerHoteles(ciudad, checkIn, checkOut, huespedes) 
{
  const response = await fetch(`/api/hoteles?ciudad=${ciudad}&fecha_inicio=${checkIn}&fecha_fin=${checkOut}&huespedes=${huespedes}`,
  {
    method : "GET", headers : {"content-type" : "application/json"}
  })

  const data = await response.json();
  if (!response.ok) 
  {
    console.log("No se pudieron obtener hoteles.")
    return;
  }

  return data;

}


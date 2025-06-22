

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
    const adultos = parseInt(document.getElementById("cantidadAdultos").value);
    const mensajeBusqueda = document.getElementById("mensajeBusqueda");


    mensajeBusqueda.textContent = "";
    mensajeBusqueda.classList.remove("exito", "error");


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

    if (isNaN(adultos) || adultos < 1) 
    {
      mensajeBusqueda.textContent = "Debe haber al menos un adulto.";
      mensajeBusqueda.classList.add("error");
      return;
    }


    mensajeBusqueda.textContent = "¡Búsqueda realizada correctamente!";
    mensajeBusqueda.classList.add("exito");


    actualizarMapa(ciudad);


  });


  const formContacto = document.getElementById("formContacto");

  formContacto.addEventListener("submit", function(event) 
  {

    event.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");


    if (!nombre || !email || !asunto || !mensaje) 
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
    formContacto.reset();


  });


});


function actualizarMapa(ciudad) 
{
  const mapaIframe = document.getElementById("mapaIframe");
  const urlMapa = `https://www.google.com/maps?q=hoteles+en+${encodeURIComponent(ciudad)}&output=embed`;
  mapaIframe.src = urlMapa;
}



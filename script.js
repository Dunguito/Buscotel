

document.addEventListener("DOMContentLoaded", function() 
{

  AOS.init();

  const formBusqueda = document.querySelector(".formBusqueda");
  formBusqueda.addEventListener("submit", async function(event) 
  {
    event.preventDefault();


    const ciudad = document.getElementById("destino").value.trim();
    if (!ciudad) 
    {
      alert("Por favor ingresa un destino válido.");
      return;
    }


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
      mensajeConfirmacion.textContent = "Por favor completa todos los campos.";
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




document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidad del botón "Descubre más"  ---
    window.scrollToFeatures = function() {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- Funcionalidad de búsqueda (si ya la tienes) ---
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario recargue la página
            const searchTerm = searchInput.value;
            if (searchTerm) {
                alert('Buscando: ' + searchTerm);
            } else {
                alert('Por favor, ingresa algo para buscar.');
            }
        });
    }

    
    const restaurantes = document.querySelectorAll('restaurantes');
    restaurantes.forEach(restauranteDiv => {
        restauranteDiv.addEventListener('click', function() {
            const Calendario = this.dataset.targetPage;

            if (Calendario) {
                window.location.href="index (1).hml";
            } else {
                console.error('No se encontró la página de destino para este restaurante.', this);
            }
        });

        restauranteDiv.style.cursor = 'pointer';
    });

    // --- Funcionalidad del formulario de sugerencias (si ya la tienes) ---
    const sugerenciaForm = document.getElementById('sugerenciaForm');
    if (sugerenciaForm) {
        sugerenciaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario
            const textarea = sugerenciaForm.querySelector('textarea');
            if (textarea.value.trim() !== '') {
                alert('¡Gracias por tu sugerencia! Hemos recibido: ' + textarea.value);
                textarea.value = ''; 
            } else {
                alert('Por favor, escribe tu sugerencia antes de enviar.');
            }
        });
    }

}); 
// Obtener referencia al contenedor del calendario
const calendar = document.getElementById('calendar');

// Obtener el modal (cuadro emergente para ingresar hora)
const modal = document.getElementById('eventModal');

// Obtener el elemento que mostrará la fecha seleccionada en el modal
const selectedDate = document.getElementById('selectedDate');

// Obtener el campo de texto donde el usuario ingresará la hora
const eventText = document.getElementById('eventText');

// Obtener el botón para guardar la hora
const saveBtn = document.getElementById('saveBtn');

// Obtener el botón (X) para cerrar el modal
const closeModal = document.querySelector('.close');

// Obtener la fecha actual
let currentDate = new Date();

// Objeto para almacenar los eventos (clave = fecha, valor = hora)
let events = {};

// Función para generar el calendario del mes actual
function renderCalendar() {
  calendar.innerHTML = '';  // Limpiar el contenido del calendario

  const year = currentDate.getFullYear(); // Año actual
  const month = currentDate.getMonth();   // Mes actual (0-11)
  const firstDay = new Date(year, month, 1).getDay(); // Día de la semana del primer día del mes
  const lastDate = new Date(year, month + 1, 0).getDate(); // Último día del mes

  // Agregar espacios en blanco antes del primer día (para alinear bien la grilla)
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div'); // Crear un div vacío
    calendar.appendChild(empty);                 // Agregarlo al calendario
  }

  // Crear los días del mes
  for (let day = 1; day <= lastDate; day++) {
    const dayEl = document.createElement('div'); // Crear un div para el día
    dayEl.className = 'day';                     // Asignar clase CSS
    dayEl.textContent = day;                     // Mostrar el número del día

    const dateKey = `${year}-${month + 1}-${day}`; // Formato de clave para guardar evento

    // Si ya hay un evento para esa fecha, marcar el día en verde claro
    if (events[dateKey]) {
      dayEl.style.backgroundColor = "#d0f0c0";
    }

    // Agregar evento al hacer clic en el día → abrir el modal
    dayEl.addEventListener('click', () => openModal(dateKey));

    // Agregar el día al calendario
    calendar.appendChild(dayEl);
  }
}

// Función para abrir el modal al hacer clic en una fecha
function openModal(dateKey) {
  modal.style.display = 'block';                     // Mostrar el modal
  selectedDate.textContent = `Cita para: ${dateKey}`; // Mostrar la fecha seleccionada
  eventText.value = events[dateKey] || '';            // Cargar evento si ya existe

  // Asignar función al botón guardar
  saveBtn.onclick = () => {
    const text = eventText.value.trim(); // Obtener texto ingresado (hora)

    if (text) {
      events[dateKey] = text;  // Guardar el evento
    } else {
      delete events[dateKey];  // Eliminar si el campo está vacío
    }

    modal.style.display = 'none'; // Cerrar el modal
    renderCalendar();             // Volver a renderizar el calendario
  };
}

// Evento para cerrar el modal al hacer clic en la X
closeModal.onclick = () => {
  modal.style.display = 'none';
};

// Evento para cerrar el modal al hacer clic fuera del contenido
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

// Al cargar la página, mostrar el calendario
renderCalendar();
// Constantes
const inputTask = document.querySelector("#nuevaTarea");
const taskCommit = document.querySelector("form.nueva-tarea");

/**
 * Verificar la sesion del usuario
 */
window.addEventListener("load", () => {
  let auth = sessionStorage.getItem("auth");
  if (typeof auth === "undefined") {
    sessionStorage.removeItem("auth");
    auth = null;
  }

  // Si existe la llave de autenticación */
  if (auth) {
    // Obtener información de usuario */
    obtenerDatosUsuario(auth);
    cargarTareasViejas(auth);
  } else {
    // De lo contrario redirigir al inicio */
    accesoRestringido();
  }
});

/**
 * Evento Crear Tarea
 * */
taskCommit.addEventListener("submit", (e) => {
  e.preventDefault();
  let auth = sessionStorage.getItem("auth");
  crearTarea(auth);
});

/** -------------------- Funciones ---------------------- */

/**
 * Obtener la información del Usuario
 * */
function obtenerDatosUsuario(auth) {
  fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
    method: "GET",
    headers: {
      Authorization: auth,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      const user = document.querySelector(".user-info p");
      user.innerHTML = `ID: ${data.id} - ${data.firstName} ${data.lastName}`;
    });
}

/**
 * Obtener lista de tareas
 * */
async function cargarTareasViejas(auth) {
  await fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "GET",
    headers: {
      Authorization: auth,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      const taskBlock = document.querySelector("#skeleton");

      data.forEach((tarea) => {
        const taskTemplate = `<li data-aos="fade-up" class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">Creada: ${dayjs(tarea.createdAt)}</p>
            </div>
            </li>`;

        taskBlock.insertAdjacentHTML("afterbegin", taskTemplate);
      });
    });
}

/**
 * Crear una tarea nueva
 * */
async function crearTarea(auth) {
  console.log(inputTask.value);
  await fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "POST",
    body: JSON.stringify({
      description: inputTask.value,
      completed: false,
    }),
    headers: {
      Authorization: auth,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.table(data);

      const taskTemplate = `<li data-aos="fade-up" class="tarea">
        <div class="not-done"></div>
        <div class="descripcion">
          <p class="nombre">${data.description}</p>
          <p class="timestamp">Creada: ${dayjs(data.createdAt)}</p>
        </div>
      </li>`;

      const taskBlock = document.querySelector("#skeleton");
      taskBlock.insertAdjacentHTML("afterbegin", taskTemplate);
    });
}

/**
 * Cerrar la aplicación
 * */
const closeApp = document.querySelector("#closeApp");
closeApp.addEventListener("click", sesionFinalizada);

/**
 * Mensajes de alerta
 * */
// Acceso restringido
function accesoRestringido() {
  let timerInterval;
  Swal.fire({
    icon: "success",
    title: "Acceso Restringido!",
    html: "Inicie sesión o regístrese para ver las tareas",
    timer: 2000,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "/index.html";
    }
  });
}

// Sesión finalizada
function sesionFinalizada() {
  let timerInterval;
  Swal.fire({
    icon: "success",
    title: "Hasta pronto!",
    html: "Has cerrado sesión correctamente",
    timer: 2000,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      sessionStorage.removeItem("auth");
      window.location.href = "/index.html";
    }
  });
}

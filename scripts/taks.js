window.addEventListener("load", () => {
  let auth = sessionStorage.getItem("auth");
  if (typeof auth === "undefined") {
    sessionStorage.removeItem("auth");
    auth = null;
  }

  /** Si existe la llave de autenticación */
  if (auth) {
    /** Obtener información de usuario */
    getUserData(auth);
  } else {
    /** De lo contrario redirige al inicio */
    accesoRestringido();
  }
});

/**
 * Obtener la información del Usuario
 * */
function getUserData(auth) {
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

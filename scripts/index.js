// Constantes
const login = document.querySelector("form");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");

inputEmail.addEventListener("blur", () => {
  testEmail(inputEmail);
});
inputPassword.addEventListener("blur", () => {
  testPassword(inputPassword);
});

window.addEventListener("load", () => {
  let sesion = sessionStorage.getItem("auth");
  if (!sesion || sesion == undefined) {
    sessionStorage.removeItem("auth");
  } else {
    window.location.href = "/mis-tareas.html";
  }
});

login.addEventListener("submit", (event) => {
  event.preventDefault();
  if (loginValidation()) iniciarSesion();
});

login.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    if (loginValidation()) iniciarSesion();
  }
});

function iniciarSesion() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == "Contraseña incorrecta") {
        wrongPassword(data);
      } else if (data == "El usuario no existe") {
        usuarioInexistente(data);
      } else if (data.jwt) {
        loginExitoso(data);
      }
    })
    .catch((data) => console.log(data));
}

function wrongPassword(data) {
  Swal.fire(data, "Verifica tu contraseña e intenta nuevamente", "error");

  const inputPassword = document.querySelector("#inputPassword");
  inputPassword.style.border = "1px solid red";
  inputPassword.value = "";
}

function usuarioInexistente(data) {
  Swal.fire(data, "Verifica tus datos o crea un nuevo usuario", "error");

  const inputPassword = document.querySelector("#inputPassword");
  inputPassword.style.border = "1px solid red";
  inputPassword.value = "";
}

function loginExitoso(data) {
  let timerInterval;
  Swal.fire({
    icon: "success",
    title: "Bienvenido!",
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
      sessionStorage.setItem("auth", data.jwt);
      window.location.href = "/mis-tareas.html";
    }
  });
}

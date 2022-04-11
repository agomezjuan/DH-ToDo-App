// Constantes
const signupForm = document.querySelector("form");
const inputNombre = document.querySelector("#inputNombre");
const inputApellido = document.querySelector("#inputApellido");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const checkPassword = document.querySelector("#checkPassword");

checkPassword.addEventListener("keyup", (e) => {
  passwordMatch(inputPassword, checkPassword);
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (signupValidation()) {
    registrarUsuario();
  }
});

/**
 * Registrar nuevo usuario
 */
function registrarUsuario() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
    method: "POST",
    body: JSON.stringify(
      normalize(
        inputNombre.value,
        inputApellido.value,
        inputEmail.value,
        inputPassword.value
      )
    ),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.jwt) {
        console.log(data.jwt);
        registroExitoso(data);
      }
    });
}

/**
 * Normalizar datos
 * */
function normalize(name, lastname, email, password) {
  const data = {
    firstName: name[0].toUpperCase() + name.slice(1).toLowerCase(),
    lastName: lastname[0].toUpperCase() + lastname.slice(1).toLowerCase(),
    email: email,
    password: password.trim(),
  };
  return data;
}

/**
 * Mensajes de alerta
 * */
// Registro realizado con éxito
function registroExitoso(data) {
  let timerInterval;
  Swal.fire({
    icon: "success",
    title: "Registro exitoso!",
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

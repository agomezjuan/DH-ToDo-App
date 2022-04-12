// Constantes
const login = document.querySelector("form");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");

inputEmail.addEventListener("blur", () => {
  if (!testEmail(inputEmail)) {
    inputEmail.setAttribute("placeholder", "Escribe tu correo");
  }
});
inputPassword.addEventListener("blur", () => {
  if (!testPassword(inputPassword)) {
    inputPassword.setAttribute("placeholder", "Escribe tu contraseña");
  }
});

window.addEventListener("load", () => {
  let sesion = sessionStorage.getItem("auth");
  if (!sesion || sesion == undefined) {
    sessionStorage.removeItem("auth");
  } else {
    window.location.href = "/mis-tareas.html";
  }
});

login.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (loginValidation()) await iniciarSesion();
});

login.addEventListener("keyup", async (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    if (loginValidation()) {
      try {
        let data = await iniciarSesion();

        if (data == "Contraseña incorrecta") {
          wrongPassword(data);
        } else if (data == "El usuario no existe") {
          usuarioInexistente(data);
        } else if (data.jwt) {
          loginExitoso(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
});

async function iniciarSesion() {
  const response = await fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const data = await response.json();

  return data;
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

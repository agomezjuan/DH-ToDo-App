// Constantes
const login = document.querySelector("form");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");

inputEmail.addEventListener("blur", () => {
  loginValidation();
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

  if (loginValidation()) {
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
          let timerInterval;
          Swal.fire({
            icon: "error",
            title: data,
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
              const inputPassword = document.querySelector("#inputPassword");
              inputPassword.style.border = "1px solid red";
              inputPassword.value = "";
            }
          });
        } else if (data.jwt) {
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
      })
      .catch((data) => console.log(data));
  }
});

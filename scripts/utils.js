window.addEventListener("DOMContentLoaded", () => {
  // Constantes
  const regexNombre = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
  const regexEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

  // Validacion de inicio de sesion
  function loginValidation() {
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");

    let validated = testEmail(inputEmail) && testPassword(inputPassword);

    return validated ? true : false;
  }

  //Validacion de registro de nuevo usuario
  function signupValidation() {
    const inputNombre = document.querySelector("#inputNombre");
    const inputApellido = document.querySelector("#inputApellido");
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const checkPassword = document.querySelector("#checkPassword");
    let validated =
      testNombre(inputNombre) &&
      testApellido(inputApellido) &&
      testEmail(inputEmail) &&
      testPassword(inputPassword) &&
      passwordMatch(inputPassword, checkPassword);

    return validated ? true : false;
  }

  function testNombre(inputNombre) {
    if (!regexNombre.test(inputNombre.value.trim())) {
      console.log("El nombre no puede incluir numeros.");
      inputNombre.style.border = "1px solid red";
      return false;
    } else {
      inputNombre.style.border = "1px solid #f2f2f2";
      return true;
    }
  }

  function testApellido(inputApellido) {
    if (!regexNombre.test(inputApellido.value.trim())) {
      console.log("El apellido no puede incluir numeros.");
      inputApellido.style.border = "1px solid red";
      return false;
    } else {
      inputApellido.style.border = "1px solid #f2f2f2";
      return true;
    }
  }

  function testEmail(inputEmail) {
    if (!regexEmail.test(inputEmail.value)) {
      console.log("El texto no es un email válido.");
      inputEmail.style.border = "1px solid red";
      return false;
    } else {
      inputEmail.style.border = "1px solid #f2f2f2";
      return true;
    }
  }

  function testPassword(inputPassword) {
    if (inputPassword.value == "" || inputPassword.value.length < 2) {
      inputPassword.style.border = "1px solid red";
      console.log("Escriba su contraseña.");
      return false;
    } else {
      inputPassword.style.border = "1px solid #f2f2f2";
      return true;
    }
  }

  function passwordMatch(inputPassword, checkPassword) {
    if (inputPassword.value !== checkPassword.value) {
      inputPassword.style.border = "1px solid red";
      checkPassword.style.border = "1px solid red";
      return false;
    } else {
      inputPassword.style.border = "1px solid green";
      checkPassword.style.border = "1px solid green";
      return true;
    }
  }
});

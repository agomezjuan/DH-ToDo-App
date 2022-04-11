//Constantes

function loginValidation() {
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  let validated;
  const regexEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

  if (!regexEmail.test(inputEmail.value)) {
    validated = false;
    console.log("El texto no es un email válido.");
    inputEmail.style.border = "1px solid red";
  } else {
    inputEmail.style.border = "1px solid #f2f2f2";
    validated = true;
  }

  inputPassword.addEventListener("blur", () => {
    if (inputPassword.value == "") {
      validated = false;
      inputPassword.style.border = "1px solid red";
      console.log("Escriba su contraseña.");
    } else {
      inputEmail.style.border = "1px solid #f2f2f2";
      validated = true;
    }
  });

  return validated ? true : false;
}

function signupValidation() {}
/*
const nombre = document.querySelector("#signup_name");
const password = document.querySelector("#signup_password");
const tel = document.querySelector("#tel");
const hobbies = document.querySelectorAll("#listado-hobbies input");
const nacionalidades = document.getElementsByName("nacionalidad");
const peliculas = document.querySelector("#peliculas");
const listaErrores = document.querySelector("#errorList");

formulario.addEventListener("submit", function (event) {
  //detenemos el envio del form
  //event.preventDefault()

  let peliculasSelected = toArraySplitUpper(peliculas.value.trim());
  //console.log(peliculasSelected)

  validarForm(event);
  console.log(
    normalizar(
      nombre.value,
      password.value,
      tel.value,
      peliculasSelected,
      getHobbiesSelected(),
      getPaisSelected()
    )
  );
});

//procesamos la información
function normalizar(nombre, password, tel, peliculas, hobbies, nacionalidad) {
  const datos = {
    //Nombres comienzan con mayusculas, y luego todo min nombre.charAt(0).toUpperCase()
    nombre: nombre[0].toUpperCase() + nombre.slice(1).toLowerCase(),
    password: password.trim(),
    tel: tel,
    peliculas: peliculas,
    hobbies: hobbies,
    nacionalidad: nacionalidad,
  };
  return datos;
}

function validarForm(e) {
  document.querySelector("#errorList").innerHTML = "";
  let errores = [];

  let regexNombre = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,8}$/;
  if (nombre.value == "") {
    errores.push("El nombre no debe estar vacío.");
  } else if (!regexNombre.test(nombre.value)) {
    errores.push(
      "El nombre debe tener un limite de 8 caracteres y al menos una mayúscula y un número."
    );
  }

  let regexPass =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{10,15}$/;
  if (password.value == "") {
    errores.push("La contraseña no debe estar vacía.");
  } else if (password.value.length > 15 || password.value.length < 10) {
    errores.push("La contraseña debe tener entre 10 y 15 caracteres");
  } else if (!regexPass.test(password.value)) {
    errores.push(
      "La contraseña debe tener 1 mayúscula.<br>La contraseña debe tener 1 minúscula,<br>La contraseña debe tener al menos 1 caracter especial."
    );
  }

  let regexTel = /\d{3}\s{1}\d{3}\s{1}\d{3}/;
  if (!regexTel.test(tel.value)) {
    errores.push(
      "El teléfono debe contener 9 dígitos y estar separado entre 2 espacios (123 456 789)."
    );
  }

  if (peliculas.value == "") {
    errores.push("Debes colocar al menos 1 película.");
  }

  if (getHobbiesSelected().length < 1 || getHobbiesSelected().length > 4) {
    errores.push("Debe seleccionar entre 1 y 4 hobbies.");
  }

  if (getPaisSelected() == undefined) {
    errores.push("Debe seleccionar nacionalidad.");
  }

  if (errores.length > 0) {
    e.preventDefault();

    for (let error of errores) {
      listaErrores.innerHTML += "<li><span>" + error + "</span></li>";
    }
  }
  e.preventDefault();
  listaErrores.innerHTML += "<li><span>" + "FORM ENVIADO" + "</span></li>";
}

function toArraySplitUpper(cadena) {
  let array = cadena.toUpperCase().split(";");
  return array;
}

function getHobbiesSelected() {
  let hobbiesSelected = [];
  hobbies.forEach((hobbie) => {
    if (hobbie.checked) {
      hobbiesSelected.push(hobbie.id);
    }
  });
  return hobbiesSelected;
}

function getPaisSelected() {
  let paisSelected;
  nacionalidades.forEach((pais) => {
    if (pais.checked) {
      paisSelected = pais.id;
    }
  });
  return paisSelected;
}
*/

// Example starter JavaScript for disabling form submissions if there are invalid fields

var forms;
let email, password;

(async function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        event.preventDefault();
        if (form.email.checkValidity()) {
          email = document.getElementById("email");
          console.log(email.value);
        }
        if (form.password.checkValidity()) {
          password = document.getElementById("password");
          console.log(password.value);
        }
        if (form.email.checkValidity() && form.password.checkValidity()) {
          login(email.value, password.value);
        }
      },
      false
    );
  });
})();

let login = async function (email, password) {
  const loginInfo = {
    email,
    password,
  };
  let result = await fetch("http://localhost:4200/doLoginPatient", {
    method: "POST",
    body: JSON.stringify(loginInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //   let gg = await result.json();
  result = await result.json();
  if(result.success){
    localStorage.clear();
    localStorage.setItem('email',result.email);
    window.location.replace("http://localhost:4200/test1");
  }
};

let button = document.getElementById("submitButton");

const form = document.getElementById("form");
const username = document.getElementById("Username");
const email = document.getElementById("Email");
const password = document.getElementById("Password");
const password2 = document.getElementById("Password-2");

//input error msg
const showError = (input, msg) => {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  formControl.classList.remove("success");
  formControl.querySelector("small").innerHTML = msg;
};

//success
const showSucess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
};

//check email-
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSucess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

//check rqd fields

const checkRqd = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${input.id} is requried`);
    } else {
      if (input.id === "Username") {
        checkLen(username, 3, 15);
      } else if (input.id === "Password") {
        checkLen(password, 8, 20);
      } else if (input.id === "Password-2") {
        checkLen(password2, 8, 20);
      } else if (input.id === "Email") {
        checkEmail(email);
      }
    }
  });
};

// check length
const checkLen = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${input.id} must be atleast ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be atmost ${max} characters`);
  } else {
    showSucess(input);
  }
};

//match pass
const checkPassMatch = (input1, input2) => {
  if (input2.value !== input1.value) {
    showError(input1, "Password does not matches");
    showError(input2, "Password does not matches");
  }
};

//Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRqd([username, email, password, password2]);
  checkPassMatch(password, password2);
});

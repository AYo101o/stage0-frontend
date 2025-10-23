const patterns = {
  fullname: /^[a-zA-Z ]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  subject: /.{5,100}/,
  message: /.{10,500}/,
};

const form = document.querySelector("form");
const inputs = form.querySelectorAll("input, textarea");
const successMsg = document.querySelector('[data-testid="test-contact-success"]');

function validate(field, regex) {
  if (regex.test(field.value.trim())) {
    field.classList.add("valid");
    field.classList.remove("invalid");
    return true;
  } else {
    field.classList.add("invalid");
    field.classList.remove("valid");
    return false;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const pattern = patterns[e.target.name];
    if (pattern) validate(e.target, pattern);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let allValid = true;
  inputs.forEach((input) => {
    const pattern = patterns[input.name];
    if (pattern && !validate(input, pattern)) {
      allValid = false;
    }
  });

  if (allValid) {
    successMsg.hidden = false;
    successMsg.style.color = "green";
    successMsg.textContent = "Sent Successfully 🎉";

    form.reset();
    inputs.forEach((input) => input.classList.remove("valid"));

    setTimeout(() => {
      successMsg.style.transition = "opacity 0.5s ease";
      successMsg.style.opacity = "0";
      setTimeout(() => {
        successMsg.hidden = true;
        successMsg.style.opacity = "1";
      }, 500);
    }, 3000);
  } else {
    successMsg.hidden = false;
    successMsg.style.color = "red";
    successMsg.textContent = "Please fix errors before submitting.";
  }
});

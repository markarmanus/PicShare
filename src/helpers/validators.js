export const validateNotEmpty = (value, fieldPlaceHolder) => {
  const isValid = value && value.length > 0;
  if (!isValid) {
    return { error: `${fieldPlaceHolder} Cant be Empty!` };
  }
};

export const validatePassword = (password) => {
  const hasLowerCase = new RegExp("^(?=.*[a-z])");
  const hasUpperCase = new RegExp("^(?=.*[A-Z])");
  const hasNumber = new RegExp("^(?=.*[0-9])");
  const isLongEnough = new RegExp("^(?=.{8,})");
  if (isLongEnough.test(password)) {
    let warning;
    if (!hasUpperCase.test(password)) {
      warning = "Password is weak! - add an upper case letter!";
    }
    if (!hasNumber.test(password)) {
      warning = "Password is weak! - add a number to your password!";
    }
    if (!hasLowerCase.test(password)) {
      warning = "Password is weak! - add a lower case letter!";
    }
    return { warning };
  } else {
    return { error: "Password Not Long Enough!" };
  }
};

export const validateEmail = (email) => {
  const regTest =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !regTest.test(email.toLowerCase())) {
    return { error: "Please Enter a Valid Email!" };
  }
};

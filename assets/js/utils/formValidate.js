function validateForm(type, value, el = null) {
  let result = false;
  switch (type) {
    case INPUT_TYPE.name:
      result = validateUsername(value);
      if (!result) displayError(result, el);
      return result;
    case INPUT_TYPE.email:
      result = validateEmail(value);
      if (!result) displayError(result, el);
      return result;
    case INPUT_TYPE.phone:
      result = validatePhoneNumber(value);
      if (!result) displayError(result, el);
      return result;
    case INPUT_TYPE.credit_card:
      result = validateCreditcard(value);
      if (!result) displayError(result, el);
      return result;
    default:
      return;
  }
}

function validateEmail(value) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function validatePhoneNumber(phoneNumber) {
  var pattern = /[+0-9]*/;
  let rg = new RegExp(pattern, 'ig');
  var phone = rg.exec(phoneNumber);
  if (phone) {
    return true;
  }
  return false;
}

function validateUsername(name) {
  var usernameRegex = /^[a-zA-Z]+$/;
  var name = name.match(usernameRegex);
  if (name) {
    return true;
  }
  return false;
}

function validateCreditcard(str) {
  regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(str) {
  if (str.length > 8) {
    return true;
  } else {
    return false;
  }
}

function displayError(errorMsg, element, errDiv = null) {
  if (element) {
    element.style.border = '1px solid red';
    if (errDiv) {
      errDiv.innerHTML = errorMsg;
    }
  }
}

function clearError(element, errDiv = null) {
  if (element) {
    element.style.border = 'unset';
    if (errDiv) {
      errDiv.innerHTML = '';
    }
  }
}

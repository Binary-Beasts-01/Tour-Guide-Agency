function validateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.value.match(mailformat)) {
        alert("Valid email address!");
        // document.form1.text1.focus();
        return true;
    } else {
        return false;
    }
}

function validatePhoneNumber(phoneNumber) {
    var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
      return true;
    }
    return false;
  }

function validateUsername(name) {
    var usernameRegex = /^[a-zA-Z]+$/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
      return true;
    }
    return false;
  }

function validateCreditcard(str)
{
 regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  
        if (regexp.test(str))
          {
            return true;
          }
        else
          {
            return false;
          }
}

function validateZipcode(str)
{
 regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
        if (regexp.test(str))
          {
            return true;
          }
        else
          {
            return false;
          }
}
function validateForm(type, vlaue) {
  switch (type) {
    case INPUT_TYPE.name:
      break;
    case INPUT_TYPE.email:
      break;
    case INPUT_TYPE.phone:
      break;
    case INPUT_TYPE.zip:
      break;
    case INPUT_TYPE.credit_card:
      break;
    default:
      break;
  }
}

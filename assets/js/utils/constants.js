const INPUT_TYPE = {
  name: 'NAME',
  email: 'EMAIL',
  phone: 'PHONE',
  credit_card: 'CREDIT_CARD',
  password: 'PASSWORD',
};

class CustomError {
  constructor(errMsg) {
    this.message = errMsg;
  }
}

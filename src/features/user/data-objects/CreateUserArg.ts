interface Arg {
  email: string;
  password: string;
}

export class CreateUserArg implements Arg {
  constructor(private arg: Arg) {}

  get email() {
    return this.arg.email;
  }
  get password() {
    return this.arg.password;
  }
}

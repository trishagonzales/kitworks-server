interface Props {
  message: string;
  filename: string;
  cause?: unknown;
}

export class Exception implements Props {
  readonly message: string;
  readonly filename: string;
  readonly cause?: unknown;

  private constructor(props: Props) {
    console.log('[ EXCEPTION ] ' + props.filename);
    console.trace(props.message);
    console.table(JSON.stringify(props.cause));
    // if (props.cause) console.log(JSON.stringify(props.cause));

    this.message = props.message;
    this.filename = props.filename;
    this.cause = props.cause;
  }

  static devLogic(arg: Props) {
    return new Exception({
      ...arg,
      message: 'DEV LOGIC: ' + arg.message,
    });
  }

  static startup(arg: Props) {
    return new Exception({
      ...arg,
      message: 'STARTUP: ' + arg.message,
    });
  }

  static infra(arg: Props) {
    return new Exception({
      ...arg,
      message: 'INFRA: ' + arg.message,
    });
  }

  static unexpected(arg: Props) {
    return new Exception({
      ...arg,
      message: 'UNEXPECTED: ' + arg.message,
    });
  }
}

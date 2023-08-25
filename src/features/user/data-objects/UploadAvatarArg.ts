interface Arg {
  publicId: string;
  publicUrl: string;
}

export class UpdateAvatarArg implements Arg {
  constructor(private arg: Arg) {}

  get publicId() {
    return this.arg.publicId;
  }
  get publicUrl() {
    return this.arg.publicUrl;
  }
}

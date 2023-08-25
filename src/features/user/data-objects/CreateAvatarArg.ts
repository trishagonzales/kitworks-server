interface Props {
  publicId: string;
  publicUrl: string;
}

export class CreateAvatarArg implements Props {
  constructor(private arg: Props) {}

  get publicUrl(): string {
    return this.arg.publicUrl;
  }
  get publicId(): string {
    return this.arg.publicId;
  }
}

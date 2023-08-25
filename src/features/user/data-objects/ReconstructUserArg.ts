import { Gender } from '../domain/User';

interface Arg {
  id: string;
  username: string;
  name: string;
  dateCreated: Date;
  email: string;
  bio?: string;
  gender?: Gender;
  avatarPublicId?: string;
  avatarPublicUrl?: string;
  password?: string;
  googleToken?: string;
}

export class ReconstructUserArg implements Arg {
  constructor(private arg: Arg) {}

  get id() {
    return this.arg.id;
  }
  get username() {
    return this.arg.username;
  }
  get name() {
    return this.arg.name;
  }
  get dateCreated() {
    return this.arg.dateCreated;
  }
  get email() {
    return this.arg.email;
  }
  get bio() {
    return this.arg.bio;
  }
  get gender() {
    return this.arg.gender;
  }
  get avatarPublicId() {
    return this.arg.avatarPublicId;
  }
  get avatarPublicUrl() {
    return this.arg.avatarPublicUrl;
  }
  get password() {
    return this.arg.password;
  }
  get googleToken() {
    return this.arg.googleToken;
  }
}

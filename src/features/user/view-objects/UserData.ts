import { Gender } from '../domain/User';

interface Props {
  id: string;
  username: string;
  name: string;
  bio?: string;
  gender?: Gender;
  avatarUrl?: string;
  dateCreated: Date;
  email: string;
}

export class UserViewData implements Props {
  constructor(private arg: Props) {}

  get id() {
    return this.arg.id;
  }
  get username() {
    return this.arg.username;
  }
  get name() {
    return this.arg.name;
  }
  get bio() {
    return this.arg.bio;
  }
  get gender() {
    return this.arg.gender;
  }
  get avatarUrl() {
    return this.arg.avatarUrl;
  }
  get dateCreated() {
    return this.arg.dateCreated;
  }
  get email() {
    return this.arg.email;
  }
}

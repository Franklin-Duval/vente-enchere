export class CompteEntity {
  _id: string;
  email: string;
  password: string;
  isActivated: boolean;

  constructor(compte: CompteEntity) {
    this._id = compte._id;
    this.email = compte.email;
    this.password = compte.password;
    this.isActivated = compte.isActivated;
  }
}

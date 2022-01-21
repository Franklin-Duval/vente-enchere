export class EnchereEntity {
  _id: string;
  date: string;

  constructor(enchere: EnchereEntity) {
    this._id = enchere._id;
    this.date = enchere.date;
  }
}

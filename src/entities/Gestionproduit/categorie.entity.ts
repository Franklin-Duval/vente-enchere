export class CategorieEntity {
  _id: string;
  nom: string;
  description: string;
  dateCreation: string;
  dateModification?: string;
  dateSuppression?: string;

  constructor(categorie: CategorieEntity) {
    this._id = categorie._id;
    this.nom = categorie.nom;
    this.description = categorie.description;
    this.dateCreation = categorie.dateCreation;
    this.dateModification = categorie.dateModification;
    this.dateSuppression = categorie.dateSuppression;
  }
}

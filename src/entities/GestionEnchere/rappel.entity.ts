import { UserEntity } from '../GestionCompte/user.entity';
import { ProduitEntity } from '../Gestionproduit/produit.entity';

export class RappelEntity {
  _id: string;
  dateAjout: string;
  produit: ProduitEntity;
  user: UserEntity;

  constructor(rappel: RappelEntity) {
    this._id = rappel._id;
    this.dateAjout = rappel.dateAjout;
    this.produit = rappel.produit;
    this.user = rappel.user;
  }
}

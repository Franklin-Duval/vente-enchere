import { VendeurEntity } from '../GestionCompte/vendeur.entity';
import { CategorieEntity } from './categorie.entity';

export type QuantityType = {
  valeur: number;
  unite: string;
};
export class ProduitEntity {
  _id: string;
  nom: string;
  description: string;
  prixMin: number;
  quantite: QuantityType;
  vendeur: VendeurEntity;
  category: CategorieEntity;
  images: string[];
  estBio: boolean;
  statut: string;
  dateCreation: string;
  dateModification?: string;
  dateSuppression?: string;
  favoris: string[];

  constructor(produit: ProduitEntity) {
    this._id = produit._id;
    this.nom = produit.nom;
    this.description = produit.description;
    this.prixMin = produit.prixMin;
    this.quantite = produit.quantite;
    this.vendeur = produit.vendeur;
    this.category = produit.category;
    this.images = produit.images;
    this.estBio = produit.estBio;
    this.statut = produit.statut;
    this.dateCreation = produit.dateCreation;
    this.dateModification = produit.dateModification;
    this.dateSuppression = produit.dateSuppression;
    this.favoris = produit.favoris;
  }
}

import { ProduitEntity } from './produit.entity';

export type StatusType =
  | 'en_attente_selection'
  | 'en_attente_vente'
  | 'refuse'
  | 'rejete'
  | 'en_vente'
  | 'vendu'
  | 'livre'
  | 'retourne'
  | 'valide';

export class LotEntity {
  _id: string;
  numeroLot: number;
  prixFinalVente: string;
  vendeur: string;
  statut: StatusType;
  prixMin: string;
  nonVendu: boolean;
  dateMiseEnchere: string;
  produits: ProduitEntity[];
  commentaireRefus?: string;
  dateReception?: string;
  dateRefus?: string;
  dateCreation: string;
  dateModification?: string;
  dateSuppression?: string;

  constructor(lot: LotEntity) {
    this._id = lot._id;
    this.numeroLot = lot.numeroLot;
    this.prixFinalVente = lot.prixFinalVente;
    this.vendeur = lot.vendeur;
    this.statut = lot.statut;
    this.prixMin = lot.prixMin;
    this.nonVendu = lot.nonVendu;
    this.dateMiseEnchere = lot.dateMiseEnchere;
    this.produits = lot.produits;
    this.commentaireRefus = lot.commentaireRefus;
    this.dateReception = lot.dateReception;
    this.dateRefus = lot.dateRefus;
    this.dateCreation = lot.dateCreation;
    this.dateModification = lot.dateModification;
    this.dateSuppression = lot.dateSuppression;
  }
}

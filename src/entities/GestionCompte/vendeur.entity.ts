import { GerantEntity } from './gerant.entity';
import { UserEntity } from './user.entity';

export class VendeurEntity{
  _id:string;
  accredidation:boolean;
  numeroCNI:string;
  specialite:string;
  chiffreAffaire:number;
  nombreLotsVendu:number;
  user:UserEntity;
  gerant:GerantEntity;

  constructor(vendeur:VendeurEntity){
    this._id=vendeur._id;
    this.accredidation=vendeur.accredidation;
    this.numeroCNI=vendeur.numeroCNI;
    this.specialite=vendeur.specialite;
    this.chiffreAffaire=vendeur.chiffreAffaire;
    this.nombreLotsVendu=vendeur.nombreLotsVendu;
    this.user=vendeur.user;
    this.gerant=vendeur.gerant;
  }
}

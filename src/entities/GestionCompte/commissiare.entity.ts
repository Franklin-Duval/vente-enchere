import { UserEntity } from './user.entity';

export class CommissaireEntity {
  _id: string;
  nombreEnchereOganisee: number;
  user: UserEntity;

  constructor(commissaire: CommissaireEntity) {
    this._id = commissaire._id;
    this.nombreEnchereOganisee = commissaire.nombreEnchereOganisee;
    this.user = commissaire.user;
  }
}

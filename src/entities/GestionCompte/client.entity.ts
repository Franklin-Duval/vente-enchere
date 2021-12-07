import { UserEntity } from './user.entity';

export class ClientEntity {
  _id: string;
  produitsAchetes: string;
  nombreProduitsAchetes: number;
  totalArgentDepenses: number;
  user: UserEntity;

  constructor(client: ClientEntity) {
    this._id = client._id;
    this.produitsAchetes = client.produitsAchetes;
    this.nombreProduitsAchetes = client.nombreProduitsAchetes;
    this.totalArgentDepenses = client.totalArgentDepenses;
    this.user = client.user;
  }
}

import { UserEntity } from './user.entity';

export class ClientEntity {
  produitsAchetes: string;
  nombreProduitsAchetes: number;
  totalArgentDepenses: number;
  user: UserEntity;

  constructor(client: ClientEntity) {
    this.produitsAchetes = client.produitsAchetes;
    this.nombreProduitsAchetes = client.nombreProduitsAchetes;
    this.totalArgentDepenses = client.totalArgentDepenses;
    this.user = client.user;
  }
}

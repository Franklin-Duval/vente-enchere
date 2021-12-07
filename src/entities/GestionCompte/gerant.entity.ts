import { UserEntity } from './user.entity';

export class GerantEntity {
  _id: string;
  nombreAccreditation: number;
  user: UserEntity;

  constructor(gerant: GerantEntity) {
    this._id = gerant._id;
    this.nombreAccreditation = gerant.nombreAccreditation;
    this.user = gerant.user;
  }
}

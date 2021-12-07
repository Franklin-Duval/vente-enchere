type RoleType = 'client' | 'vendeur' | 'gerant' | 'commissaire' | 'admin';

export class ConnectedUserEntity {
  _id: string;
  authentifie: boolean;
  nom: string;
  prenom: string;
  roles: RoleType[];
  token: string;
  nextAuthDate: number;

  constructor(user: ConnectedUserEntity) {
    this._id = user._id;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.authentifie = user.authentifie;
    this.roles = user.roles;
    this.token = user.token;
    this.nextAuthDate = user.nextAuthDate;
  }
}

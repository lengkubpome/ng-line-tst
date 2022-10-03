export class User2 {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expireDate() {
    return this.expirationDate;
  }

  get userToken() {
    return this.token;
  }
}

export interface IUser {
  uid: string | null;
  displayName: string;
}

export class User {
  constructor(public uid: string, public displayName: string) {}
}

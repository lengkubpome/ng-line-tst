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
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

export class User {
  private _uid: string;
  private _displayName: string;
  private _email: string;
  private _emailVerified: boolean;

  constructor(
    uid: string,
    displayName: string,
    email: string,
    emailVerified: boolean
  ) {
    this._uid = uid;
    this._displayName = displayName;
    this._email = email;
    this._emailVerified = emailVerified;
  }

  public get uid() {
    return this._uid;
  }
  public get displayName() {
    return this._displayName;
  }
  public get email() {
    return this._email;
  }
  public get emailVerified() {
    return this._emailVerified;
  }
}

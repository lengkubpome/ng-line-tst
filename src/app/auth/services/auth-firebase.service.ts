import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { delay, from, map, Observable, of, throwError } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  constructor(private afAuth: AngularFireAuth) {}

  getUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      delay(200),
      map((authData) => {
        if (authData) {
          return new User(authData.uid, authData.displayName!, authData.email!);
        }
        return null;
      })
    );
  }

  emailSignIn(email: string, password: string): any {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => res.user)
      .catch((error) => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          throw new Error(
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          );
        } else if (errorCode === 'auth/wrong-password') {
          throw new Error(
            'The password is invalid or the user does not have a password.'
          );
        }
        throw new Error(errorCode);
      });
  }

  emailSignUp(email: string, password: string): Observable<User | null> {
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          // this.SendVerificationMail();
          // this.SetUserData(result.user);

          return new User(
            res.user?.uid!,
            res.user?.displayName!,
            res.user?.email!
          );
        })
        .catch((error) => {
          throw new Error(error.message);
        })
    );
  }

  signOut(): Observable<any> {
    return from(
      this.afAuth.signOut().catch((error) => {
        throw new Error(error.code);
      })
    );
  }
}

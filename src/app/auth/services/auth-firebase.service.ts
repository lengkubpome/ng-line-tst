import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { delay, from, map, Observable, of, throwError } from 'rxjs';
import firebase from 'firebase/compat/app';
import { IUser, User } from '../models/user.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  getUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      delay(200),
      map((authData) => {
        if (authData) {
          return new User(
            authData.uid,
            authData.displayName!,
            authData.email!,
            authData.emailVerified
          );
        }
        return null;
      })
    );
  }

  emailSignIn(email: string, password: string): Observable<any> {
    return from(
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user);
          return result.user;
        })
        .catch((error) => {
          var errorCode = error.code;
          // var errorMessage = error.message;
          throw new Error(this.getErrorMessage(errorCode));
        })
    );
  }

  emailSignUp(email: string, password: string): Observable<any> {
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          this.SendVerificationMail();
          this.SetUserData(res.user);
          return new User(
            res.user?.uid!,
            res.user?.displayName!,
            res.user?.email!,
            false
          );
        })
        .catch((error) => {
          var errorCode = error.code;
          throw new Error(this.getErrorMessage(errorCode));
        })
    );
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return from(
      this.afAuth.currentUser
        .then((u: any) => {
          console.log('SendVerificationMail');
          console.log(u);

          u.sendEmailVerification();
        })
        .catch((error) => {
          throw new Error(error);
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

  // Reset Forggot password
  resetPassword(passwordResetEmail: string) {
    return from(
      this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then((res) => {
          console.log(res);

          // window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          var errorCode = error.code;
          throw new Error(this.getErrorMessage(errorCode));
        })
    );
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getErrorMessage(errorCode: string) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
      case 'auth/wrong-password':
        return 'The password is invalid or the user does not have a password.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is badly formatted.';
      case 'auth/provider-already-linked':
        return 'The provider has already been linked to the user.';
      case 'auth/invalid-credential':
        return ' This can happen if it has already expired when calling link, or if it used invalid token(s). See the Firebase documentation for your provider, and make sure you pass in the correct parameters to the credential method.';
      case 'auth/credential-already-in-use':
        return 'Ihe credential already exists among your users, or is already linked to a Firebase User.';
      case 'auth/operation-not-allowed':
        return 'You have not enabled the provider in the Firebase Console.';
      case 'auth/invalid-verification-code':
        return 'The verification code of the credential is not valid.';
      case 'auth/invalid-verification-id':
        return 'The verification ID of the credential is not valid.';

      default:
        return errorCode;
    }
  }
}

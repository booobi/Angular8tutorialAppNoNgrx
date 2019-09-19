import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { pipe, throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCO1bA05_6mTqoQ6judJ4VBPAdiK6J7xnA',
        {   
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCO1bA05_6mTqoQ6judJ4VBPAdiK6J7xnA',
        {   
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }

        const userDate = new Date(userData._tokenExpirationDate);
        const loadedUser = new User(userData.email, userData.id, userData._token, userDate);

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = userDate.getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn* 1000);

        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMsg = "An uncommon error has occured!";
        console.log(errorResponse);
        if(!errorResponse.error && !errorResponse.error.error) {
            return throwError(errorMsg);
        }

        switch(errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
                errorMsg = "This email already exists!";
                break;
            case "EMAIL_NOT_FOUND":
                errorMsg = "This email does not exist!";
                break;
            case "INVALID_PASSWORD":
                errorMsg = "This password is not correct!";
                break;
        }
        return throwError(errorMsg);
    }
}
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private errorSub: Subscription;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        if(this.isLoginMode) { 
           authObs = this.authService.login(email, password);
         } else {
            authObs = this.authService.signup(email, password)
            }

        authObs.subscribe(responseData => {
            this.isLoading = false;
            this.error = ''
            this.router.navigate(['/recipes']);
        }, errorMsg => {
            this.error = errorMsg;
            this.showErrorAlert(errorMsg);
            this.isLoading = false;
            console.log(errorMsg)
        });

        form.reset();
        
    }

    onHandleError(){
        this.error = '';
    }

    private showErrorAlert(errorMsg: string) {
        const alertComponentFactory = this
                                        .componentFactoryResolver
                                        .resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear()
        const compRef = hostViewContainerRef.createComponent(alertComponentFactory);

        compRef.instance.message = errorMsg;
        this.errorSub = compRef.instance.close.subscribe(()=> {
            this.errorSub.unsubscribe();
            hostViewContainerRef.clear();
        })

    }

    ngOnDestroy() {
        if(this.errorSub) {
            this.errorSub.unsubscribe();
        }
    }
}
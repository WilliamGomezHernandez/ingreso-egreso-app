import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState> ,
               private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => {
        this.cargando = ui.isLoading;
      } );
  }

  ngOnDestroy(){
    if (this.uiSubscription){
      this.uiSubscription.unsubscribe();

    }


  }

  login(){

    if (this.loginForm.invalid) {return ; }

    this.store.dispatch(ui.isLoading());
    //aqui
/*     Swal.fire({
      title: 'Espere porfavor',
      didOpen: () => {
        Swal.showLoading();
      }
    }); */

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password ).
      then( credenciales => {
        console.log(credenciales);
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });

  }


}

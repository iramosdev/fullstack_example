import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../../services/auth.services";
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from "../../models/usuario.models";
import * as localStorage from "nativescript-localstorage"
import * as dialogs from "tns-core-modules/ui/dialogs";
import {LoadingIndicator} from "nativescript-loading-indicator-new";

@Component({
    moduleId:module.id,
    templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {
    private loader = new LoadingIndicator();
   
    private options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
          indeterminate: true,
          cancelable: false,
          max: 100,
          progressNumberFormat: "%1d/%2d",
          progressPercentFormat: 0.53,
          progressStyle: 1,
          secondaryProgress: 1
        },
        ios: {
          details: "Additional detail note!",
          square: false,
          margin: 10,
          dimBackground: true,
          color: "#4B9ED6",
          mode: ''// see iOS specific options below
        }
      };

    constructor (
        private page:Page,
        private auth: AuthService,
        private router: Router){
        this.page.actionBarHidden = true;
    }
    usuario: UsuarioModel = new UsuarioModel();
    

    ngOnInit() {
  
        if(localStorage.getItem('email')){
            this.usuario.email= localStorage.getItem('email'); 
        }
      }

    public onLogin(){
           
        this.loader.show(this.options); 
        this.auth.login(this.usuario)
          .subscribe(resp=>{
           
            this.loader.hide();
            localStorage.setItem('email',this.usuario.email);
            this.router.navigateByUrl('/home/tareas');
          },err=>{
    
            this.loader.hide();
            dialogs.alert(err.error.err.message).then(()=> {
                console.log("Dialog closed!", err.error.err.message);
            });
        
        });
    }
}

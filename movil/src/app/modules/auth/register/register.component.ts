
import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../../services/auth.services";
import { UsuarioModel } from "../../models/usuario.models";
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    moduleId:module.id,
    providers:[AuthService],
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit { 

    public usuario: UsuarioModel;
    
    constructor (private page:Page,private auth: AuthService,private router: Router){
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.usuario= new UsuarioModel();
    }
    
    public onRegistro(){
        //Faltan validaciones 

        this.auth.nuevoUsuario(this.usuario)
        .subscribe(resp =>{
            console.log('--->(+_+)<---',resp);
            localStorage.setItem('email',resp['usuario'].email);
            dialogs.alert({
                title: "Alta usuario",
                message: `El alta del usuario ${ resp['usuario'].nombre } fue exítosa.`,
                okButtonText: "Salir"
            }).then(() => {
                console.log("Dialog closed!");
                this.router.navigate(["/"]);
            });
        },err=>{
            
            dialogs.alert({
                title: "Error registro",
                message: `${ err.error.err.errors.email.message }`,
                okButtonText: "Salir"
            }).then(() => {
                console.log("Dialog closed!");
            });
        });
    }

    public ongoogle (){
        console.log('--->(+_+)<---','Botón de google en construcción');
        this.alert('Botón de google en construcción');
    }
    public onfacebook(){
        console.log('--->(+_+)<---','Botón de facebook construcción');
        this.alert('Botón de facebook construcción')
    }

    public alert(item){
        dialogs.alert({
            title: "En construcción",
            message: `${ item }`,
            okButtonText: "Salir"
        }).then(() => {
            console.log("Dialog closed!");
        });
    }

}

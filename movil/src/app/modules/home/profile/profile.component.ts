import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as localStorage from "nativescript-localstorage"
import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../../services/auth.services";
import { UsuarioModel } from '../../models/usuario.models';

@Component({
    moduleId: module.id,
    providers: [AuthService],
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    constructor(
        private rotuer: RouterExtensions,
        private auth: AuthService,
        private page: Page
    ) {
        this.page.actionBarHidden = true;
    }
   public usuario: UsuarioModel = new UsuarioModel();

    ngOnInit() {
       
       
        this.auth.getUsuarioId(localStorage.getItem('idUser'))
          .subscribe( resp => {
    
              this.usuario= resp['usuario']

        },err=>{
            console.log('--->(+ERROR GETTAREA+)<---',err);
            
        });
      }

    public onLogout() {
        dialogs.confirm(`Está seguro que desea cerrar sesión`).then(result => {
            if(result){
                this.rotuer.navigate(["/"], { clearHistory: true });
                localStorage.removeItem('token')
                localStorage.removeItem('idUser')
            }
        }); 
        
    }

    public actualizarPerfil (){
        console.log('--->(+_+)<---','evento actualizar perfil');
        this.auth.updateUsuario(this.usuario).subscribe(resp=>{
            console.log('--->(+_+)<---','proceso exitoso ', resp);
            dialogs.alert({
                title: "Información",
                message: ` Proceso exitoso`,
                okButtonText: "Salir"
            }).then(() => {
                console.log("Dialog closed!");
            });
        },err=>{
            console.log('--->(+_+)<---',err.error.err.message);
            
        })
    }
}

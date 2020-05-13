import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../../services/auth.services";
import { ActivatedRoute, Routes } from '@angular/router';
import { TareaService } from '../../services/tareas.services';
import { TareaModel } from '../../models/tarea.models';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    moduleId: module.id,
    providers: [AuthService],
    templateUrl: "./detalletarea.component.html"
})
export class DetalleTareaComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
       
        private auth: AuthService,
        private page: Page,
        private tareaService: TareaService
    ) {
        this.page.actionBarHidden = true;
    }
    
    private id ='';
    tarea: TareaModel = new TareaModel();

    ngOnInit() {

        this.id = this.route.snapshot.paramMap.get('id');

        if ( this.id !== 'nuevo' ) {

        this.tareaService.getTarea( this.id )
            .subscribe( (resp: TareaModel) => {
                console.log('--->(+getTarea+)<---',resp);
                
            this.tarea = resp['tarea'];
            this.tarea._id = this.id;
            });
        }
    }


    public GuardarNotas(){
        //Faltan validaciones 
        if(this.id=='nuevo'){
            this.tareaService.crearTarea(this.tarea).subscribe(resp=>{

                dialogs.alert({
                    title: "Información",
                    message: ` Alta exitosa`,
                    okButtonText: "Salir"
                }).then(() => {
                    console.log("Dialog closed!");
                    this.tarea.nombre="";
                    this.tarea.descripcion="";
                });
            },err=>{
                console.log('--->(+_+)<---',err);
                
            });
        }else{
            this.tareaService.actualizarTarea(this.tarea).subscribe(resp=>{
                dialogs.alert({
                    title: "Información",
                    message: ` Actualización exitosa`,
                    okButtonText: "Salir"
                }).then(() => {
                    console.log("Dialog closed!");

                });
            },err=>{
                console.log('--->(+_+)<---',err);
            });

        }
    }

    public cancelarDetalleTarea(){
        // this.route..navigateByUrl('/home/tareas');
    }
}

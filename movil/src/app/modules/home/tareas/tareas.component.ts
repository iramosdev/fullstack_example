import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page/page";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { registerElement } from '@nativescript/angular/element-registry';
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton';
import { TareaModel } from "../../models/tarea.models";
import { AuthService } from '../../services/auth.services';
import { TareaService } from '../../services/tareas.services';
import { Router } from '@angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';
registerElement('MDFloatingActionButton', () => FloatingActionButton);
import { TextField } from "tns-core-modules/ui/text-field";
import * as dialogs from "tns-core-modules/ui/dialogs";


import { Button } from "tns-core-modules/ui/button";
import { ShowModalOptions } from "tns-core-modules/ui/core/view";
import { RouterExtensions } from 'nativescript-angular/router';
const modalViewModulets = "ns-ui-category/modal-view/basics/modal-ts-view-page";

@Component({
    moduleId:module.id,
    templateUrl: "./tareas.component.html"
})
export class TareasComponent implements OnInit {
   
    tareas: TareaModel[] = [];
    public data: ObservableArray<any>;

     constructor (  private page:Page ,
                    private auth:AuthService,
                    private tarea: TareaService, 
                    private router:RouterExtensions){

        this.page.actionBarHidden = true;
        
    }

    ngOnInit() {
        console.log('--->(+_+)<---','peticion de tareas');
       
        this.tarea.getTareas()
          .subscribe( resp => {
              console.log('--->(+_+)<---',resp);
              this.data= new ObservableArray<any>(resp['tareas']);
            
        },err=>{
            console.log('--->(+ERROR GETTAREA+)<---',err);
            
        });
      }

    public onPullToRefreshInitiated(args: ListViewEventData){
        console.log('--->(+_+)<---','evento refrest');
        const listView = args.object;

        this.tarea.getTareas()
            .subscribe( resp => {
                console.log('--->(+_+)<---',resp);
                listView.notifyPullToRefreshFinished();
                this.data= new ObservableArray<any>(resp['tareas']);
            
        },err=>{
            listView.notifyPullToRefreshFinished();
            console.log('--->(+ERROR GETTAREA+)<---',err);
        });
    }

    public onfabTap(url:string){
        this.router.navigate([url], { 
            // clearHistory: true 
        });
    }


    public onReturnPress(args) {
        let textField = <TextField>args.object;
        
        this.tarea.buscarTareas(textField.text).subscribe(resp=>{
            this.data= new ObservableArray<any>(resp['tareas']);
        },err=>{
            console.log('--->(+_+)<---',err);
            
        })
    }
    
    public actualizarTarea(item){

        this.router.navigate(['/home/detalletarea/'+item._id], { 
        //    clearHistory: true 
        });

    }

    public eliminarTarea(item){

       var index =this.getIndexData(item);
       
        dialogs.confirm(`Está seguro que desea borrar a ${ item.nombre }`).then(result => {
            if(result){
                this.tarea.borrarTarea(item._id).subscribe(resp=>{
                this.data.splice(index, 1);
                       
                },err=>{
                    console.log('--->(+_+)<---',err);
                    
                });
            }
        });       
    }

    getIndexData(item){
        var return_index=-1
        this.data.forEach(function(items, index){
            if(items._id === item._id){
                return return_index=index
            }
        })
        return return_index;
    }
}


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { TareaModel } from 'src/app/models/tarea.models';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  constructor(private tareaService: TareaService,
    private route: ActivatedRoute) { }
  tarea: TareaModel = new TareaModel();

  
  private id ;

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    if ( this.id !== 'nuevo' ) {

      this.tareaService.getTarea( this.id )
        .subscribe( (resp: TareaModel) => {
          
          this.tarea = resp['tarea'];
          this.tarea._id = this.id;
        });

    }
  }

  guardar( form: NgForm ) {
      

    if ( form.invalid ) {
      
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.tarea._id ) {
      peticion = this.tareaService.actualizarTarea( this.tarea );
    } else {
      peticion = this.tareaService.crearTarea( this.tarea );
    }

    peticion.subscribe( resp => {

      


      if ( this.id == 'nuevo' ) {

        this.alertView('Alta exitosa');

        form.reset();
       
      }else{
        this.alertView('Se actualizó correctamente');
      }
      
    });

  }

  alertView(message){
    Swal.fire({
      title: this.tarea.nombre,
      text: message,
      icon: 'success'
    });
    
  }

}

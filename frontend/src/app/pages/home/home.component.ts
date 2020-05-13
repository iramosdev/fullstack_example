import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TareaModel } from 'src/app/models/tarea.models';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas: TareaModel[] = [];
  cargando = false;

  constructor(private auth:AuthService,private tarea: TareaService, private router:Router) { }

  ngOnInit() {
    this.cargando = true;
    this.tarea.getTareas()
      .subscribe( resp => {
        this.tareas = resp['tareas'];
        this.cargando = false;
    });

  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

 borrarTarea( tarea: TareaModel, i: number ) {

    Swal.fire({
        title: "¿Está seguro?",
        text: `Está seguro que desea borrar a ${ tarea.nombre }`,
        icon:'info',
        showConfirmButton: true,
        showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.tareas.splice(i, 1);
        this.tarea.borrarTarea( tarea._id ).subscribe();
      }
    });

  }
}

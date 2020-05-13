import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme=false;
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {

    this.usuario= new UsuarioModel();

   }

   crearUsuario(form:NgForm){     
     
    if(form.invalid) return;
  
    Swal.fire({
      icon: 'info',
      html:'Espere por favor...',
      // timer: 1500,
      allowOutsideClick:false
    });
    Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp =>{
        Swal.close();
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/login');
      },err=>{
        Swal.fire({
          title:'Error alta usuario',
          icon: 'error',
          html:err.error.err.errors.email.message,
          // timer: 1500,
        });
      });
   }


}

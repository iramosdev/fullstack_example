import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,private router:Router) { }

  usuario: UsuarioModel = new UsuarioModel();

  recordarme = false;

  ngOnInit() {

    if(localStorage.getItem('email')){
        this.usuario.email= localStorage.getItem('email');
        this.recordarme=true
    }
  }

  login(form: NgForm){

    if(form.invalid){ return};
    
      Swal.fire({
        icon: 'info',
        html:'Espere por favor...',
        // timer: 1500,
        allowOutsideClick:false
      });
      Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp=>{

        Swal.close()
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },err=>{

        Swal.fire({
          title:'Error al autenticar',
          icon: 'error',
          html:err.error.err.message,
          // timer: 1500,
        });

    });
    
  }

}

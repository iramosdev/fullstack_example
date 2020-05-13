import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000"

  userToken:string;

  constructor(private http: HttpClient) {
    this.readToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario:UsuarioModel){
    const autData={
      password: usuario.password,
      email: usuario.email
    }

    return this.http.post(
      `${this.url}/login`,
      autData
    ).pipe(
      map(resp=>{
        this.guardarToken(resp['token']);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario:UsuarioModel){

    const autData={
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      role: "USER_ROLE"
    }

    return this.http.post(
      `${this.url}/usuario`,
      autData
    );

  }


  private guardarToken(idToken:string){
    this.userToken= idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  readToken(){

    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }

    return this.userToken;

  }

  estaAutenticado():boolean{

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as localStorage from "nativescript-localstorage"

import { map } from 'rxjs/operators'
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})

// https://stackoverflow.com/questions/54018049/nativescript-http-failure-response-for-unknown-url/54018826
// https://support.brightcove.com/es/android-pie-support-native-sdk-android
export class AuthService {

  private url = "http://192.168.0.17:3000"

  userToken:string;

  constructor(private http: HttpClient) {
    this.readToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  getUsuarioId( id: string ) {
    return this.http.get(`${ this.url }/usuario/${ id }`,this.getHeader());

  }

  getHeader(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'token': localStorage.getItem('token')
    });
      const httpOptions = {
        headers: headers_object
      };
    return httpOptions
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
        this.guardarToken(resp);
        return resp;
      })
    );
  }

  updateUsuario(data){
   console.log('--->(+_+)<---',data);
   const autData={
      nombre: data.nombre,
      google: data.google,
      password: data.password,
      role: data.role
  }
    return this.http.put(`${ this.url }/usuario/${ data._id }`, autData,this.getHeader());
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

  private guardarToken(resp){
    this.userToken= resp['token'];
    localStorage.setItem('token',this.userToken);
    localStorage.setItem('idUser',resp['usuario']._id);
    
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

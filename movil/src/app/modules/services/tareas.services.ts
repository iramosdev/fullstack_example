
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { TareaModel } from '../models/tarea.models';
import * as localStorage from "nativescript-localstorage"

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private url = "http://192.168.0.17:3000"
  private userToken:string;

  constructor(private http: HttpClient) { 

    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
  }

  crearTarea( tarea: TareaModel ) {

    return this.http.post(`${ this.url }/tareas`, tarea,this.getHeader());
          
  }


  actualizarTarea( tarea: TareaModel ) {

    const tareaTemp = {
      ...tarea
    };

    delete tareaTemp._id;

    return this.http.put(`${ this.url }/tareas/${ tarea._id }`, tareaTemp,this.getHeader());


  }

  borrarTarea( id: string ) {

    return this.http.delete(`${ this.url }/tareas/${ id }`,this.getHeader());

  }


  getTarea( id: string ) {
    return this.http.get(`${ this.url }/tareas/${ id }`,this.getHeader());

  }

  getTareas() {
    console.log('--->(+_+)<---','---getTareas---');
    
    return this.http.get(`${ this.url }/tareas`,this.getHeader());
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


  buscarTareas(termino:string){
    return this.http.get(`${ this.url }/tareas/buscar/${ termino }`,this.getHeader());
  }

}

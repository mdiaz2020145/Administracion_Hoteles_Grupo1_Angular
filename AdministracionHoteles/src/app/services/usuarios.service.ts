import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Usuarios} from '../models/usuario.model'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad; 
  public token; 

  constructor(public _http:HttpClient) { }

  login(usuario, obtenerToken = null):Observable<any>{

    if(obtenerToken !=null){
        usuario.obtenerToken = obtenerToken; 
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login',params,{headers:this.headersVariable});
  
  }

  obtenerToken(){
    var token2 = localStorage.getItem("token");
    if(token2 !=undefined){
      this.token = token2;
    }else{
      this.token = null
    }

    return this.token; 
  }


  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'))
    if(identidad2 !=undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null
    }

    return this.identidad; 
  }
  

}
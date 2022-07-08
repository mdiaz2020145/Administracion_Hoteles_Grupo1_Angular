import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiciosModel } from '../models/servicios.model';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token: any;
  public identidad: any;

  constructor(public _http: HttpClient) { }

  obtenerServiciosidHotel(idHotel: String):Observable<any>{
    return this._http.get(this.url + '/obtenerServicio/' +idHotel, { headers: this.headersVariable })
  }

  obtenerServicioID(idServicio:String,token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerServicioId/' + idServicio,{ headers: headersToken })
  }

  agregarServicio(modeloServicio:ServiciosModel,idHotel: String,token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloServicio)
    return this._http.post(this.url + '/agregarServicio/'+idHotel,parametros,{headers: headersToken})
  }

  editarServicio(modeloServicio:ServiciosModel,token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloServicio)
    return this._http.put(this.url + '/editarServicio/'+ modeloServicio._id,parametros,{headers: headersToken})
  }

  eliminarServicio(idServicio:String,token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + "/eliminarServicio/" + idServicio, { headers: headersToken })
  }

  reservarServicio(modeloServicio:ServiciosModel,token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloServicio)

    return this._http.put(this.url + '/reservarServicio/'+ modeloServicio._id,parametros,{headers:headersToken})
  }


  obtenerToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != undefined) {
      this.token = token2
    } else {
      this.token = "";
    }
    return this.token;
  }

  obtenerIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad') || '{}');
    if (identidad2 != undefined) {
      this.identidad = identidad2
    } else if (identidad2 == undefined) {
      this.identidad = null;
    }
    return this.identidad
  }


}

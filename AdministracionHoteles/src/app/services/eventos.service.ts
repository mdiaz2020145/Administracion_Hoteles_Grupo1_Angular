import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventosModel } from '../models/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token: any;
  public identidad: any;

  constructor(public _http: HttpClient) { }

  obtenerEventos(idHotel: String): Observable<any> {
    console.log(idHotel)
    return this._http.get(this.url + "/buscarEvento/" + idHotel, { headers: this.headersVariable })
  }
  obtenerEventosID(idEvento: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + "/buscarEventoPorID/" + idEvento, { headers: headersToken })
  }
  agregarEvento(modeloEvento: EventosModel, token: any) {
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEvento)
    return this._http.post(this.url + "/agregarEvento", parametros, { headers: headersToken })
  }
  editarEvento(modeloEvento: EventosModel, token: any) {
    modeloEvento.idAdmin = undefined
    modeloEvento.idHotel = undefined
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEvento)
    return this._http.put(this.url + "/editarEvento/" + modeloEvento._id, parametros, { headers: headersToken })
  }

  eliminarEvento(idEvento: String, token: any) {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + "/eliminarEvento/" + idEvento, { headers: headersToken })
  }

  reservarEvento(modeloEvento:EventosModel,token:any){
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEvento)

    return this._http.put(this.url + '/reservarEvento/' + modeloEvento._id,parametros,{headers:headersToken})
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

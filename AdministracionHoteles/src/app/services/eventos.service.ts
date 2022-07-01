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

  obtenerEventos(idHotel: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + "/buscarEvento/" + idHotel, { headers: headersToken })
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
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEvento)
    return this._http.put(this.url + "/editarEvento/" + modeloEvento._id, parametros, { headers: headersToken })
  }
  eliminarEvento(idEvento: String, token: any) {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + "/eliminarEvento/" + idEvento, { headers: headersToken })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { HotelesModule } from '../models/hoteles.model';


@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token: any;
  public identidad: any;

  constructor(public _http: HttpClient) { }

  obtenerHoteles(): Observable<any> {
    return this._http.get(this.url + '/buscarHotel', { headers: this.headersVariable })
  }
  // verificar
  obtenerHotelesPais(token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/buscarHotelPorPais', { headers: headersToken })
  }

  obtenerHotelesId(id:string, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/buscarHotelPorId/' + id, { headers: headersToken })
  }

  obtenerHotelesDisponibles(nombreHotel: String): Observable<any> {
    return this._http.post(this.url + '/buscarHotelDisponible', nombreHotel, { headers: this.headersVariable })
  }

  agregarHoteles(modeloHoteles: HotelesModule, token: any): Observable<any> {
    let parametros = JSON.stringify(modeloHoteles)
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.post(this.url + '/agregarHotel', parametros, { headers: headersToken })
  }

  editarHoteles(modeloHoteles: HotelesModule, token: any): Observable<any> {
    let parametros = JSON.stringify(modeloHoteles)
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/editarHotel/' + modeloHoteles._id, parametros, { headers: headersToken })
  }

  eliminarHoteles(id: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarHotel/' + id, { headers: headersToken })
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

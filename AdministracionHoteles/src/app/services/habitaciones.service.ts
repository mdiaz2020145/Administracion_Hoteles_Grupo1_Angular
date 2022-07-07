import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HabitacionesModel } from '../models/habitaciones.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public token: any;
  public identidad: any;

  constructor(public _http: HttpClient) { }

  obtenerHabitaciones(idHotel: String): Observable<any>{
    return this._http.get(this.url + "/buscarHabitaciones/" + idHotel, { headers: this.headersVariable })
  }

  agregarHabitaciones(idHotel: String, modelHabitacion: HabitacionesModel,  token: any): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modelHabitacion)
    return this._http.post(this.url +"/agregarHabitacion/"+ idHotel, parametros, { headers: headersToken })
  }

  editarHabitaciones(modelHabitacion:HabitacionesModel,  token: any): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modelHabitacion)
    return this._http.put(this.url + "/editarHabitacion/"+modelHabitacion._id, parametros, { headers: headersToken })
  }

  obtenerHabitacionesId(idHabitacion: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + "/buscarHabitacionId/" + idHabitacion, { headers: headersToken })
  }

  eliminarHabitaciones(idHabitacion: String, token: any): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + "/eliminarHabitacion/" + idHabitacion, { headers: headersToken })
  }

}

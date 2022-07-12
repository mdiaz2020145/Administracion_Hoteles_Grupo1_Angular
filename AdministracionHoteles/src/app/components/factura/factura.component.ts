import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [
    FacturaService, UsuariosService, HabitacionesService, ServiciosService, EventosService
  ]
})
export class FacturaComponent implements OnInit {

  facturaModelGet: Factura;
  facturaModelPost: Factura
  public token: any;
  public validation: Boolean = true;
  public idUsuario: any;
  public listaHabitacion: any;
  public listaEvento: any;
  public listaServicio: any;

  constructor(public _facturaServices: FacturaService, public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuariosService, public _habitacionService: HabitacionesService,
    public _serviciosService: ServiciosService, public _eventosService: EventosService) {
    this.facturaModelGet = new Factura(
      [{ idHabitacion: '' }],
      [{ idEvento: '' }],
      [{ idServicio: '' }],
      0, 0, 0, 0, ""
    )

    this.facturaModelPost = new Factura(
      [{ idHabitacion: '' }],
      [{ idEvento: '' }],
      [{ idServicio: '' }],
      0, 0, 0, 0, ""
    )
    this.token = _facturaServices.obtenerToken()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get("idUsuario"))
      this.getFactura(dataRuta.get("idUsuario"))
      //this.generarFactura()
      this.idUsuario = dataRuta.get("idUsuario")
    })
    this.datosFactura()
  }

  datosFactura() {
    this._usuarioService.obtenerUsuarioId(this.idUsuario, this.token).subscribe({
      next: (res) => {
        if (res.usuario == 0) {
          console.log("datos vacios")
        } else {
          this.listaHabitacion = JSON.parse(JSON.stringify(res.usuario.reservacionHabitacion))
          this.listaEvento = JSON.parse(JSON.stringify(res.usuario.reservacionEvento))
          this.listaServicio = JSON.parse(JSON.stringify(res.usuario.reservacionServicio))
        }
      },
      error: (err) => {
        console.log(<any>err)
      }
    })
  }

  obtenerHabitacionNombre(idHabitacion) {
    this._habitacionService.obtenerHabitacionesId(idHabitacion, this.token).subscribe({
      next: (res) => {
        if (res.habitacion == 0) {
          console.log("datos vacios")
        } else {
          return res.habitacion.numeroDeHabitacion
        }
      },
      error: (err) => {
        console.log(<any>err)
      }
    })
  }

  obtenerServicioNombre(idServicio) {
    this._serviciosService.obtenerServicioID(idServicio, this.token).subscribe({
      next: (res) => {
        if (res.Servicio == 0) {
          console.log("datos vacios")
        } else {
          return res.Servicio.nombreServicio
        }
      },
      error: (err) => {
        console.log(<any>err)
      }
    })
  }

  obtenerEventoNombre(idEvento) {
    this._eventosService.obtenerEventosID(idEvento, this.token).subscribe({
      next: (res) => {
        if (res.eventos == 0) {
          console.log("datos vacios")
        } else {
          return res.eventos.nombreEvento
        }
      },
      error: (err) => {
        console.log(<any>err)
      }
    })
  }

  getFactura(idUsuario) {
    console.log(idUsuario)
    this._facturaServices.obtenerFactura(idUsuario, this.token).subscribe(
      (response) => {
        if (response.factura == 0) {
          console.log("datos vacios")
          this.facturaModelGet = response.factura
          this.validation = false;
        } else {
          this.facturaModelGet = response.factura
          this.validation = true;
          console.log("si hay datos")
        }
        console.log(this.facturaModelGet)
      },
      (error) => {

        console.log(<any>error)
      }

    )
  }

  generarFactura() {
    this._facturaServices.generarFactura(this.facturaModelPost, this.token).subscribe(
      response => {
        this.getFactura(this.idUsuario)
      },
      error => {
        console.log("Hubo un error" + <any>error)
      }
    )
  }

}

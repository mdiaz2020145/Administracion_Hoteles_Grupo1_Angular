import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosModel } from 'src/app/models/servicios.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { HotelesService } from 'src/app/services/hoteles.service';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [ServiciosService]
})
export class ServiciosComponent implements OnInit {

  public servicioModelGet: ServiciosModel;
  public servicioModelGetId: ServiciosModel;
  public servicioModelPost: ServiciosModel;
  public token: any;
  public validation: Boolean = true;
  public idHotel: String;

  constructor(public _servicioServices: ServiciosService, public _activatedRoute: ActivatedRoute) {
    this.servicioModelPost = new ServiciosModel('', '', '', 0, '', '');
    this.servicioModelGetId = new ServiciosModel('', '', '', 0, '', '');
    this.token = _servicioServices.obtenerToken()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get("idHotel"))
      this.getServicios(dataRuta.get("idHotel"))
      this.idHotel = dataRuta.get("idHotel")
    })
  }

  getServicios(idHotel: any) {
    console.log(idHotel)
    this._servicioServices.obtenerServiciosidHotel(idHotel).subscribe(
      response => {
        if (response.servicios == 0) {
          console.log("datos vacios")
          this.servicioModelGet = response.servicios
          this.validation = false;
        } else {
          this.servicioModelGet = response.servicios
          this.validation = true;
          console.log("si hay datos")
        }
        console.log(this.servicioModelGet)
      },
      error => {
        console.log(<any>error)
      }

    )
  }

  getServiciosID(idServicio: any) {
    this._servicioServices.obtenerServicioID(idServicio, this.token).subscribe({
      next: (response) => {
        this.servicioModelGetId = response.Servicio;
        console.log("servicio: " + this.servicioModelGetId)
      },
      error: (err: any) => { console.log(err) }
    })
  }

  postServicio() {
    this._servicioServices.agregarServicio(this.servicioModelPost, this.idHotel, this.token).subscribe(
      response => {
        this.getServicios(this.idHotel)
      },
      error => {
        console.log("Hubo un error" + <any>error)
      }
    )
  }


  putServicio() {
    this._servicioServices.editarServicio(this.servicioModelGetId, this.token).subscribe(
      response => {
        this.getServicios(this.idHotel)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  deleteServicios(idServicio) {
    this._servicioServices.eliminarServicio(idServicio, this.token).subscribe(
      response => {
        this.getServicios(this.idHotel)
      },
      error => {
        console.log(<any>error)
      }
    )
    this.getServicios(this.idHotel)
  }


}

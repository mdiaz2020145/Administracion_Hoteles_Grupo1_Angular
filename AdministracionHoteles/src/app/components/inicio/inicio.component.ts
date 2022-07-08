import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelesModule as Hoteles } from 'src/app/models/hoteles.model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { HotelesService } from 'src/app/services/hoteles.service';
import { Buscar } from '../pipes/buscar-hotel.pipe';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [HotelesService]
})
export class InicioComponent implements OnInit {
  public hotelModelPost: Hoteles;
  public hotelModelGetId: Hoteles;
  public hotelModelGet: any;
  public token: any;
  public validation: Boolean = true;
  public buscar;

  constructor(public _hotelesService: HotelesService, public _habitacionesService: HabitacionesService) {
    this.hotelModelPost = new Hoteles("", "", "", "", "")
    this.hotelModelGetId = new Hoteles('', '', '', '', '')
    this.token = _hotelesService.obtenerToken();
  }



  ngOnInit(): void {
    this.getHoteles();

  }

  getHoteles() {
    this._hotelesService.obtenerHoteles().subscribe(
      response => {
        console.log(response)
        console.log('response.hoteles' + response.mensaje)
        if (response.mensaje == 0) {
          console.log("datos vacios")
        } else {
          this.hotelModelGet = response.mensaje
        }
        console.log(this.hotelModelGet)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getHotelesId(idHotel) {
    this._hotelesService.obtenerHotelesId(idHotel, this.token).subscribe({
      next: (response) => {
        this.hotelModelGetId = response.mensaje;
        console.log("console asdfasd" + this.hotelModelGetId)
      },
      error: (err: any) => { console.log(err) }
    })
  }

  postHotel(agregarHotelForm) {
    this._hotelesService.agregarHoteles(this.hotelModelPost, this.token).subscribe({
      next: (response) => {
        console.log("response datos" + response.mensaje.value)
        this.getHoteles()
        agregarHotelForm.reset()
      },
      error: (err: any) => { console.log(err) }
    })
  }

  putHotel() {
    this._hotelesService.editarHoteles(this.hotelModelGetId, this.token).subscribe({
      next: (response) => {
        this.getHoteles();
      },
      error: (err: any) => { console.log(err) }
    })
  }

  deleteHotel(idHotel) {
    this._hotelesService.eliminarHoteles(idHotel, this.token).subscribe({
      next: (response) => {
        console.log(response)
        if (response.mensaje == 0) {
          this.validation = false
        } else {
          this.validation = true
          this.getHoteles();
        }
      },
      error: (err: any) => { console.log(err) }
    })
  }
}

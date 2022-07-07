import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitacionesModel as Habitaciones } from 'src/app/models/habitaciones.model';
import { HotelesModule as Hoteles} from 'src/app/models/hoteles.model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { HotelesService } from 'src/app/services/hoteles.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [HotelesService]
})
export class HabitacionesComponent implements OnInit {

  public habitacionesModelGet: Habitaciones;
  public habitacionesModelGetId: Habitaciones;
  public habitacionesModelPost: Habitaciones;
  public token: any;
  public validation: Boolean = true;
  public idHotel:String;


  constructor(public _hotelesService: HotelesService, public _habitacionesService:HabitacionesService, public _activatedRoute: ActivatedRoute) {
    this.habitacionesModelGetId = new Habitaciones(' ', ' ',' ',0,true,' ',' ' )
    this.habitacionesModelPost = new Habitaciones('', '','',0,true,'','' )
    this.token = _hotelesService.obtenerToken();
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getHabitaciones(dataRuta.get('idHotel'))
      this.idHotel=dataRuta.get('idHotel')
    })
  }

  getHabitaciones(idHotel) {
    this._habitacionesService.obtenerHabitaciones(idHotel).subscribe(
      response => {
        if (response.habitaciones == 0) {
          console.log("datos vacios")
          this.habitacionesModelGet=response.habitaciones
          this.validation=false
        } else {
          this.habitacionesModelGet = response.habitaciones
          this.validation= true
        }
        console.log(this.habitacionesModelGet)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getHabitacionesId(idHabitacion) {
    this._habitacionesService.obtenerHabitacionesId(idHabitacion, this.token).subscribe({
      next: (response) => {
        this.habitacionesModelGetId = response.habitacion;
        console.log("habitacion: " + this.habitacionesModelGetId)
      },
      error: (err: any) => { console.log(err) }
    })
  }

  postHabitaciones(){
    this._habitacionesService.agregarHabitaciones (this.idHotel, this.habitacionesModelPost,this.token).subscribe(
      response => {
          this.getHabitaciones(this.idHotel)
      },
      error => {
        console.log("Hubo un error"+<any>error)
      }
    )
  }

  putHabitaciones(){
    this._habitacionesService.editarHabitaciones(this.habitacionesModelGetId, this.token).subscribe(
      response => {
        this.getHabitaciones(this.idHotel)
      },
      error=> {
        console.log(<any>error)
      }
    )
  }

  deleteHabitaciones(idHabitacion){
    this._habitacionesService.eliminarHabitaciones(idHabitacion, this.token).subscribe(
    response => {
      this.getHabitaciones(this.idHotel)
    },
    error => {

    }
      )
  }

}

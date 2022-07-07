import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosModel } from 'src/app/models/eventos.model';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventosService]
})
export class EventosComponent implements OnInit {
  public eventosModelPost: EventosModel;
  public eventosModelGetId: EventosModel;
  public eventosModelGet: any;
  public token: any;
  public validation: Boolean = true;
  public idHotel: any;

  constructor(public _eventosServices: EventosService, public _activatedRoute: ActivatedRoute) {
    this.eventosModelPost = new EventosModel("", "", "", 0, "", "")
    this.eventosModelGetId = new EventosModel("", "", "", 0, "", "")
    this.token = _eventosServices.obtenerToken()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get("idHotel"))
      this.getEventos(dataRuta.get("idHotel"))
      this.idHotel = dataRuta.get("idHotel")
    })
  }

  getEventos(idHotel: any) {
    console.log(idHotel)
    this._eventosServices.obtenerEventos(idHotel).subscribe({
      next: (res) => {
        console.log(res.eventos == 0)
        if (res.eventos == 0) {
          console.log("datos vacios")
          this.validation = false
          this.eventosModelGet = res.eventos
        } else {
          this.validation = true
          console.log(res.eventos)
          this.eventosModelGet = res.eventos
        }
      },
      error: (err: any) => { console.log(err) }
    })
  }

  getEventosID(idEvento: any) {
    this._eventosServices.obtenerEventosID(idEvento, this.token).subscribe({
      next: (res) => {
        console.log(res)
        console.log("editar")
        console.log(res.eventos)
        this.eventosModelGetId = res.eventos
      },
      error: (err: any) => { console.log(err) }
    })

  }

  postEventos(agregarEventoForm: any) {
    console.log(agregarEventoForm)
    this.eventosModelPost.idHotel = this.idHotel
    console.log(this.eventosModelPost)
    this._eventosServices.agregarEvento(this.eventosModelPost, this.token).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventos(this.idHotel)
        agregarEventoForm.reset()
      },
      error: (err: any) => { console.log(err) }
    })
  }

  putEventos() {
    this._eventosServices.editarEvento(this.eventosModelGetId, this.token).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventos(this.idHotel)
      },
      error: (err: any) => { console.log(err) }
    })
  }

  deleteEventos(idEvento: any) {
    this._eventosServices.eliminarEvento(idEvento, this.token).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventos(this.idHotel)
      },
      error: (err: any) => { console.log(err) }
    })
  }
}


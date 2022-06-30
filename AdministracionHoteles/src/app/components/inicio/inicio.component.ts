import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelesModule as Hoteles } from 'src/app/models/hoteles.model';
import { HotelesService } from 'src/app/services/hoteles.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [HotelesService]
})
export class InicioComponent implements OnInit {
  public postForm: FormGroup;
  public editForm: FormGroup;
  postRef: any;
  public hotelModelPost: Hoteles;
  public hotelModelGetId: Hoteles;
  public hotelModelGet: any;
  public token: any;
  public validation: Boolean = true;
  public contador: Number = 0;

  constructor(public _hotelesService: HotelesService, public formBuilder: FormBuilder) {
    this.hotelModelPost = new Hoteles("", "", "", "", "")
    this.hotelModelGetId = new Hoteles('','','','','')
    this.hotelModelGet = new Hoteles("", "", "", "", "")
    this.token = _hotelesService.obtenerToken();
    this.postForm = this.formBuilder.group({
      nombre: [''],
      direccion: [''],
      pais: [''],
    })
    this.editForm = this.formBuilder.group({
      nombre: [''],
      direccion: [''],
      pais: ['']
    })
  }



  ngOnInit(): void {
    this.getHoteles();

  }

  getHotelDisponible(nombreHotel: String) {
    this._hotelesService.obtenerHotelesDisponibles(nombreHotel).subscribe({
      next: (response: any) => {
        if (response.habitacion == 0) {
          this.validation = false;
          return this.contador
        } else {
          this.validation = true;
          console.log(response.habitacion)
          this.contador = response.habitacion
          return this.contador
        }
      },
      error: (err) => console.log(err)
    })
  }

  getHoteles() {
    this._hotelesService.obtenerHoteles().subscribe(
      response => {
        console.log(response)
        console.log('response.hoteles' + response.mensaje)
        if (response.mensaje != 0) {
          this.hotelModelGet = response.mensaje
        }
        console.log(this.hotelModelGet)
      },
      error => {
        console.log(<any>error)
      }
    )
  }
  
  /*getHotelesId(idHotel) {
    this._hotelesService.obtenerHotelesId(idHotel, this.token).subscribe({
      next: (response: any) => {
        if (response.mensaje == 0) {
          this.validation = false;
        } else {
          this.validation = true;
          this.postRef = response;
          console.log('postref' + this.postRef)
          this.editForm = this.formBuilder.group({
            nombre: [this.postRef.nombre],
            direccion: [this.postRef.direccion],
            pais: [this.postRef.pais]
          })
        }
        console.log('edit form' + this.editForm.value);
      },
      error: (err) => console.log(err)
    })
  }*/

  getHotelesId(idHotel) {
    this._hotelesService.obtenerHotelesId(idHotel,this.token).subscribe(
      (response)=>{
        if(response.hotel == 0){
          this.validation = false;
        }else{
          this.validation = true
          this.hotelModelGetId = response.hotel;
        }
        console.log(this.hotelModelGetId)
      },
      (error)=>{
        console.log(<any>error)
      }
    )


  }


  postHotel() {
    this._hotelesService.agregarHoteles(this.postForm.value, this.token).subscribe(
      (reponse) => {
        console.log(reponse)
        this.getHoteles()
        this.postForm.reset();
      },
      (error) => {
        console.log(<any>error)
      }
    )
  }

  putHotel() {
    this._hotelesService.editarHoteles(this.hotelModelGetId, this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.mensaje != 0) {
          this.hotelModelGet = response.mensaje
        }
      },
      error: (err) => console.log(err)
    })
  }

  deleteHotel(idHotel: String) {
    this._hotelesService.eliminarHoteles(idHotel, this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.mensaje == 0) {
          this.validation = false;
        } else {
          this.validation = true;
          this.getHoteles();
        }
      },
      error: (err) => console.log(err)
    })
  }

}

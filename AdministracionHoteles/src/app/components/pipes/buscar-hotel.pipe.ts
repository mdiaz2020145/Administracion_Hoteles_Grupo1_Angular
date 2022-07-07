import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'buscarHotel'
  })

  export class BuscarHotelPipe implements PipeTransform {
    transform(hoteles: any, buscarHotel: any):any {
        if(buscarHotel == undefined){
            return hoteles;
        }else{
            return hoteles.filter(hoteles =>{
                return hoteles.nombre.toLowerCase().includes(buscarHotel.toLowerCase());
            })
        }
    }
  }
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'buscar'
  })

  export class Buscar implements PipeTransform {
    transform(hoteles: any, buscar: any):any {
        if(buscar == undefined){
            return hoteles;
        }else{
            return hoteles.filter(hoteles =>{
                return hoteles.nombre.toLowerCase().includes(buscar.toLowerCase());
            })
        }
    }
  }
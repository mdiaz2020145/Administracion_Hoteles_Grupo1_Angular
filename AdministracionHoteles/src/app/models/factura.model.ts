export class Factura{
  constructor(
   public reservacion:[{
      idHabitacion:String
  }],
   public reservacionEvento:[{
    idEvento:String
  }],
   public reservacionServicio:[{
    idServicio:String
  }],
 public totalHabitacion:Number,
 public totalEvento:Number,
 public totalServicio:Number,
 public total:Number,
 public idUsuario:String
  ){}
}

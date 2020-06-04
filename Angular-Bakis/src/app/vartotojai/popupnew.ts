import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AtnaujintiVart, Imone } from './vartotojai.component';

@Component({
    selector: 'app-vartotojaipopupnew',
    templateUrl: './popupnew.html',
  })
  export class DialogOverviewExampleDialognew {
public elpastasTeisingas:boolean=true;
public neraimones:boolean=false;
    validacijos(): boolean {
      this.elpastasTeisingas = true;
      this.neraimones = false;
     if (this.vartatprideti.imonesid==undefined)
     {
       this.neraimones=true;
     }
      if( this.vartatprideti.pastas.indexOf('@')==-1){
        this.elpastasTeisingas = false;
      }
      if(!this.elpastasTeisingas || this.neraimones) {
        return false;
      }
      return true;
    }

    prideti(){
      if (this.validacijos()){
        this.dialogRef.close(this.vartatprideti);
      }
    }

  public vartatprideti: AtnaujintiVart = new AtnaujintiVart();
  public imones: Imone[];

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialognew>, 
      @Inject(MAT_DIALOG_DATA) public data: Imone[]

      ) { this.imones=data;
        
      }
  
    onNoClick(): void {
      // alert(this.vartatprideti.imonesid)
      this.dialogRef.close();
    }
  
  }

  
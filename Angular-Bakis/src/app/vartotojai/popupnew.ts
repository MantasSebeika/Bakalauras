import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AtnaujintiVart, Imone } from './vartotojai.component';

@Component({
    selector: 'app-vartotojaipopupnew',
    templateUrl: './popupnew.html',
  })
  export class DialogOverviewExampleDialognew {
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

  
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { AtnaujintiVart } from './vartotojai.component';

@Component({
    selector: 'app-vartotojaipopupnew',
    templateUrl: './popupnew.html',
  })
  export class DialogOverviewExampleDialognew {
  public vartatprideti: AtnaujintiVart = new AtnaujintiVart();
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialognew>,
      ) { 
        
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  
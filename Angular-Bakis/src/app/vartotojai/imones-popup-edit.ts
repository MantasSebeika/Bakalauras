import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { Imone } from './vartotojai.component';

@Component({
    selector: 'app-imones-popup-edit',
    templateUrl: './imones-popup-edit.html',
  })
  export class ImoneRedaguoti {
  public imoneredag: Imone;
    constructor(
      public dialogRef: MatDialogRef<ImoneRedaguoti>,
      @Inject(MAT_DIALOG_DATA) public nauj: Imone) {
       this.imoneredag=nauj;
  
  
        
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  
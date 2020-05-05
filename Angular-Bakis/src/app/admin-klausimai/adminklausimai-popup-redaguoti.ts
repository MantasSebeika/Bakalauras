import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject, Component } from '@angular/core';
import { Atsakymas } from './admin-klausimai.component';

@Component({
    selector: 'app-klausimaipopupredaguoti',
    templateUrl: './adminklausimai-popup-redaguoti.html',
  })
  export class KlausimaiRedaguoti {
  public klausimasredaguoti: Atsakymas;
    constructor(
      public dialogRef: MatDialogRef<KlausimaiRedaguoti>,

       @Inject(MAT_DIALOG_DATA) public nauj: Atsakymas) { 
        this.klausimasredaguoti=nauj;
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  
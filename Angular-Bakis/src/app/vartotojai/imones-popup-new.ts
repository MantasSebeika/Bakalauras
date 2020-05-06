import { MatDialogRef} from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Imone } from './vartotojai.component';

@Component({
    selector: 'app-imones-popup-new',
    templateUrl: './imones-popup-new.html',
  })
  export class ImonePrideti {
  public imoneprideti: Imone = new Imone();
    constructor(
      public dialogRef: MatDialogRef<ImonePrideti>,
      ) { 
        
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

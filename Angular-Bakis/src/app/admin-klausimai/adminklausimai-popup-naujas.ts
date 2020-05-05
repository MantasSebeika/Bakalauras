import { MatDialogRef} from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Atsakymas } from './admin-klausimai.component';

@Component({
    selector: 'app-klausimaipopupnaujas',
    templateUrl: './adminklausimai-popup-naujas.html',
  })
  export class KlausimasPrideti {
  public klausimasprideti: Atsakymas = new Atsakymas();
    constructor(
      public dialogRef: MatDialogRef<KlausimasPrideti>,
      ) { 
        
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  
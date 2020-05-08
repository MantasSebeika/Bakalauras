import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { AtnaujintiVart } from './vartotojai.component';

@Component({
    selector: 'app-vartotojaipopup',
    templateUrl: './popup.html',
  })
  export class DialogOverviewExampleDialog {
  public vartatnaujinti: AtnaujintiVart;
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public nauj: AtnaujintiVart) {
       this.vartatnaujinti=nauj;
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  
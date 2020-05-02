import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



// export interface DialogData {
//   animal: string;
//   name: string;
// }

// @Component({
//   selector: 'app-vartotojai',
//   templateUrl: './popup.html',
// })
// export class DialogOverviewExample {

//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       width: '250px',
//       data: {name: this.name, animal: this.animal}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }

// }

// @Component({
//   selector: 'app-vartotojai',
//   templateUrl: './popup.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }

@Component({
  selector: 'app-vartotojai',
  templateUrl: './vartotojai.component.html',
  styleUrls: ['./vartotojai.component.scss']
})
export class VartotojaiComponent implements OnInit {



  istrinti(id: string) {


    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/vartotojai/delete", `{"id":"${id}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
}

  public imonespavadinimas: Imone[];

  constructor(private client: HttpClient, private cookies: CookieService) { }

  ngOnInit(): void {
    this.imonespavadinimas = new Array<Imone>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.get<Vartotojaidto[]>("http://localhost:8081/vartotojai").subscribe(resp => {
      resp.forEach(dto => {

        var nauj = new AtnaujintiVart();
        nauj.id = dto.id;
        // nauj.imonesid = dto.id;
        nauj.pastas = dto.pastas
        nauj.slaptazodis = dto.slaptazodis;


        if (this.imonespavadinimas.findIndex(imonespavadinimas => imonespavadinimas.imonespavadinimas == dto.imonespavadinimas) == -1) {
          var vart = new Array<AtnaujintiVart>();
          vart.push(nauj);

          var atvar = new Imone();
          atvar.imonespavadinimas = dto.imonespavadinimas;
          atvar.vartotojai = vart;

          this.imonespavadinimas.push(atvar);
        } else {
          var atvarIndex = this.imonespavadinimas.findIndex(imonespavadinimas => imonespavadinimas.imonespavadinimas == dto.imonespavadinimas);
          var atvar = this.imonespavadinimas.find(imonespavadinimas => imonespavadinimas.imonespavadinimas == dto.imonespavadinimas);

          atvar.vartotojai.push(nauj);

          this.imonespavadinimas[atvarIndex] = atvar;

        }

      })
    });
  }

}
export class AtnaujintiVart {
  public imonesid: string;
  public id: string;
  public pastas: string;
  public slaptazodis: string;
}

export class Imone {
  public imonespavadinimas: string;
  public vartotojai: AtnaujintiVart[];
}

export class Vartotojaidto {
  public id: string;
  public imonespavadinimas: string;
  public pastas: string;
  public slaptazodis: string;

}
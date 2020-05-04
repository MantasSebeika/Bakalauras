import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './popup';
import { DialogOverviewExampleDialognew } from './popupnew';


@Component({
  selector: 'app-vartotojai',
  templateUrl: './vartotojai.component.html',
  styleUrls: ['./vartotojai.component.scss']
})
export class VartotojaiComponent implements OnInit {

  iskvietipopupnew(){
  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialognew, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var naujas: AtnaujintiVart=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/vartotojai/new", `{"imonespavadinimas":"${naujas.imonespavadinimas}", "pastas":"${naujas.pastas}", "slaptazodis":"${naujas.slaptazodis}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }

iskvietipopup(vartotojas: AtnaujintiVart){
  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: vartotojas
    });

    dialogRef.afterClosed().subscribe(result => {
      var atnaujinti: AtnaujintiVart=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/vartotojai/update", `{"id":"${atnaujinti.id}", "pastas":"${atnaujinti.pastas}", "slaptazodis":"${atnaujinti.slaptazodis}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }

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

  constructor(private client: HttpClient, private cookies: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.imonespavadinimas = new Array<Imone>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.get<Vartotojaidto[]>("http://localhost:8081/vartotojai").subscribe(resp => {
      resp.forEach(dto => {

        var nauj = new AtnaujintiVart();
        nauj.id = dto.id;
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
  public imonespavadinimas: string;
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
import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './popup';
import { DialogOverviewExampleDialognew } from './popupnew';
import { ImonePrideti } from './imones-popup-new';
import { ImoneRedaguoti } from './imones-popup-edit';

@Component({
  selector: 'app-vartotojai',
  templateUrl: './vartotojai.component.html',
  styleUrls: ['./vartotojai.component.scss']
})
export class VartotojaiComponent implements OnInit {


  eksportuoti(id: string, imonespavadinimas: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/excelgenerate", `{"imonesid":"${id}","imonespavadinimas":"${imonespavadinimas}" }`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
}



  redaguotiimone(imones: Imone){
  
    const dialogRef = this.dialog.open(ImoneRedaguoti, {
      width: '250px',
      data: imones
    });

    dialogRef.afterClosed().subscribe(result => {
      var atnaujinti: Imone=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/imones/update", `{"id":"${atnaujinti.imonesid}", "imonespavadinimas":"${atnaujinti.imonespavadinimas}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }

  pridetiimone(){
  
    const dialogRef = this.dialog.open(ImonePrideti, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var naujas: Imone=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/imones/new", `{"imonespavadinimas":"${naujas.imonespavadinimas}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }

  istrintiimone(id: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/imones/delete", `{"id":"${id}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
}

  iskvietipopupnew(){
  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialognew, {
      width: '250px', data: this.imones
    });

    dialogRef.afterClosed().subscribe(result => {
      var naujas: AtnaujintiVart=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/vartotojai/new", `{"imonesid":"${naujas.imonesid}", "pastas":"${naujas.pastas}", "slaptazodis":"${naujas.slaptazodis}"}`, { headers: headers }).subscribe(resp => {
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

  public imones: Imone[];

  constructor(private client: HttpClient, private cookies: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.imones = new Array<Imone>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.get<Imonedto[]>("http://localhost:8081/imones").subscribe(resp => {
    
    
      
    resp.forEach(dto => {

    var imone= new Imone();
    imone.imonesid = dto.id
    imone.imonespavadinimas = dto.imonespavadinimas
    imone.vartotojai=new Array<AtnaujintiVart>()
    this.imones.push(imone)
    }
            )

            this.client.get<Vartotojaidto[]>("http://localhost:8081/vartotojai").subscribe(resp => {
        resp.forEach(dto => {
          
          var nauj = new AtnaujintiVart();
          
          nauj.id = dto.id;
          nauj.pastas = dto.pastas
          nauj.slaptazodis = dto.slaptazodis
         var imone =  this.imones.find(i => i.imonesid==dto.imonesid)
    imone.vartotojai.push(nauj)
    var imoneindex =  this.imones.findIndex(i => i.imonesid==dto.imonesid)
    this.imones[imoneindex]=imone
        }
        )}
      )


          })
        }
      }

export class AtnaujintiVart {
  public imonesid: string;
  public id: string;
  public pastas: string;
  public slaptazodis: string;
}

export class Imone {
  public imonesid: string;
  public imonespavadinimas: string;
  public vartotojai: AtnaujintiVart[];
}

export class Vartotojaidto {
  public imonesid: string;
  public id: string;
  public pastas: string;
  public slaptazodis: string;

}

export class Imonedto {
  public id: string;
  public imonespavadinimas: string;
}
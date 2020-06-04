import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './popup';
import { DialogOverviewExampleDialognew } from './popupnew';
import { ImonePrideti } from './imones-popup-new';
import { ImoneRedaguoti } from './imones-popup-edit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vartotojai',
  templateUrl: './vartotojai.component.html',
  styleUrls: ['./vartotojai.component.scss']
})
export class VartotojaiComponent implements OnInit {

  
 
  eksportuoti(id: string, imonespavadinimas: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    this.client.get("http://localhost:8081/excelgenerate/"+id+"/"+imonespavadinimas.replace(' ','_')).subscribe((resp) => {
      this.router.navigate([]).then(result => {  window.open("http://localhost:8081/excel/"+id+"/"+imonespavadinimas.replace(' ','_'), '_blank'); });   
    }, err => {
     console.log(err.message)
      
     
    }
    )
}
//   eksportuoti(id: string, imonespavadinimas: string) {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
//     this.client.post("http://localhost:8081/excelgenerate", `{"imonesid":"${id}","imonespavadinimas":"${imonespavadinimas}"}`, { responseType: 'blob' as 'json',headers:headers }).subscribe((response: any) => {
//       let dataType = response.type;
//       let binaryData = [];
//       binaryData.push(response);
//     const blob = new Blob(binaryData, {type: dataType})
//       const url= window.URL.createObjectURL(blob);
//       window.open(url);
  
        
//     }, err => {
//      console.log(err.message)
      
     
//     }
//     )
// }



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
        alert("Duomenys atnaujinti")
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
        alert("Įmonė pridėta")
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
        alert("Įmonė ištrinta")
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
    this.client.post("http://localhost:8081/vartotojai/new", `{"imonesid":"${naujas.imonesid}", "pastas":"${naujas.pastas}", "slaptazodis":"${naujas.slaptazodis}", "statusas":"${naujas.statusas}", "vardas":"${naujas.vardas}", "pareigos":"${naujas.pareigos}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        alert("Vartotojas sukurtas")
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
    this.client.post("http://localhost:8081/vartotojai/update", `{"id":"${atnaujinti.id}", "pastas":"${atnaujinti.pastas}", "slaptazodis":"${atnaujinti.slaptazodis}", "statusas":"${atnaujinti.statusas}", "vardas":"${atnaujinti.vardas}", "pareigos":"${atnaujinti.pareigos}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        alert("Vartotojo duomenys atnaujinti")
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
        alert("Vartotojas ištrintas")
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
}

  public imones: Imone[];

  constructor(private client: HttpClient, private cookies: CookieService, public dialog: MatDialog, private router: Router) { }

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
          nauj.statusas = dto.statusas
          nauj.vardas = dto.vardas
          nauj.pareigos = dto.pareigos
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
  public statusas: boolean;
  public vardas: string;
  public pareigos: string;
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
  public statusas: boolean;
  public vardas: string;
  public pareigos: string;

}

export class Imonedto {
  public id: string;
  public imonespavadinimas: string;
}
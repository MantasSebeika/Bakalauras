import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { KlausimasPrideti } from './adminklausimai-popup-naujas';
import { KlausimaiRedaguoti } from './adminklausimai-popup-redaguoti';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-admin-klausimai',
  templateUrl: './admin-klausimai.component.html',
  styleUrls: ['./admin-klausimai.component.scss']
})
export class AdminKlausimaiComponent implements OnInit {
  
  public kraunasi:boolean=false;

  redaguotiklausima(klausimas: Atsakymas){
  
    const dialogRef = this.dialog.open(KlausimaiRedaguoti, {
      width: '250px',
      data: klausimas
    });

    dialogRef.afterClosed().subscribe(result => {
      var atnaujinti: Atsakymas=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/klausimai/update", `{"id":"${atnaujinti.klausimoid}", "kategorija":"${atnaujinti.kategorija}", "klausimas":"${atnaujinti.klausimas}", "rekomendacijane":"${atnaujinti.rekomendacijane}", "rekomendacijataip":"${atnaujinti.rekomendacijataip}",  "identifikuotarizika":"${atnaujinti.identifikuotarizika}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        alert("Duomenys pakeisti")
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }


  pridetiklausima(){
  
    const dialogRef = this.dialog.open(KlausimasPrideti, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var naujas: Atsakymas=result;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/klausimai/new", `{"kategorija":"${naujas.kategorija}", "klausimas":"${naujas.klausimas}", "rekomendacijane":"${naujas.rekomendacijane}", "rekomendacijataip":"${naujas.rekomendacijataip}",  "identifikuotarizika":"${naujas.identifikuotarizika}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        alert("Klausimas pridėtas")
this.ngOnInit();
      }
      else
        alert("Neteisingi duomenys")
          
        
    }
    )
    });
  }


  istrintiklausima(klausimoid: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/klausimai/delete", `{"id":"${klausimoid}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        alert("Klausimas ištrintas")
        this.ngOnInit();
        // this.client.post<boolean>
      }
      else
        alert("Neteisingi duomenys")
        
    }
    )
}

  mygtukas(kategorija: string, id: string, reiksme: string) {

    var katIndex = this.kategorijos.findIndex(kategorijaats => kategorijaats.kategorija == kategorija);
    var kat = this.kategorijos.find(kategorijaats => kategorijaats.kategorija == kategorija);

    var klausIndex = kat.klausimai.findIndex(Klausimas => Klausimas.klausimoid == id);

    kat.klausimai[klausIndex].atsakymas = reiksme;

    this.kategorijos[katIndex] = kat;

  }
  public kategorijos: Kategorija[];

  constructor(private client: HttpClient, private cookies: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.kraunasi=true;
    this.kategorijos = new Array<Kategorija>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post<Klausimasdto[]>("http://localhost:8081/klausimaiadmin",`{"vartotojoid": "${this.cookies.get("loginas")}"}`, { headers: headers }).subscribe(resp => {
      resp.forEach(dto => {

        var ats = new Atsakymas();
        ats.klausimoid = dto.id;
        ats.vartotojoid = this.cookies.get("loginas");
        ats.atsakymas = dto.atsakymas;

        if (dto.komentarai == undefined) {
          dto.komentarai = "";
        }

        ats.komentaras = dto.komentarai;
        ats.klausimas = dto.klausimas;
        ats.tipas = dto.tipas;

        if (this.kategorijos.findIndex(kategorija => kategorija.kategorija == dto.kategorija) == -1) {
          var klArr = new Array<Atsakymas>();
          klArr.push(ats);

          var kat = new Kategorija();
          kat.kategorija = dto.kategorija;
          kat.klausimai = klArr;

          this.kategorijos.push(kat);
        } else {
          var katIndex = this.kategorijos.findIndex(kategorija => kategorija.kategorija == dto.kategorija);
          var kat = this.kategorijos.find(kategorija => kategorija.kategorija == dto.kategorija);

          kat.klausimai.push(ats);

          this.kategorijos[katIndex] = kat;

        }
      })
      this.kraunasi=false;
    });
  }

}
export class Atsakymas {
  public klausimoid: string;
  public vartotojoid: string;
  public atsakymas: string;
  public komentaras: string;
  public klausimas: string;
  public tipas: string;
  public kategorija: string;
  public rekomendacijane: string;
  public rekomendacijataip: string;
  public identifikuotarizika: string;
}

export class Kategorija {
  public kategorija: string;
  public klausimai: Atsakymas[];
}

export class Klausimasdto {
  public id: string;
  public atsakymas: string;
  public komentarai: string;
  public kategorija: string;
  public subkategorija: string;
  public klausimas: string;
  public tipas: string;
}
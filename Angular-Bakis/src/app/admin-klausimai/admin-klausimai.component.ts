import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-klausimai',
  templateUrl: './admin-klausimai.component.html',
  styleUrls: ['./admin-klausimai.component.scss']
})
export class AdminKlausimaiComponent implements OnInit {
  
  istrintiklausima(klausimoid: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/klausimai/delete", `{"id":"${klausimoid}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {

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

  constructor(private client: HttpClient, private cookies: CookieService) { }

  ngOnInit(): void {
    this.kategorijos = new Array<Kategorija>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post<Klausimasdto[]>("http://localhost:8081/klausimai",`{"vartotojoid": "${this.cookies.get("loginas")}"}`, { headers: headers }).subscribe(resp => {
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
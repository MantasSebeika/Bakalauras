import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-klausimynas',
  templateUrl: './klausimynas.component.html',
  styleUrls: ['./klausimynas.component.scss']
})
export class KlausimynasComponent implements OnInit {

  public kategorijos: Kategorija[];

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.kategorijos = new Array<Kategorija>();

    this.client.get<Klausimasdto[]>("http://localhost:8081/klausimai").subscribe(resp => {
      resp.forEach(dto => {

        var kl = new Klausimas();
        kl.id = dto.id;
        kl.klausimas = dto.klausimas;
        kl.tipas = dto.tipas;

        if (this.kategorijos.findIndex(kategorija => kategorija.kategorija == dto.kategorija) == -1) {
          var klArr = new Array<Klausimas>();
          klArr.push(kl);

          var kat = new Kategorija();
          kat.kategorija = dto.kategorija;
          kat.klausimai = klArr;

          this.kategorijos.push(kat);
        } else {
          var katIndex = this.kategorijos.findIndex(kategorija => kategorija.kategorija == dto.kategorija);
          var kat = this.kategorijos.find(kategorija => kategorija.kategorija == dto.kategorija);

          kat.klausimai.push(kl);

          this.kategorijos[katIndex] = kat;

        }
      })
    });
  }

}

export class Klausimas {
  public id: string;
  public klausimas: string;
  public tipas: string;
}

export class Kategorija {
  public kategorija: string;
  public klausimai: Klausimas[];
}

export class Klausimasdto {
  public id: string;
  public kategorija: string;
  public subkategorija: string;
  public klausimas: string;
  public tipas: string;
}
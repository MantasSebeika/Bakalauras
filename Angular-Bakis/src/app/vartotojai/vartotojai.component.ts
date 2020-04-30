import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vartotojai',
  templateUrl: './vartotojai.component.html',
  styleUrls: ['./vartotojai.component.scss']
})
export class VartotojaiComponent implements OnInit {

  public imonespavadinimas: Imone[];

  constructor(private client: HttpClient, private cookies: CookieService) { }

  ngOnInit(): void {
//     this.imonespavadinimas = new Array<Imone>();
//     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
//     this.client.post<Vartotojaidto[]>("http://localhost:8081/klausimai",`{"vartotojoid": "${this.cookies.get("loginas")}"}`, { headers: headers }).subscribe(resp => {
//       resp.forEach(dto => {

//         var vart = new 

//   //       // if (this.imonespavadinimas.findIndex(imonespavadinimas => imonespavadinimas.imonespavadinimas == dto.imonespavadinimas) == -1) {
//   //       //   var vart = new Array<Vartotojai>();
//   //       //   klArr.push(ats);

//   //       //   var kat = new Kategorija();
//   //       //   kat.kategorija = dto.kategorija;
//   //       //   kat.klausimai = klArr;

//   //       //   this.kategorijos.push(kat);
//   //       // } else {
//   //       //   var katIndex = this.kategorijos.findIndex(kategorija => kategorija.kategorija == dto.kategorija);
//   //       //   var kat = this.kategorijos.find(kategorija => kategorija.kategorija == dto.kategorija);

//   //       //   kat.klausimai.push(ats);

//   //       //   this.kategorijos[katIndex] = kat;

//   //       // }

//   // })
// });
    }
  
  }


export class Imone {
  public imonespavadinimas: string;
  public vartotojai: Imone[];
}

export class Vartotojaidto {
  public imonespavadinimas: string;
  public pastas: string;
  public slaptazodis: string;

}
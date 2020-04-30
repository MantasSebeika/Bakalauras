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
    this.imonespavadinimas = new Array<Imone>();
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post<Vartotojaidto[]>("http://localhost:8081/klausimai",`{"vartotojoid": "${this.cookies.get("loginas")}"}`, { headers: headers }).subscribe(resp => {
      resp.forEach(dto => {

        var nauj = new AtnaujintiVart();
        nauj.imonesid = dto.id;
        nauj.pastas = this.cookies.get("loginas");
        nauj.imonespavadinimas = dto.imonespavadinimas;
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
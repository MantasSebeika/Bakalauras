import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-prisijungimas-admin',
  templateUrl: './prisijungimas-admin.component.html',
  styleUrls: ['./prisijungimas-admin.component.scss']
})
export class PrisijungimasAdminComponent implements OnInit {
  hide = true;

  public email: Email;
  public slaptazodis: Slaptazodis;
  constructor(private client: HttpClient, private cookies: CookieService, private route: Router) { }

  ngOnInit(): void {
    this.email = new Email;
    this.slaptazodis = new Slaptazodis;

  }
  prisijungtiadmin() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post<boolean>("http://localhost:8081/prisijungtiadmin", `{"pastas": "${this.email.email}", "slaptazodis":"${this.slaptazodis.slaptazodis}"}`, { headers: headers }).subscribe(resp => {
      if (resp) {
        this.cookies.delete("loginas")
        this.cookies.set("loginasAdmin", this.email.email)
        this.route.navigateByUrl("/admin_home")
      }
      else
        alert("Neteisingi duomenys")
    })
  }
  }


export class Email {
  public email: string;
  invalid() {
    return true
  }
}
export class Slaptazodis {
  public slaptazodis: string;
  invalid() {
    return true

  }
}




import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prisijungimas',
  templateUrl: './prisijungimas.component.html',
  styleUrls: ['./prisijungimas.component.scss']
})
export class PrisijungimasComponent implements OnInit {
  hide = true;
  public email: Email;
  public slaptazodis: Slaptazodis;
  constructor(private client: HttpClient, private cookies: CookieService, private route: Router) { }

  ngOnInit(): void {
    this.email = new Email;
    this.slaptazodis = new Slaptazodis;
    

  }
  prisijungti() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    this.client.post("http://localhost:8081/prisijungti", `{"pastas": "${this.email.email}", "slaptazodis":"${this.slaptazodis.slaptazodis}"}`, { headers: headers }).subscribe(resp => {
    // alert(resp["statusas"]); 
    if (resp["imonesid"]!="" && resp["statusas"]=="true") {
        this.cookies.delete ("loginasAdmin")
        this.cookies.set("loginas", this.email.email)
        this.cookies.set("imonesid", resp["imonesid"])
        this.route.navigateByUrl("/klausimynas")
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
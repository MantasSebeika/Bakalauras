import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public klausimai:Klausimas[];

  constructor(private router:Router, private http:HttpClient, private cookies: CookieService) { }
  
  virsus() { 
    window.scrollTo(0, 0); 
    }

  ngOnInit(): void {
  }

  kelias(){
    this.router.navigateByUrl("Test2");
    
  } 

  atsijungti() {
    this.cookies.delete("loginas")
    this.cookies.delete("loginasAdmin")
  }

  adminklausimynas() {
    var adminsausianiukas = this.cookies.get("loginasAdmin")
        if (adminsausianiukas != "")
        this.router.navigateByUrl("/admin_klausimai")
        
        else  
        
          this.router.navigateByUrl("/klausimynas")
        
        
  }

  adminpradzia() {
    var adminsausianiukas = this.cookies.get("loginasAdmin")
        if (adminsausianiukas != "")
        this.router.navigateByUrl("/admin-home")
        
        else  
        
          this.router.navigateByUrl("/")
        
  }


  nerodyti() {
    var sausainiukas = this.cookies.get("loginas")
    var adminsausianiukas = this.cookies.get("loginasAdmin")
        if (sausainiukas != "" || adminsausianiukas != "" )
            return true;
        else 
        {
            return false;
        }
  }
  
  pastas() {
return this.cookies.get("loginas");

  }

}
export class Klausimas {
  public id: string;
  public klausimas: string;
  public kategorija: string;
  public subkategorija: string;
  public tipas: string;
}
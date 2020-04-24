import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public klausimai:Klausimas[];

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.backas();
  }

  kelias(){
    this.router.navigateByUrl("Test2");
    
  } 
  backas(){
    this.http.get("http://localhost:8081/klausimai").subscribe((data: Klausimas[]) =>
      this.klausimai=data
  );
  }
}
export class Klausimas {
  public id: string;
  public klausimas: string;
  public kategorija: string;
  public subkategorija: string;
  public tipas: string;
}
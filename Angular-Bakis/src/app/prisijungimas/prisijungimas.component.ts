import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prisijungimas',
  templateUrl: './prisijungimas.component.html',
  styleUrls: ['./prisijungimas.component.scss']
})
export class PrisijungimasComponent implements OnInit {
  hide = true;
  public email: Email;
public slaptazodis: Slaptazodis;
  constructor() { }

  ngOnInit(): void {
  }

}
export class Email {
  public email: string;
  invalid(){
    return true
  }
}
export class Slaptazodis {
  public slaptazodis: string;
  invalid(){
    return true
    
  }
}
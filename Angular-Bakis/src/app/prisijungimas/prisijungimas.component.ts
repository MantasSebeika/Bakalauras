import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prisijungimas',
  templateUrl: './prisijungimas.component.html',
  styleUrls: ['./prisijungimas.component.scss']
})
export class PrisijungimasComponent implements OnInit {
public email: string;
  constructor() { }

  ngOnInit(): void {
  }

}

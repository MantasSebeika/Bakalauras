import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
// import 'rxjs/Rx';
// import {Observable} from 'rxjs';

@Injectable()

export class FileService {
  
constructor(private _http:HttpClient){}

    downloadFile(file:String){
        var body = {filename:file}; 

return this._http.post("http://localhost:8081/excelgenerate",body,{
    responseType : 'blob',
    headers : new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')

})
    }
}
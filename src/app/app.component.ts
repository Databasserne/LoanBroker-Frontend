import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LoanBroker';
  showResult: boolean = false;
  spin: boolean = false;
  inputModel: any = {};
  loanInfo: any = {};
  
  constructor(private http: Http) {}

  ngOnInit() {}

  submit() {
    this.showResult = false;
    this.spin = true;
    this.doHttp().subscribe(result => {
      this.spin = false;
      console.log("Test", result);
      this.loanInfo = result;
    });
    
  }

  private doHttp() {
    let options = new RequestOptions({headers: this.getHeaders()});
    return this.http.post(`${environment.baseApi}/api/interest`, 
    { 
      "SSN": this.inputModel.ssn, 
      "Amount": this.inputModel.amount, 
      "Duration": this.inputModel.duration
    }, options)
    .map((response: Response) => {
      this.showResult = true;
      return response.json();
    });
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return headers;
  }
}

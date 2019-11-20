import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {Employee} from '../shared/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date = new Date() ;
  ipAddress: any;
  employee: Employee[] = [] ;

  constructor(private http: HttpClient , private service: UserService, private router: Router) {
    this.http.get<{ip: string}>('https://jsonip.com')
      .subscribe( data => {
        this.ipAddress = data;
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.service.getEmployees().subscribe((data: any) => {
      console.log(data);

      for (const entry of data) {
        if (entry.IsActive === true) {
          this.employee.push(entry);
        }
      }
    });
    console.log(this.employee);
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/signin']);
  }

  reload() {
    window.location.reload();
  }
}

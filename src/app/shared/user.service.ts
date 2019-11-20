import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './employee';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = environment.remote_server;

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    console.log(user.Password)
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      Id: user.Id
    };
    const response =  this.http.post(this.rootUrl + '/api/account/register', body);
    console.log(response);
    return response;
  }
  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getEmployees() {
    return  this.http.get(this.rootUrl + '/api/employee'
    , {headers: new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('userToken')})});
  }
}

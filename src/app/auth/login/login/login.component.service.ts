import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

interface LoginPayload {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/auth/login'; // Replace with your real API endpoint

  constructor(private http: HttpClient) {
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}

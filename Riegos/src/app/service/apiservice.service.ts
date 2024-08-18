import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private apiUrl ='http://localhost:5000';

  constructor(private http: HttpClient) { }

  getClientes():Observable<any>{
    return this.http.get(`${this.apiUrl}/clientes`);
  }

  addCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientead`, cliente);
  }
  
  
  getConfiguracion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/configuracion`);
  }

  addConfiguracion(configData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/configuracion`, configData);
  }
  
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiserviceService } from '../service/apiservice.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,RouterLink],
})
export class HomePage {
  clientes: any[] = [];
  configuraciones: any[] = [];
  constructor(private apiserviceService: ApiserviceService) {}
  ngOnInit(){
    this.apiserviceService.getClientes().subscribe(data=>{
      this.clientes=data;
    });

    this.apiserviceService.getConfiguracion().subscribe(data => {
      this.configuraciones = data;
    });
  }
  addCliente() {
    const nuevoCliente = { nombre: 'John', apellido: 'Doe', direccion: '123 Main St' };
    this.apiserviceService.addCliente(nuevoCliente).subscribe(response => {
      console.log('Cliente añadido:', response);
    });
  }
}

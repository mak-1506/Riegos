import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service'; // Asegúrate de importar tu servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ConfigurationPage implements OnInit {
  clienteId: string = '';
  area: string = '';
  hum_min: string = '';
  hum_max: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService, // Asegúrate de inyectar el servicio
    private router: Router
  ) {}

  ngOnInit() {
    // Capturar el parámetro 'id' de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteId = id;
      console.log(`Cliente ID recibido: ${this.clienteId}`);
    } else {
      console.error('No se encontró un ID de cliente en la URL');
    }
  }

  submitForm() {
    const configData = {
      id_cliente: this.clienteId,
      area: this.area,
      hum_min: this.hum_min,
      hum_max: this.hum_max
    };
     console.log(configData);
    this.apiService.addConfiguracion(configData).subscribe({
      next: (response) => {
        console.log('Configuración guardada con éxito:', response);
        // Navegar de vuelta a la página de clientes
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Error al guardar la configuración:', error);
      }
    });
  }
}

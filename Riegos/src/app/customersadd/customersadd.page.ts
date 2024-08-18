import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-customersadd',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './customersadd.page.html',
  styleUrls: ['./customersadd.page.scss'],
})
export class CustomersaddPage {
  nuevoCliente = {
    nombres: '',
    apellidos: '',
    direccion: ''
  };

  constructor(private apiService: ApiserviceService, private alertController: AlertController, private router: Router) {}

  submitForm() {
    const observer: Observer<any> = {
      next: async (response: any) => {
        console.log('Respuesta del servidor:', response);

        // Verifica que response.id exista
        const clienteId = response.id;

        if (clienteId) {
          console.log('Cliente Guardado:', clienteId);

          // Mostrar alerta para preguntar si desea agregar configuración
          const alert = await this.alertController.create({
            header: 'Configuración',
            message: '¿Desea agregar una configuración para este cliente?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  // Redirigir a la página de clientes
                  this.router.navigate(['/customers']);
                }
              },
              {
                text: 'Sí',
                handler: () => {
                  // Redirigir a la página de configuración con el ID del cliente
                  this.router.navigate(['/configuration', clienteId]);
                }
              }
            ]
          });

          await alert.present();
        } else {
          console.error('El ID del cliente es indefinido');
        }
      },
      error: (error: any) =>{
        console.error('Error al añadir cliente:', error);
      },
      complete: () => {
        console.log('Operación completada');
      }
    };

    // Asegúrate de que el servicio envíe los datos correctamente
    this.apiService.addCliente(this.nuevoCliente).subscribe(observer);
  }
}






  

     

 




   // Opcional: Limpieza del formulario después de la inserción
      // this.nuevoCliente = {
      //   nombres: '',
      //   apellidos: '',
      //   direccion: ''
      // };

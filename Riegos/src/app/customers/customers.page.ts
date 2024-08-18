import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ActionSheetController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class CustomersPage implements OnInit {
  clientes: any[] = [];

  constructor(
    private apiserviceService: ApiserviceService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.apiserviceService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      },
    });
  }

  async openActionSheet(cliente: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar Cliente',
          icon: 'pencil',
          handler: () => {
            this.router.navigate(['/customersedit', cliente.id]);
          },
        },
        {
          text: 'Editar Configuración',
          icon: 'settings',
          handler: () => {
            this.router.navigate(['/configuration', cliente.id]);
          },
        },
        {
          text: 'Imprimir',
          icon: 'print',
          handler: () => {
            // Add your print logic here
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }
}





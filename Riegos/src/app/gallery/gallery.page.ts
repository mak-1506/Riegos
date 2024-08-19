import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GalleryPage implements OnInit {
  images: { url: string }[] = [
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image2.jpg' },
    // Agrega más imágenes aquí
  ];
  constructor() { }

  ngOnInit() {
  }

}

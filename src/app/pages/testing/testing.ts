import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  standalone: true,
  templateUrl: './testing.html',
  styleUrls: ['./testing.scss']
})
export class TestingComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  photo: string | null = null;
  videoStream: MediaStream | null = null;

  constructor(private router: Router) {}

  listRoutes = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  routerTo(path: string) {
    this.router.navigate([path]);
  }

  async openCamera() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoElement.nativeElement;
      video.srcObject = this.videoStream;
      await video.play();
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara. Asegúrate de permitir el acceso en el navegador.');
    }
  }

  capturePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photo = canvas.toDataURL('image/png');
    this.closeCamera();
  }

  closeCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPadding'
})
export class ZeroPaddingPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value < 1 || value > 1000) {
      return value.toString(); // retourne la valeur telle quelle si elle est invalide
    }
    
    // Ajoute des zéros devant et assure une longueur de 4 caractères
    return value.toString().padStart(4, '0');
  }
}
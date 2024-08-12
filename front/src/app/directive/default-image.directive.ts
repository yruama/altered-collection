import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective implements AfterViewInit {
  @Input() appDefaultImage!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    if (element.tagName === 'IMG') {
      this.setDefaultImageOnError(element);
    } else if (element.tagName === 'P-IMAGE') {
      const imgElement = element.querySelector('img');
      if (imgElement) {
        this.setDefaultImageOnError(imgElement);
      }
    }
  }

  private setDefaultImageOnError(imgElement: HTMLImageElement) {
    this.renderer.listen(imgElement, 'error', () => {
      console.log('this.appDefaultImage : ', this.appDefaultImage)
      this.renderer.setAttribute(imgElement, 'src', this.appDefaultImage || 'path/to/your/default/image.jpg');
    });
    // Trigger the error event if the image is already broken
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
      this.renderer.setAttribute(imgElement, 'src', imgElement.src); // Trigger error if image is broken
    }
  }
}
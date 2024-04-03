import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyString]',
})
export class OnlyStringDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z\s]*$/gi);

  private allowSpecialKey: Array<string> = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.allowSpecialKey.indexOf(event.key) !== -1) {
      return true;
    }
    const inputVal: string = this.el.nativeElement.value.concat(event.key);
    if (inputVal && !String(inputVal).match(this.regex)) {
      event.preventDefault();
    }

    return;
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    event.preventDefault();

    return;
  }
}

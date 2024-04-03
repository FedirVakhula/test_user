import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MatIconModule } from '@angular/material/icon';
import { OnlyStringDirective } from './directives/only-string.directive';

@NgModule({
  declarations: [ButtonComponent, ErrorPageComponent, OnlyStringDirective],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ButtonComponent, ErrorPageComponent, OnlyStringDirective],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  exports: [
    TranslateModule,
    ToastrModule,
  ]
})
export class SharedModule { }

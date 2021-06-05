import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [SharedModule, EditorRoutingModule, CKEditorModule],
  declarations: [EditorComponent],
  providers: []
})
export class EditorModule {}

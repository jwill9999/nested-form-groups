import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ProfileEditorComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule, ReactiveFormsModule],
})
export class AppRoutingModule {}

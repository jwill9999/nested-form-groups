import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent {
    constructor(private fb: FormBuilder) {}

    profileForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
        }),
    });

    onSubmit() {
        console.log(this.profileForm.value);
    }
}

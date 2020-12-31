import { Component } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray,
} from '@angular/forms';

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent {
    profileForm = new FormGroup({
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        lastName: new FormControl(''),
        address: new FormGroup({
            street: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zip: new FormControl(''),
        }),
        aliases: this.fb.array([this.fb.control('')]),
    });

    onSubmit() {
        console.log(this.profileForm.value);
    }

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.fb.control(''));
    }
}

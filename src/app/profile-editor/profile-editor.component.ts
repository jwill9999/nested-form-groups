import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray,
    ValidationErrors,
    AbstractControl,
} from '@angular/forms';

interface FormGroupControls {
    [key: string]: AbstractControl;
}

interface AllValidationErrors {
    control_name: string;
    error_name: string;
    error_value: any;
}
@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent {
    constructor(private fb: FormBuilder) {}
    errors: AllValidationErrors[] = [];

    profileForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
        }),
        aliases: this.fb.array([this.fb.control('')]),
    });

    subscription = this.profileForm.valueChanges.subscribe((value) => {
        console.log('value changed to ', value);

        this.getFormValidationErrors(this.profileForm.controls);
    });

    onSubmit() {
        console.log(this.profileForm.value);
    }

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    get formData() {
        console.log('form data', this.profileForm);
        return this.profileForm.controls.firstName.errors;
    }

    addAlias() {
        this.aliases.push(this.fb.control(''));
    }

    getFormValidationErrors(
        controls: FormGroupControls
    ): AllValidationErrors[] {
        this.errors = [];
        Object.keys(controls).forEach((key) => {
            const control = controls[key];
            if (control instanceof FormGroup) {
                this.errors = this.errors.concat(
                    this.getFormValidationErrors(control.controls)
                );
            }
            const controlErrors: ValidationErrors = controls[key].errors;
            if (controlErrors !== null) {
                Object.keys(controlErrors).forEach((keyError) => {
                    this.errors.push({
                        control_name: key,
                        error_name: keyError,
                        error_value: controlErrors[keyError],
                    });
                    console.log(this.errors);
                });
            }
        });
        return this.errors;
    }
}

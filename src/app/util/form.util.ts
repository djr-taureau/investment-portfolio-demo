import { ElementRef } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import { Logger } from "./logger";
import { ErrorInterceptor } from "@core/error-interceptor/error.interceptor";
import { ErrorStateMatcher } from "@angular/material";

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("FormUtil");

/**
 * Accessor for a given form field by control name.
 * @return The form control.
 * @throws Error indicating that incorrect or nonexistent form control name.
 */
export function getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
    if (formGroup instanceof FormGroup === false) {
        throw new Error(`No form group with name "${String(formGroup)}".`);
    }
    const control: FormControl = formGroup.controls[formControlName] as FormControl;
    if (!control) {
        throw new Error(`No form control with name "${formControlName}".`);
    }
    return control;
}

export function getFormGroup(formGroup: FormGroup, formControlName: string): FormGroup {
    if (formGroup instanceof FormGroup === false) {
        throw new Error(`No form group with name "${String(formGroup)}".`);
    }
    const control: FormGroup = formGroup.controls[formControlName] as FormGroup;
    if (!control) {
        throw new Error(`No form control with name "${formControlName}".`);
    }
    return control;
}

/**
 * Accessor for a given form array by name.
 * @return The form array.
 */
export function getFormArray(formGroup: FormGroup, formArrayName: string): FormArray {
    return formGroup.get(formArrayName) as FormArray;
}

/**
 * Accessor for a given form control within a form array by name.
 * @return The form control.
 */
export function getFormControlsFromFormArray(formGroup: FormGroup, formArrayName: string, formControlName: string): FormControl[] {
    const formArray: FormArray = getFormArray(formGroup, formArrayName);
    const formArrayFormGroup: FormGroup[] = formArray.controls as FormGroup[];
    return formArrayFormGroup.map((item: FormGroup) => getFormControl(item, formControlName));
}

/**
 * Accessor for a given form control within a form array by name for a given index.
 * @return The form control.
 */
export function getFormControlFromFormArray(formGroup: FormGroup, formArrayName: string, formControlName: string, index: number = 0): FormControl {
    const formArray: FormArray = getFormArray(formGroup, formArrayName);
    const formArrayFormGroup: FormGroup[] = formArray.controls as FormGroup[];
    const formControls: FormControl[] = formArrayFormGroup.map((item: FormGroup) => getFormControl(item, formControlName));
    return formControls[index] || null;
}

/**
 * Gets the value for a given form control within a form array by name.
 * @return The form control.
 */
export function getFormControlFromFormArrayValue(formGroup: FormGroup, formArrayName: string, formControlName: string): any {
    const formControls: FormControl[] = getFormControlsFromFormArray(formGroup, formArrayName, formControlName);
    return formControls.map((item: FormControl) => item.value);
}

/**
 * Sets the value for a given form control within a form array by name.
 * @return The form control.
 */
export function setFormControlFromFormArrayValue(formGroup: FormGroup, formArrayName: string, formControlName: string, value: string): void {
    const formControls: FormControl[] = getFormControlsFromFormArray(formGroup, formArrayName, formControlName);
    formControls.forEach((item: FormControl) => item.setValue(value));
}

export function setFormControlValueFromFormArrayValue(
    formGroup: FormGroup,
    formArrayName: string,
    formControlName: string,
    value: string,
    index: number = 0
): void {
    const formControls: FormControl[] = getFormControlsFromFormArray(formGroup, formArrayName, formControlName);
    const item: FormControl = formControls[index];
    item.setValue(value);
}

/**
 * Returns a list of invalid controls for a given form.
 */
export function findInvalidControls(formGroup: FormGroup): any[] {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

/**
 * Accessor for a given form field's value by control name.
 * @return The form control's value.
 */
export function getFormFieldValue(formGroup: FormGroup, formControlName: string, defaultValue: any = ""): any {
    return getFormControl(formGroup, formControlName).value;
}

/**
 * Setter for a given form field's value by control name.
 * @return The form control's value.
 */
export function setFormFieldValue(formGroup: FormGroup, formControlName: string, value: any = ""): void {
    return getFormControl(formGroup, formControlName).setValue(value);
}

/**
 * Set the file input value.
 * @param file
 * @param elementRef
 * @param blur
 */
export const setFileInputValue = (file: File, elementRef: ElementRef, blur: boolean = false): void => {
    if (file) {
        // NOTE: DO NOT let this error go uncaught as it tossed the global error handler into an infinite loop
        // that's completely unrecoverable from. We don't even see the error modal as a result and the app
        // pretty much locks up.
        try {
            // ClipboardEvent >> Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
            // DataTransfer >> specs compliant (as of March 2018 only Chrome)
            const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
            dataTransfer.items.add(file);
            elementRef.nativeElement.files = dataTransfer.files;

            if (blur) {
                elementRef.nativeElement.blur();
            }
        } catch (err) {
            ErrorInterceptor.logError(err);
        }
    }
};

/**
 * Spits out all the errors for a given form.
 */
export const getAllErrors = (form: FormGroup | FormArray): { [key: string]: any } | null => {
    let hasError = false;
    const result = Object.keys(form.controls).reduce(
        (acc, key) => {
            const control = form.get(key);
            const errors = control instanceof FormGroup || control instanceof FormArray ? getAllErrors(control) : control.errors;
            if (errors) {
                acc[key] = errors;
                hasError = true;
            }
            return acc;
        },
        {} as { [key: string]: any }
    );
    return hasError ? result : null;
};
/**
 * Needs to be used for cross field validation in a form (eg.Password Validation)
 */
export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

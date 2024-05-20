import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[valueEquals]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValueEqualsDirective, multi: true },
  ],
})
export class ValueEqualsDirective implements Validator {
  @Input()
  set valueEquals(value: string) {
    this.#value = value;
    if(this.#onChange) this.#onChange();
  }
  #value!: string;
  #onChange?: () => void;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.value !== this.#value) {
      return { valueEquals: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.#onChange = fn;
  }
}

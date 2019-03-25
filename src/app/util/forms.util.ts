import { FormArray, FormGroup } from '@angular/forms';
import { values, forEach } from 'lodash';

export function purgeFormArray(form: FormArray, fromIndex = 0) {
  if (fromIndex > form.length) {
    return;
  }

  while (fromIndex != form.length) {
    form.removeAt(form.length - 1);
  }
}

export function markFormGroupDirty(...formGroup: FormGroup[]): void {
  if (!formGroup.length) {
    return;
  }

  forEach(formGroup, fg => {
    const formGroupValues = values(fg.controls);

    forEach(formGroupValues, control => {
      if (control instanceof FormArray) {
        forEach(control.controls, fArrControl => {
          markFormGroupDirty(fArrControl as FormGroup);
        });
      } else if (control instanceof FormGroup) {
        markFormGroupDirty(control);
      } else {
        control.markAsDirty();
      }
    });
  });
}

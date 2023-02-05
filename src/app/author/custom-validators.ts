import { AbstractControl } from "@angular/forms";

export function nameFunc (control: AbstractControl /*поле с формы*/): { [key: string]: any | any}{
  let nameRegex = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/;
  // Значение поля с формы
  let value = control.value;
  // Проверка поля по регулярному выражению
  let result = nameRegex.test(value);

  if (result) {
      return null as any;
  }
  else {
      return { "nameValidator": { value } }
  }
}

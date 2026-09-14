import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import cuid from 'cuid';

@ValidatorConstraint({ name: 'isCuid', async: false })
export class IsCuidConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return typeof value === 'string' && cuid.isCuid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid CUID`;
  }
}

export function IsCuid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCuidConstraint,
    });
  };
}

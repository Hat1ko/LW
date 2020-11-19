import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'customNumber', async: false})
export class CustomNumberValidator implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        const number = Number(text);
        return number === 0 || Boolean(number);
    }

    defaultMessage(args: ValidationArguments) {
        return '($value) not a number!';
    }

}

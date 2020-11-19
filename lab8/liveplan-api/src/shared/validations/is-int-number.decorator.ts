import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'intNumber', async: false})
export class IsIntNumber implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        const integer = Number(text);
        return Number.isInteger(integer) && Boolean(integer);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} not an int number!`;
    }

}

import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'ratingValidate', async: false})
export class RatingValidate implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        const integer = Number(text);
        return Number.isInteger(integer) && Boolean(integer) && integer >= 1 && integer <= 5;
    }

    defaultMessage(args: ValidationArguments) {
        return `rating incorrect value`;
    }

}

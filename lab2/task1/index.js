class Car {
    constructor(mark, power, countryCreator, creationDate, initialPrice) {
        this.mark = mark;
        this.power = power;
        this.countryCreator = countryCreator;
        this.creationDate = creationDate;
        this.initialPrice = initialPrice;
    }

    // Fields:
    // mark: string;
    // power: number; // horsePower
    // countryCreator: string;
    // creationYear: number;
    // initialPrice: number; // in dollars
}

class CarHandler {
    constructor() {
        this._carsBefore2000 = [];
        this._carsAfter2000 = [];
    }

    addCar(car) {
        if (car._creationYear < 2000) {
            this._carsBefore2000.push(car);
        } else {
            this._carsAfter2000.push(car);
        }
        return;
    }

    getCarsBefore2000() {
        return  this._carsBefore2000;
    }

    getCarsAfter2000() {
        return {}, this._carsAfter2000)
    }

    cleanCarsBefore2000() {
        this._carsBefore2000 = [];
    }

    cleanCarAfter2000() {
        this._carsAfter2000 = [];
    }
}

const carHandler = new CarHandler();

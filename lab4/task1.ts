class Car {
    constructor(mark, power, countryCreator, creationDate, initialPrice) {
        this.mark = mark;
        this.power = power;
        this.countryCreator = countryCreator;
        this.creationDate = creationDate;
        this.initialPrice = initialPrice;
    }


    private mark: string;
    private power: number; // horsePower
    private countryCreator: string;
    private creationDate: number;
    private initialPrice: number; // in dollars
}

class CarHandler {
    constructor() {
        this._carsBefore2000 = [];
        this._carsAfter2000 = [];
    }

    private _carsBefore2000: Car[];
    private _carsAfter2000: Car[];


    addCar(car): void{
        if (car._creationYear < 2000) {
            this._carsBefore2000.push(car);
        } else {
            this._carsAfter2000.push(car);
        }
        return;
    }

    getCarsBefore2000(): Car[] {
        return  this._carsBefore2000;
    }

    getCarsAfter2000(): Car[] {
        return this._carsAfter2000;
    }

    getByCountry(country): Car[] {
        const countries = [];
        countries.push(...this._carsAfter2000, ...this._carsBefore2000);
        return countries.filter(car => car.countryCreator === country);
    }

    cleanCarsBefore2000(): void {
        this._carsBefore2000 = [];
    }

    cleanCarAfter2000(): void {
        this._carsAfter2000 = [];
    }
}


// 

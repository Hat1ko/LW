class Transport {
    constructor(driver, type, perevezenya) {
        this.driver = driver;
        this.perevezenya = perevezenya; // idk what is it
        this.transportType = type;
        this.path = []
    }

    setPath(arrOfPath) {
        this.path = arrOfPath;
    }
}

class TransportHandler {
    constructor() {
        this._transports = [];
    }

    addTransport(transport) {
        this._transports.push(transport);
    }

    getTransports() {
        return this._transports.map();
    }

    removeByDriver(driver) {
        this._transports = this._transports.filter(t => t.driver !== driver);
    }
} 

const transportHandler = new TransportHandler();

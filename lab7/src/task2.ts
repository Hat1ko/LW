export interface PrintingStrategy {
    getHello(): string
    updateString(toUpdate: string): string
    printHello(): void
    printUpdatedString(toUpdate: string): void
    printString(toPrint: string): void
}

export class Printer implements PrintingStrategy {
    getHello(): string {
        return 'Hello'
    }

    updateString(toUpdate: string): string {
        return `Updated ${toUpdate}`
    }

    printHello(): void {
        console.log('Hello')
    }

    printUpdatedString(toUpdate: string): void { 
        console.log(`Updated ${toUpdate}`)
    }

    printString(toPrint: string): void {
        console.log(toPrint)
    }
}

export class MockPrinter implements PrintingStrategy {
    getHello(): string {
        return 'Mock Hello'
    }

    updateString(toUpdate: string): string {
        return `Mocked Updated ${toUpdate}`
    }

    printHello(): void {
        console.log('Mock Hello')
    }

    printUpdatedString(toUpdate: string): void { 
        console.log(`Mocked Updated ${toUpdate}`)
    }

    printString(toPrint: string): void {
        console.log(`Mock ${toPrint}`)
    }
}

const orig: PrintingStrategy = new Printer()
const mock: PrintingStrategy = new MockPrinter()

orig.printHello()
mock.printHello()

console.log()

orig.printUpdatedString('string')
mock.printUpdatedString('string')

console.log()

orig.printString('string')
mock.printString('string')


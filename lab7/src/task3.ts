export class Memento {
    private readonly state: string;

    constructor(state: string) {
        this.state = state;
    }

    public getState(): string {
        return this.state;
    }
}

const someState = 'state-good'
const stateSaver = new Memento(someState)
console.log(stateSaver.getState())

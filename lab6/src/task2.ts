export interface Subject {
    action(): string
}


export class Stuff implements Subject {
    action(): string {
        return 'Stuff'
    }
}

const condition = true

export class Proxy implements Subject {
    private object: Subject
    constructor(s: Stuff) {
        this.object = s
    }

    action(): string {
        if (condition) {
            return 'Proxy' +  this.object.action()
        }
        return 'Bad request'
    }    
}


const obj: Proxy = new Proxy(new Stuff())
console.log(obj.action())

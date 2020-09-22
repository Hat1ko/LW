export interface Component {
    action(): Promise<string>
}

export class MainClass implements Component {
    async action(): Promise<string> {
        return 'MainClass'
    }
}

export class Decorator implements Component {
    protected component: Component

    constructor(component: Component) {
        this.component = component;
    }

    async action(): Promise<string> {
        return await this.component.action()
    }
}

export class SomeOneSays extends Decorator {
    async action(): Promise<string> {
        return `someone says: ${await super.action()}`
    }
}

export class TellMeTheStory extends Decorator {
    async action(): Promise<string> {
        return `tell me the story: ${await super.action()}`
    }
}


const mainClass: MainClass = new MainClass()
const someOneSays: SomeOneSays = new SomeOneSays(mainClass)
const tellMeTheStory: TellMeTheStory = new TellMeTheStory(someOneSays)

setTimeout(async () => console.log(await tellMeTheStory.action()), 100)


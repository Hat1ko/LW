export interface IClonable {
    clone(obj: ExampleClass): ExampleClass;
}

export class ExampleClass implements IClonable {
    private exampleField1: string;
    private exampleField2: number;
    private exampleField3: boolean;
    private exampleField4: any;
        
    constructor(p1: string, p2: number, p3: boolean, p4?: any) {
        this.exampleField1 = p1;
        this.exampleField2 = p2;
        this.exampleField3 = p3;
        this.exampleField4 = p4 ? p4 : undefined;
    }

    clone(obj: ExampleClass): ExampleClass {
        return Object.assign({}, obj);
    }
}

export class ExampleFactoryClass implements IClonable {
    clone<E>(obj: E): E {
        return { ...obj };
    }

    create(): ExampleClass {
        return new ExampleClass('empty', 0, false);
    }

    clone(obj: ExampleClass): ExampleClass {
        return obj.clone();
    }
 }

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export class Example {
    key: string
    data: string
}

export interface Repository {
    generateData(key: string): Example
    setData(key: string, data: Example): void
    getData(key: string): Example
}

export class DataRepository implements Repository {
    private readonly collection: Map<string, Example> = new Map<string, Example>()

    generateData(key: string): Example {
        return { key, data: makeid(key.length) } as Example
    }

    setData(key: string, data: Example): void {
        this.collection.set(key, data)
    }

    getData(key: string): Example {
        let data = this.collection.get(key)
        if (!data) {
            const generatedData = (this.generateData(key))
            this.collection.set(key, generatedData) 
            data = generatedData
        }

        return data
    }
}

const repository: Repository = new DataRepository()

repository.setData('1', { key: '1', data: '111'})
repository.setData('2', { key: '2', data: '1sdf11'})
repository.setData('3', { key: '3', data: '111sdfs'})
repository.setData('4', { key: '4', data: '111sdfsdf'})
repository.setData('5', { key: '5', data: '111fdfffd'})
repository.setData('6', { key: '6', data: '111dfdf'})

console.log(repository.getData('1'))
console.log(repository.getData('aaaa'))
console.log(repository.getData('aaaa'))

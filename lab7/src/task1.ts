function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

/* Main logic */

export interface ICommand {
    execute(): void
}

export class Print100RandomSymbols implements ICommand {
    execute(): void {
        for (let i = 0; i < 100; i++){
            console.log(makeid(1))
        }
    }
}

const objWithLogic = new Print100RandomSymbols()
objWithLogic.execute()

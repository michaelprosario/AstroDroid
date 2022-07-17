export class Ensure
{
    public static objectNotNull(thing: any, message: string){
        if(!thing){
            throw message;
        }
    }
}
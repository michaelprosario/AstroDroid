export class Require {
  public static NotNull(term: any, variableName: string){
    if(!term){
      throw new Error(variableName + " is required");
    }
    return true; 
  }

  public static IsNotEmpty(term: string, variableName: string){
    if(!term && term !== ""){
      throw new Error(variableName + " is required");
    }
    return true; 
  }
}
import { DriveDirection } from "../enums/drive-direction";
import { ICommand } from "../interfaces/command";

export class DriveCommand implements ICommand
{
  direction: DriveDirection = 0;
  distance: number = 200;

  GetName() : string {
    return "DriveCommand";
  }
}
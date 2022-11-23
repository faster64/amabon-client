import { EntityState } from "../../enumerations/common.enum";

export class BaseModel {
  public id = 0;

  public createdDate: Date = new Date();

  public createdBy: string = "";

  public modifiedDate: Date = new Date();

  public modifiedBy: string = "";

  public entityState: number = EntityState.Add;

  public isDeleted: boolean = false;

  constructor(obj?: object) {
    if(obj) {
      setTimeout( () => {
        Object.assign(this, obj);
      }, 0);
    }
  }
}

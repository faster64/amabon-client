import { BaseModel } from "../../base/base-model";

export class FileStorage extends BaseModel {
  public presignedUrl = "";
  public licensedUrlTime = 0;
}

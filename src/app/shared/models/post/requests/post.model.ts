import { FileType } from "src/app/shared/enumerations/file-type.enum";
import { BaseModel } from "../../base/base-model";

export class Post extends BaseModel {
  public caption  = "";

  public viewCount = 0;

  public commentCount = 0;

  public shareCount = 0;

  public fileUrl  = "";

  public fileType!: FileType;

  public ownerName = "";

  public ownerId = "";
}

import { CommonConstant } from "src/app/shared/constants/common.constant";
import { BaseModel } from "src/app/shared/models/base/base-model";

export class RefreshTokenModel extends BaseModel
{
    public userId = CommonConstant.ZERO_GUID;

    public refreshToken = "";

    public expriedTime!: Date;
}

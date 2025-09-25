import { IsOptional, IsString } from "class-validator";


export class CreateObjectWithMediaRequestDto {

    @IsString()
    s3Key: string;

    @IsOptional()
    @IsString()
    url: string
}
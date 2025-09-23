import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";



export class GetEventsPageDto {

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    page: number = 1;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(50)
    limit: number = 10;




}
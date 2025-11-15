
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, Min, IsEnum } from "class-validator";


export enum ContentType {
    MOVIE = "movie",
    SERIES = "series",
    LIVE_EVENT = "live-event",
    SINGLE_VIDEO = "single-video",
    EPISODE = "episode"
}


export class contentFilterDto {

    @IsArray()
    @IsString({ each: true })
    @IsEnum(ContentType, { each: true })
    type: ContentType[];


}

export class paginationDto {
    @IsOptional()
    @Type(() => Number)       // query string → number dönüşümü
    @IsNumber()
    @Min(1)
    page: number = 1;         // default

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10;       // default
}
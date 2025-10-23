import { EventType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

const eventStatus = {
  upcoming: 'upcoming',
  past: 'past',
};
type eventStatus = keyof typeof eventStatus;

export class GetEventsStatusDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  page = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit = 10;

  @IsEnum(eventStatus)
  status: eventStatus;
}

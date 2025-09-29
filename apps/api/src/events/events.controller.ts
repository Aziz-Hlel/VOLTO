import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventType, Role } from '@prisma/client';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetAllEventsDto } from './dto/get-all-events';
import { GetEventsPageDto } from './dto/get-evets-page.dto';
import type { Response } from 'express';


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    if (
      createEventDto.type === EventType.SPECIAL &&
      (!createEventDto.startDate || !createEventDto.endDate)
    )
      throw new BadRequestException(
        'startDate and endDate are required for special events',
      );

    if (
      createEventDto.type === EventType.WEEKLY &&
      (!createEventDto.cronStartDate || !createEventDto.cronEndDate)
    )
      throw new BadRequestException(
        'cronStartDate and cronEndDate are required for weekly events',
      );

    const createdEvent = await this.eventsService.create(createEventDto);

    return createdEvent;
  }

  @Get()
  async findAll(@Query() query: GetAllEventsDto) {
    return await this.eventsService.findAll(query);
  }

  @Get('list')
  async findPage(@Query() query: GetEventsPageDto, @Res({ passthrough: true }) response: Response) {

    const data = await this.eventsService.findPage(query);


    response.setHeader('X-Total-Count', data.count.toString());

    return data.payload;
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.getById(id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    if (
      updateEventDto.type === EventType.SPECIAL &&
      (!updateEventDto.startDate || !updateEventDto.endDate)
    )
      throw new BadRequestException(
        'startDate and endDate are required for special events',
      );

    if (
      updateEventDto.type === EventType.WEEKLY &&
      (!updateEventDto.cronStartDate || !updateEventDto.cronEndDate)
    )
      throw new BadRequestException(
        'cronStartDate and cronEndDate are required for weekly events',
      );

    return await this.eventsService.update(updateEventDto);

  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    
    if(!id) throw new BadRequestException('id is required');

    const response = await this.eventsService.remove(id);
    return response;
  }
}

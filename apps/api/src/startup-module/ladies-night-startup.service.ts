import { InternalServerErrorException, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';

export class LadiesNightStartupService implements OnApplicationBootstrap {
  private readonly logger = new Logger(LadiesNightStartupService.name);

  constructor(private readonly eventsService: EventsService) {}

  async onApplicationBootstrap() {
    this.logger.log('Ladies Night Initialization...');
    const existingEvent = await this.eventsService.getLadiesNight();

    if (!existingEvent)
      throw new InternalServerErrorException(
        'Ladies Night Singleton instance does not exist in Database, make sure to run seed:prod command',
      );

    this.logger.log('✅ Ladies Night Singleton instance Exists is Database');
  }
}

import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import StorageStrategyPatternProvider from './StorageStrategyPatternProvider';

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [StorageStrategyPatternProvider, StorageService],
  exports: [StorageService],
})
export class StorageModule {}

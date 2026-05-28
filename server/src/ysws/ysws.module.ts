import { Module } from '@nestjs/common';
import { YswsService } from './ysws.service';
import { YswsController } from './ysws.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [YswsController],
  providers: [YswsService],
})
export class YswsModule {}

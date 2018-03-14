import { Module } from '@nestjs/common';
import MembersModule from './modules/members';

@Module({
  imports: [MembersModule],
})
export class ApplicationModule {}
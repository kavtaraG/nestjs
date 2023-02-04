import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Api } from './api.entity';
import { UpdateApiDto } from './update.api.dto';

@Controller('/api/users')
export class ApiController {
  private events: Api[] = [];
  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param() id) {
    const event = this.events.filter((item) => item.id === id);
    return event;
  }

  @Post()
  create(@Body() input: UpdateApiDto) {
    const record = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(record);
    return record;
  }

  @Patch(':id')
  update(@Param() id, @Body() input: UpdateApiDto) {
    const index = this.events.findIndex((item) => item.id === id);
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() id) {
    this.events = this.events.filter((item) => item.id !== id);
  }
}

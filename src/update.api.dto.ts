import { PartialType } from '@nestjs/mapped-types';
import { CreateApiDto } from './create.api.dto';

export class UpdateApiDto extends PartialType(CreateApiDto) {
  username: string;
  passwortd: string;
  mail: string;
  when: string;
  address: string;
}

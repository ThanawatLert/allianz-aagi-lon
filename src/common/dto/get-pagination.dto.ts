import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPaginationDto {
  @ApiProperty({
    example: 10,
    type: 'number',
    required: false,
  })
  @IsString()
  limit: number;

  @ApiProperty({
    example: 0,
    type: 'number',
    required: false,
  })
  @IsString()
  offset: number;
}

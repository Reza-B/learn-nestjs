import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'The new password of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}


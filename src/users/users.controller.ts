import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    example: {
      status: 200,
      message: 'User created successfully.',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request, validation error.',
    example: {
      status: 400,
      message: 'Bad Request, validation error.',
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict, user already exists.',
    example: {
      status: 409,
      message: 'Conflict, user already exists.',
    },
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create new users' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // نیاز به لاگین دارد
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user data by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

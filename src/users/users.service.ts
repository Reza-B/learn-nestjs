import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findFirst({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findFirst({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.db.user.delete({
      where: { id },
    });
  }
}

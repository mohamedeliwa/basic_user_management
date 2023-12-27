import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UserParamsDto } from '../dtos/user.params.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: 'id of the user to find',
  })
  @Get(':id')
  async findUserById(@Param() { id }: UserParamsDto): Promise<User> {
    return this.usersService.findUserById({ id });
  }

  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: 'id of the user to update',
  })
  @Patch('password/:id')
  async updateUserPassword(
    @Param() { id }: UserParamsDto,
    @Body() { password }: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.changeUserPassword({ id }, { password });
  }
}

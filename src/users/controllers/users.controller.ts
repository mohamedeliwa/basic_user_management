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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Public()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @Patch('password/:id')
  async updateUserPassword(
    @Param() { id }: UserParamsDto,
    @Body() { password }: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.changeUserPassword({ id }, { password });
  }
}

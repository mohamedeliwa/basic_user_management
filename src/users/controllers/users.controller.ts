import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dtos/update.user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @ApiBearerAuth()
  @Get()
  async findUserById(@Req() request): Promise<User> {
    return request.user as User;
  }

  @ApiBearerAuth()
  @Patch()
  async updateUser(
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user: User = await request.user;
    return this.usersService.updateUser({ id: user.id }, updateUserDto);
  }

  @ApiBearerAuth()
  @Patch('password/')
  async updateUserPassword(
    @Req() request,
    @Body() { password }: UpdateUserPasswordDto,
  ): Promise<User> {
    const user: User = await request.user;
    return this.usersService.changeUserPassword({ id: user.id }, { password });
  }
}

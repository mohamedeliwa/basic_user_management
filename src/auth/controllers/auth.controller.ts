import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { UserCredentialsDto } from 'src/users/dtos/user.credentials.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.login(
      userCredentialsDto.email,
      userCredentialsDto.password,
    );
  }
}

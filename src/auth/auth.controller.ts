import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { LoginRequestBody, TokenResponse } from './models/LoginRequestBody';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestBody })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: TokenResponse,
  })
  async Login(
    @Body() loginRequestBody: LoginRequestBody,
    @Request() req: AuthRequest,
  ) {
    return this.authService.login(req.user);
  }
}

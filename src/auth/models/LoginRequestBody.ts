import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'exemple@email.com',
    description: `O e-mail é necessário apra o login.`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 4,
    maxLength: 20,
    example: 'P@ssw0rd',
    description: `Senha para acesso, mesma deve conter pelo menos um caracteres especiais, maiúsculo e numérico`,
  })
  @IsString()
  password: string;
}

export class TokenResponse {
  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NGZmMGU4NS03N2Y0LTQyMzU...`,
    description: `Token de acesso`,
  })
  accessToken: string;
}

import { User } from '../entities/user.entity';
import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends User {
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
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    example: 'Willian Alves Batista',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '15784763222',
    description: 'identificador unico de usuário',
  })
  @IsString()
  @Matches(/^\d{11}$/, {
    message: 'invalid cpf',
  })
  cpf: string;

  @ApiProperty({
    example: 'AAAA-MM-DD',
    description:
      'Data de nascimento do usuário, deve seguir o seguinte formato AAAA-MM-DD.',
  })
  @IsDateString()
  dateBirth: Date;
}

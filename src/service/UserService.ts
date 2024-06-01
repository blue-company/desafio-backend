import { BadRequestError } from "@src/customErrors/BadRequestError";
import { NotFoundError } from "@src/customErrors/NotFoudError";
import { loginInputDTO, loginOutputDTO } from "@src/dtos/userDTO/login.dto";
import { signupInputDTO, signupOutputDTO } from "@src/dtos/userDTO/signup.dto";
import { Users } from "@src/models/User";
import { UserRepository } from "@src/repository/UserRepository";
import { HashManager } from "@src/utils/HashManager";
import { IdGerator } from "@src/utils/IdGerator";
import { TokenManager } from "@src/utils/TokenManager";

export class UserService{
    constructor(
        private userRepository: UserRepository,
        private idGerator: IdGerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
      ) {}

    signup = async (userLogin:signupInputDTO): Promise<signupOutputDTO> => {
        const {name, email, password} = userLogin;

        const [userDB] = await this.userRepository.findUserByEmail(email);

        if(userDB)
            throw new BadRequestError("Email already exists.")

        const id = this.idGerator.gerate();

        const hashPass = await this.hashManager.hash(password);

        const newUser = new Users(
            id,
            name,
            email,
            hashPass,
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel();

        await this.userRepository.createUser(newUserDB);

        const tokenPayload = newUser.toUserPayloadModel();

        const token = this.tokenManager.createToken(tokenPayload);

        const response: loginOutputDTO = {
            message: "user successfully created",
            token,
        };
    
        return response;
    }

    login = async (userLogin: loginInputDTO): Promise<loginOutputDTO> => {
        const { email, password } = userLogin;
    
        const [userDB] = await this.userRepository.findUserByEmail(email);
    
        if (!userDB)
          throw new NotFoundError("Email not exist.");
        
    
        const hashPassword = userDB.password;
    
        const isPasswordCorrect = await this.hashManager.compare(
          password,
          hashPassword
        );
    
        if (!isPasswordCorrect) {
          throw new BadRequestError("Email or password incorrect.");
        }
    
        const user = new Users(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.created_at
        );
    
        const tokenPayload = user.toUserPayloadModel();
    
        const token = this.tokenManager.createToken(tokenPayload);
    
        const response: signupOutputDTO = {
          message: "user successfully logged in",
          token,
        };
    
        return response;
      };
}
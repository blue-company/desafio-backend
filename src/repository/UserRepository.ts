import { Connection } from "../repository/configuration";
import { UserDB } from "../models/User";

export class UserRepository extends Connection{
    private static USERS_TABLE = "users";

    findUserById = async (id: string): Promise<UserDB[]> => {
      console.log(id)
      const user: UserDB[] = await Connection.conection(UserRepository.USERS_TABLE).where({id});

      return user;
      };
    
      findUserByEmail = async (email: string): Promise<UserDB[]> => {
        const user: UserDB[] = await Connection.conection(
          UserRepository.USERS_TABLE
        ).where({ email });
    
        return user;
      };
    
      createUser = async (newUser: UserDB): Promise<void> => {
        console.log(newUser);
        await Connection.conection(UserRepository.USERS_TABLE).insert(newUser);
      };
    
      upadateUser = async (upadateUser: UserDB, id: string): Promise<void> => {
        await Connection.conection(UserRepository.USERS_TABLE)
          .update(upadateUser)
          .where({ id });
      };
    
      deleteUser = async (id: string): Promise<void> => {
        await Connection.conection(UserRepository.USERS_TABLE).del().where({ id });
      };
}
export interface UserDB{
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
}

export interface TokenPayload{
    id: string,
    name: string,
    email:string
}

export class Users{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private createdAt: string
    ){}
    
    
    public get getId() : string {
        return this.id;
    }
    
    public get getName() : string {
        return this.name;
    }
    
    public get getEmail() : string {
        return this.email;
    }

    public get getPassword() : string {
        return this.password;
    }

    public get getCreatedAt() : string {
        return this.createdAt;
    }

    public set setId(newId: string) {
        this.id = newId;
    }
    
    public set setName(newName: string)  {
        this.name = newName;
    }
    
    public set setEmail(newEmail:string) {
        this.email = newEmail;
    }

    public set setPassword(newPassword: string){
        this.password;
    }

    public set setCreatedAt(newCreatedAt:string) {
        this.createdAt;
    }

    public toDBModel(): UserDB {
        return {
          id: this.id,
          name: this.name,
          email: this.email,
          password: this.password,
          created_at: this.createdAt,
        };
      }
    
      public toUserPayloadModel(): TokenPayload {
        return {
          id: this.id,
          name: this.name,
          email: this.email
        };
      }
}
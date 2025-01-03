interface ICreateUserDTO{
    name:string;
    password:string;
    email:string;
    birthdate:string;
    id?: string;
    avatar?: string;
}

export {ICreateUserDTO}
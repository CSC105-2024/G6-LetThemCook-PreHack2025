import { db } from "../index.ts";
import {hash, compare} from 'bcrypt';

export const createUser = async (email:string ,username:string , password:string, bio:string, pfpURL:string )=>{
    const hashedPassword = await hash(password,10);
    return db.user.create({
        data:{
            email,
            username,
            password:hashedPassword,
            bio,
            pfpURL,
        }
    })
}
export const findUser = async(email:string, username:string)=>{
    return db.user.findUnique(
        {
            where:{email,username}
        }
    )
}
export const findUserByEmail = async(email:string)=>{
    return db.user.findUnique(
        {
            where:{email}
        }
    )
}

export const validatePassword = async(input:string , hash:string)=>{
    return compare(input,hash)
}

export const updateUserProfile = async (
    userId:number,
    newUsername:string,
    newBio:string,
    newPfp: string,
)=>{
    return db.user.update({
        where: {id:userId},
        data:{
            username:newUsername,
            bio:newBio,
            pfpURL:newPfp
        }
    })
}


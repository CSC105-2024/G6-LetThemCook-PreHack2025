import { db } from "../index.ts";
import {hash, compare} from 'bcrypt';
import { writeFile } from "fs/promises";
import path from "path";
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
export const getUserData = async (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      bio: true,
      pfpURL: true,
      recipe:true
    },
  });
};

export const handleProfileImgUpdate = async (file:File): Promise<string>=>{
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join("uploads",filename);
    await writeFile(filePath,Buffer.from(buffer));
    return `/uploads/${filename}`;
}





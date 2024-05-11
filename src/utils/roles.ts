import { Roles } from "@/types/globals"
import { auth } from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs/server';
export const checkRole = (role: Roles) => {
    const { sessionClaims } = auth()

    return sessionClaims?.metadata.role === role;
}

export const currentUserId = async () => {
    const user = await currentUser();

    return  user?.id
}
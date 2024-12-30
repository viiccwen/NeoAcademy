import type { DeleteResult } from 'mongoose';
import type { TUser } from 'models/user';

import { User } from 'models/user';


export async function createOAuthUser(name: string, email: string, authProvider: string, accessToken: string): Promise<TUser> {
    return await User.create({ name, email, authProvider, accessToken, createdAt: new Date() });
}

export async function findByOAuth(authProvider: TUser['authProvider'], accessToken: string): Promise<TUser | null> {
    return await User.findOne({ authProvider, accessToken });
}

export async function deleteUser(user: TUser): Promise<DeleteResult> {
    return await user.deleteOne();
}

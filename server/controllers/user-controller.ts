import type { AuthProvider, User } from 'database';
import type { DeleteResult } from 'mongodb';

import { users } from 'database';
import { ObjectId } from 'mongodb';


export async function createOAuthUser(name: string, email: string, authProvider: AuthProvider, accessToken: string): Promise<User> {
    const user = { _id: new ObjectId(), name, email, authProvider, accessToken, quizzes: [], createdAt: new Date() };
    await users.insertOne(user);
    return user;
}

export async function findByOAuth(authProvider: AuthProvider, accessToken: string): Promise<User | null> {
    return await users.findOne({ authProvider, accessToken });
}

export async function deleteUser({ _id }: User): Promise<DeleteResult> {
    return await users.deleteOne({ _id });
}

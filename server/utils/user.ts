import type { AuthProvider, User } from 'types/User';
import type { DeleteResult } from 'mongodb';

import { users } from 'database';
import { ObjectId } from 'mongodb';

export async function createUser(
    name: string,
    email: string,
    authProvider: AuthProvider,
    authId: string,
    accessToken: string,
): Promise<User> {
    const user = {
        _id: new ObjectId(),
        name,
        email,
        authProvider,
        authId,
        accessToken,
        quizzes: [],
        roadmaps: [],
        createdAt: new Date(),
    };
    await users.insertOne(user);
    return user;
}

export async function findByAccessToken(
    authProvider: AuthProvider,
    accessToken: string
): Promise<User | null> {
    return await users.findOne({ authProvider, accessToken });
}

export async function findByOAuthId(
    authProvider: AuthProvider,
    authId: string
): Promise<User | null> {
    return await users.findOne({ authProvider, authId });
}

export async function deleteUserById(userId: ObjectId): Promise<DeleteResult> {
    return await users.deleteOne({ _id: userId });
}
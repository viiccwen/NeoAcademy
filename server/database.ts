import { MongoClient } from 'mongodb';
import type { User } from 'types/User';


export const client = new MongoClient(process.env.DATABASE_URL!);
export const database = client.db('neo_academy');
export const users = database.collection<User>('users');

await client.connect();

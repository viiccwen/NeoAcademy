import jwt from 'jsonwebtoken';
import { promisify } from 'node:util';


const JWT_SECRET = process.env.JWT_SECRET!;
const jwtVerifyPromise: (token: string, secret: string) => Promise<unknown> = promisify(jwt.verify);

export function verify(token: string): Promise<unknown> {
    return jwtVerifyPromise(token, JWT_SECRET);
}
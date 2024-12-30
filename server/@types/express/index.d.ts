import type { TUser } from 'models/user';
import type { Document } from 'mongoose';


declare global {
    namespace Express {
        interface User extends TUser {}
    }
}

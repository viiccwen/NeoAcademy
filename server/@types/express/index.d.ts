import type { User as UserType } from 'database';


declare global {
    namespace Express {
        interface User extends UserType {}
    }
}

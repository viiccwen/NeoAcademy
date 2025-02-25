import type { User as UserType } from 'types/User';


declare global {
    namespace Express {
        interface User extends UserType {}
    }
}

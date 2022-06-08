import { User } from '__types__/user';

export interface Dashboard {
    id: string,
    title: string,
    users: User[],
}
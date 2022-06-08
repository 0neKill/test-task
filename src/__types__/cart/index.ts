import { User } from '__types__/user';

export type Cart = Omit<User, 'id'> & { group?: string };
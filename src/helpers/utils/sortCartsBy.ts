import { User } from '__types__/user';
import { Filter } from '__types__/dashboard';

export const sortCartsBySearchValue = (items: Array<User>, value: string): Array<User> => {
    return items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()),
    );
};

export const sortCartsByFilter = (items: Array<User>, filter: Filter): Array<User> => {
    if (filter === 'all') {
        return items;
    } else {
        return [...items].sort((a, b) => {
            const first = a[filter].toLowerCase();
            const second = b[filter].toLowerCase();
            if (first === second) return 0;
            return first > second ? 1 : -1;
        });
    }
};
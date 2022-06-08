import React from 'react';
import { User } from '__types__/user';
import { Cart, Input, Modal } from '@components';

type Filter = keyof Omit<User, 'id'>;

interface PropsComponent {
    items: Array<User>,
    title: string,
    handlerEditCartData: (cartData: User) => void,
    handlerRemoveItem: (id: string) => void,
}

export const DashboardView: React.FunctionComponent<PropsComponent> = ({
                                                                           items,
                                                                           handlerRemoveItem,
                                                                           handlerEditCartData,
                                                                           title,
                                                                       }) => {
    const [carts, setCarts] = React.useState<User[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [filterTerm, setFilterTerm] = React.useState<Filter | 'all'>('all');

    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        setCarts(items);
    }, [items]);


    const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            const value = event.target.value;
            const results = items.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.phone.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase()),
            );
            setCarts(results);
            setSearchTerm(event.target.value);
        });
    };

    const handlerOnSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Filter | 'all';
        sortCartsByFilter(value);
        setFilterTerm(value);
    };

    const sortCartsByFilter = (value: Filter | 'all') => {
        if (value === 'all') {
            setCarts(items);
        } else {
            const newArrayForSorted = [...carts];
            newArrayForSorted.sort((a, b) => {
                const first = a[value].toLowerCase();
                const second = b[value].toLowerCase();
                if (first === second) return 0;
                return first > second ? 1 : -1;
            });
            setCarts(newArrayForSorted);
        }
    };

    return (
        <div className='dashboard'>
            <h2 className='dashboard__title'>{title}</h2>
            <div className='dashboard-container'>
                <div className='dashboard-container__options'>
                    <select className='options__filter' value={filterTerm} onChange={handlerOnSelectFilter}>
                        <option value='all'>All</option>
                        <option value='name'>Name</option>
                        <option value='email'>E-mail</option>
                        <option value='phone'>Phone</option>
                    </select>
                    <Input className='options__search' placeholder='Поиск'
                           onChange={handlerSearch}
                           value={searchTerm} />
                </div>
                {
                    isPending ? 'Загрузка данных' : (
                        <div className='dashboard-container__content'>
                            {
                                carts.length ? (
                                    carts.map(item => (
                                        <Cart key={item.id} item={item} handlerRemoveItem={handlerRemoveItem} />
                                    ))
                                ) : 'Список пользователей пуст'
                            }
                        </div>
                    )
                }

            </div>
            <div className='dashboard-footer'>
                <Modal handlerOnSubmit={handlerEditCartData}>
                    <button className='dashboard-footer__btn'>Добавить пользователя</button>
                </Modal>
            </div>
        </div>
    );
};

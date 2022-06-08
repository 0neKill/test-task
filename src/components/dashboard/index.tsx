import React from 'react';

import { Cart, Input, Modal } from '@components';

import './dashboard.style.scss';

import { User } from '__types__/user';

type Filter = keyof Omit<User, 'id'>;

interface Props {
    items: Array<User>,
    title: string,
}

interface PropsComponent {
    items: Array<User>,
    title: string,
    handlerEditCartData: (cartData: User) => void,
    handlerRemoveItem: (id: string) => void,
}

export default function Dashboard({
                                      items, title,
                                  }: Props) {
    const [carts, setCarts] = React.useState<User[]>(items);

    const handlerEditCartData = (cartData: User) => {
        setCarts(carts => [...carts, { ...cartData }]);
    };

    const handlerRemoveItem = (id: string) => {
        setCarts(carts => carts.filter(item => item.id !== id));
    };

    return <Dashboard.Component title={title} items={carts} handlerRemoveItem={handlerRemoveItem}
                                handlerEditCartData={handlerEditCartData} />;
}

Dashboard.Component = function DashboardComponent({
                                                      items,
                                                      title,
                                                      handlerRemoveItem,
                                                      handlerEditCartData,
                                                  }: PropsComponent) {
    const [carts, setCarts] = React.useState<User[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [filterTerm, setFilterTerm] = React.useState<Filter>('name');

    React.useEffect(() => {
        setCarts(items);
    }, [items]);

    React.useEffect(() => {
        if (carts.length) {
            sortCartsByFilter();
        }
    }, [filterTerm]);

    const sortCartsByFilter = () => {
        const cartsNewArray = [...carts];
        cartsNewArray.sort(function(a, b) {
            return a[filterTerm].toLowerCase() > b[filterTerm].toLowerCase() ? 1 : -1;
        });
        setCarts(cartsNewArray);
    };

    const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const results = items.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.phone.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase()),
        );
        setCarts(results);
        setSearchTerm(event.target.value);
    };
    const handlerOnSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Filter;
        setFilterTerm(value);
    };
    return (
        <div className='dashboard'>
            <h2 className='dashboard__title'>{title}</h2>
            <div className='dashboard-container'>
                <div className='dashboard-container__options'>
                    <select className='options__filter' value={filterTerm} onChange={handlerOnSelectFilter}>
                        <option value='name'>Name</option>
                        <option value='email'>E-mail</option>
                        <option value='phone'>Phone</option>
                    </select>
                    <Input className='options__search' placeholder='Поиск'
                           onChange={handlerSearch}
                           value={searchTerm} />
                </div>
                <div className='dashboard-container__content'>
                    {
                        carts.length ? (
                            carts.map(item => (
                                <Cart key={item.id} item={item} handlerRemoveItem={handlerRemoveItem} />
                            ))
                        ) : 'Список пользователей пуст'
                    }
                </div>


            </div>
            <div className='dashboard-footer'>
                <Modal handlerOnSubmit={handlerEditCartData}>
                    <button className='dashboard-footer__btn'>Добавить пользователя</button>
                </Modal>
            </div>
        </div>
    );

}
;
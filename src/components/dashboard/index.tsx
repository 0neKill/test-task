import React from 'react';

import './dashboard.style.scss';

import { User } from '__types__/user';
import { DashboardView } from './dashboard-view';


interface Props {
    items: Array<User>,
    title: string,
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

    return <DashboardView title={title}
                          items={carts}
                          handlerRemoveItem={handlerRemoveItem}
                          handlerEditCartData={handlerEditCartData} />;
}



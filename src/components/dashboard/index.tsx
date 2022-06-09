import React from 'react';

import './dashboard.style.scss';

import { User } from '__types__/user';
import { DashboardComponent } from './dashboard.component';
import { Filter } from '__types__/dashboard';
import { sortCartsByFilter, sortCartsBySearchValue } from '@helpers/utils';


interface Props {
    items: Array<User>,
    title: string,
    index: number,
}


export const Dashboard: React.FunctionComponent<Props> = ({
                                                              items, title, index,
                                                          }) => {
    const [carts, setCarts] = React.useState<User[]>(items);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [filterTerm, setFilterTerm] = React.useState<Filter>('all');

    const [isPending, startTransition] = React.useTransition();

    const handlerEditCartData = (cartData: User) => {
        setCarts(carts => [...carts, { ...cartData }]);
    };

    const handlerRemoveItem = (id: string) => {
        setCarts(carts => carts.filter(item => item.id !== id));
    };


    const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setSearchTerm(event.target.value);
        });
    };

    const handlerOnSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Filter;
        setFilterTerm(value);
    };

    const filterCarts = sortCartsByFilter(sortCartsBySearchValue(carts, searchTerm), filterTerm);


    return <DashboardComponent title={title}
                          index={index}
                          items={filterCarts}
                          isPending={isPending}
                          filterTerm={filterTerm}
                          searchTerm={searchTerm}
                          handlerRemoveItem={handlerRemoveItem}
                          handlerEditCartData={handlerEditCartData}
                          handlerSearch={handlerSearch}
                          handlerOnSelectFilter={handlerOnSelectFilter}
    />;
};



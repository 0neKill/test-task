import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Cart, Input, Model } from '@components';
import { variantDashboard } from '@helpers/animations';

import type { User } from '__types__/user';
import type { ConvertForModel, Filter } from '__types__/dashboard';


interface PropsComponent {
    items: Array<User>,
    title: string,
    index: number,
    isPending: boolean,
    filterTerm: Filter,
    searchTerm: string,
    handlerEditCartData: (data: User) => void,
    handlerRemoveItem: (id: string) => void,
    handlerSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlerOnSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}


export const DashboardComponent: React.FunctionComponent<PropsComponent> = ({
                                                                                items,
                                                                                title,
                                                                                index,
                                                                                isPending,
                                                                                filterTerm,
                                                                                searchTerm,
                                                                                handlerSearch,
                                                                                handlerRemoveItem,
                                                                                handlerEditCartData,
                                                                                handlerOnSelectFilter,
                                                                            }) => {
        return (
            <motion.div className='dashboard'
                        variants={variantDashboard}
                        initial='initial'
                        animate='animate'
                        custom={index}>
                <h2 className='dashboard__title'>{title}</h2>
                <div className='dashboard-container'>
                    <div className='dashboard-container__options'>
                        <select className='options__filter'
                                value={filterTerm}
                                onChange={handlerOnSelectFilter}>
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
                                    items.length ? (
                                        <AnimatePresence>
                                            {
                                                items.map((item) => (
                                                    <Cart key={item.id}
                                                          item={item}
                                                          handlerRemoveItem={handlerRemoveItem} />
                                                ))
                                            }
                                        </AnimatePresence>
                                    ) : 'Список пользователей пуст'
                                }
                            </div>
                        )
                    }

                </div>
                <div className='dashboard-footer'>
                    <Model.Cart handlerOnSubmit={handlerEditCartData as ConvertForModel}>
                        <button className='dashboard-footer__btn'>Добавить пользователя</button>
                    </Model.Cart>
                </div>
            </motion.div>
        );
    }
;

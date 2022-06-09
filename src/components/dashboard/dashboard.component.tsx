import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Cart, Input, Modal } from '@components';

import type { User } from '__types__/user';
import type { Filter } from '__types__/dashboard';


interface PropsComponent {
    items: Array<User>,
    title: string,
    index: number,
    isPending: boolean,
    filterTerm: Filter,
    searchTerm: string,
    handlerEditCartData: (cartData: User) => void,
    handlerRemoveItem: (id: string) => void,
    handlerSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlerOnSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

const variant = {
    initial: { opacity: 0 },
    animate: (index: number) => ({
        opacity: 1,
        transition: { delay: index * .2, type: 'spring' },
    }),
};

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
                        variants={variant}
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
                    <Modal handlerOnSubmit={handlerEditCartData}>
                        <button className='dashboard-footer__btn'>Добавить пользователя</button>
                    </Modal>
                </div>
            </motion.div>
        );
    }
;

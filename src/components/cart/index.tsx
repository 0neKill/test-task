import React from 'react';
import clsx from 'clsx';

import './cart.style.scss';

import type { User } from '__types__/user';

interface Props {
    className?: string,
    item: User,
    handlerRemoveItem: (id: string) => void,
}

export const Cart: React.FunctionComponent<Props> = ({
                                                         className, item,
                                                         handlerRemoveItem,
                                                     }) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);

    const onClick = () => {
        const answer = window.confirm('Вы действительно хотите удалить?');
        answer && handlerRemoveItem(item.id);
    };
    return (
        <div className={clsx('cart', className, { active: isChecked })}>
            <div className='cart-main'>
                <p className='cart-main__title cart-main__title--name'>{item.name}</p>
                <p className='cart-main__title cart-main__title--email'>{item.email}</p>
                <p className='cart-main__title cart-main__title--phone'>{item.phone}</p>
            </div>
            <div className='cart-footer'>
                <button className='cart-footer__btn cart-footer__btn--remove' onClick={onClick} />
                <label>
                    <input type='checkbox' className='cart-footer__btn--checkbox'
                           onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
                    <span className='cart-footer__btn cart-footer__btn' />
                </label>
            </div>
        </div>
    );
};

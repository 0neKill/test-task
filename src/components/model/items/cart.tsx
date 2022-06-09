import React from 'react';
import { Button, Input } from '@components';

import type { Cart } from '__types__/cart';
import { User } from '__types__/user';

interface Props {
    handlerOnSubmit: (cartData: User) => void,
    closeModal?: () => void
}

export const CartModel: React.FunctionComponent<Props> = ({ handlerOnSubmit, closeModal }) => {
    const [cartData, setCartData] = React.useState<Cart>({ name: '', email: '', phone: '' });
    const isDisable = !(Object.values(cartData).every(val => val.trim() !== ''));

    const handlerChange = (id: keyof Cart) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCartData(obj => {
            return {
                ...obj,
                [id]: event.target.value,
            };
        });
    };

    const onSubmit = () => {
        clearStateAndCloseModel();
        handlerOnSubmit({ ...cartData, id: new Date().toString() });
    };

    const clearStateAndCloseModel = () => {
        setCartData({ name: '', email: '', phone: '' });
        closeModal!();
    };

    return (
        <div className='model__container'>
            <Input className='model__input'
                   placeholder='Введите имя' value={cartData.name}
                   onChange={handlerChange('name')} />
            <Input className='model__input'
                   placeholder='Введите E-mail' value={cartData.email}
                   onChange={handlerChange('email')} />
            <Input className='model__input'
                   placeholder='Введите телефон' value={cartData.phone}
                   onChange={handlerChange('phone')} />
            <Button className='model__btn' isDisable={isDisable} onClick={onSubmit}>Добавить
                пользователя</Button>
        </div>
    );
};
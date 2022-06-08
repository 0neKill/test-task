import React from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '@hooks';
import { Input, Button } from '@components';

import './modal.style.scss';

import type { Cart } from '__types__/cart';
import type { User } from '__types__/user';

interface Props {
    children: React.ReactElement,
    handlerOnSubmit: (cartData: User) => void,
}

export const Modal: React.FunctionComponent<Props> = ({
                                                          children,
                                                          handlerOnSubmit,
                                                      }) => {

    const { visible, handlerClick, refElementClick } = useOutsideClick(false);

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
        handlerClick();
    };


    return (
        <>
            {React.cloneElement(children, { onClick: handlerClick })}
            {
                visible &&
                createPortal(
                    <div className='model'>
                        <div className='model__wrapper'>
                            <div className='model__inner'>
                                <div className='model__content' ref={refElementClick}>
                                    <div className='model__header'>
                                        <h3 className='model__title'>Заполните карточку</h3>
                                        <button className='model__exit'
                                                onClick={handlerClick} />
                                    </div>
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

                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body)
            }

        </>
    );
};
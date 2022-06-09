import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useOutsideClick } from '@hooks';
import { Input, Button } from '@components';
import { variantsModel } from '@helpers/animations';

import './modal.style.scss';

import type { Cart } from '__types__/cart';
import type { User } from '__types__/user';

interface Props {
    children: React.ReactElement,
    handlerOnSubmit: (cartData: User) => void,
}

export const Model: React.FunctionComponent<Props> = ({
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

    React.useEffect(() => {
        if (visible) document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, [visible]);


    return (
        <>
            {React.cloneElement(children, { onClick: handlerClick })}
            {
                createPortal(
                    <AnimatePresence>
                        {
                            visible && (
                                <motion.div className='model'
                                            variants={variantsModel.model}
                                            initial='hidden'
                                            animate='visible'
                                            exit='hidden'
                                            transition={{
                                                when: 'beforeChildren',
                                            }}
                                >
                                    <div className='model__wrapper'>
                                        <div className='model__inner'>
                                            <motion.div className='model__content' ref={refElementClick}
                                                        variants={variantsModel.inner}
                                                        initial='hidden'
                                                        animate='visible'
                                                        exit='exit'
                                                        transition={{
                                                            duration: .4,
                                                        }}
                                            >
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

                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>,
                    document.body)
            }
        </>
    );
};
import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useOutsideClick } from '@hooks';
import { variantsModel } from '@helpers/animations';

import { CartModel } from './items/cart';
import { DashboardModel } from './items/dashboard';

import './modal.style.scss';

import type { User } from '__types__/user';
import { Dashboard } from '__types__/dashboard';

interface Props {
    children: React.ReactElement,
    handlerOnSubmit: (data: User | Dashboard) => void,
    elementForOpen: React.ReactElement,
}

const ModelTemplate: React.FunctionComponent<Omit<Props, 'handlerOnSubmit'>> = ({
                                                                                    children,
                                                                                    elementForOpen,
                                                                                }) => {
    const { visible, handlerClick, refElementClick } = useOutsideClick(false);

    React.useEffect(() => {
        if (visible) document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, [visible]);

    return (
        <>
            {React.cloneElement(elementForOpen, { onClick: handlerClick })}
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
                                                {React.cloneElement(children, { closeModal: handlerClick })}
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

export const Model = {
    Cart: ({
               handlerOnSubmit,
               children,
           }: Omit<Props, 'elementForOpen'>) => (
        <ModelTemplate elementForOpen={children}>
            <CartModel handlerOnSubmit={handlerOnSubmit} />
        </ModelTemplate>
    ),
    Dashboard: ({
                    handlerOnSubmit,
                    children,
                }: Omit<Props, 'elementForOpen'>) => (
        <ModelTemplate elementForOpen={children}>
            <DashboardModel handlerOnSubmit={handlerOnSubmit} />
        </ModelTemplate>
    ),
};
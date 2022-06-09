import React from 'react';
import { motion } from 'framer-motion';

import { Button } from '@components';
import { Routes } from '@helpers/constants';

const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { scale: .5, opacity: 0, transition: { type: 'spring', delay: .09 } },
};

export const Main: React.FunctionComponent = () => {
    return (
        <motion.section className='main' variants={variants} initial='initial' animate='animate' exit='exit'>
            <motion.h1 className='main__title' variants={variants}>Тестовое задание</motion.h1>
            <motion.h2 className='main__subtitle' variants={variants}>&laquo;Разработка JS&raquo;</motion.h2>
            <motion.h3 className='main__email' variants={variants}> Почта разработчика: <i>sanbel2015@yandex.ru</i>
            </motion.h3>
            <Button.Link path={Routes.USERS} className='main__btn'>
                Начать
            </Button.Link>
        </motion.section>
    );
};
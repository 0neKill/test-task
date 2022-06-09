import React from 'react';
import { motion } from 'framer-motion';

import { Button } from '@components';
import { Routes } from '@helpers/constants';
import { variantsMain } from '@helpers/animations';

export const Main: React.FunctionComponent = () => {
    return (
        <motion.section className='main' variants={variantsMain} initial='initial' animate='animate' exit='exit'>
            <motion.h1 className='main__title' variants={variantsMain}>Тестовое задание</motion.h1>
            <motion.h2 className='main__subtitle' variants={variantsMain}>&laquo;Разработка JS&raquo;</motion.h2>
            <motion.h3 className='main__email' variants={variantsMain}> Почта разработчика: <i>sanbel2015@yandex.ru</i>
            </motion.h3>
            <Button.Link path={Routes.USERS} className='main__btn'>
                Начать
            </Button.Link>
        </motion.section>
    );
};
import React from 'react';
import { Button } from '@components';
import { Link } from 'react-router-dom';

import { Routes } from '@helpers/constants';

export const Main: React.FunctionComponent = () => {
    return (
        <section className='main'>
            <h1 className='main__title'>Тестовое задание</h1>
            <h2 className='main__subtitle'>&laquo;Разработка JS&raquo;</h2>
            <h3 className='main__email'> Почта разработчика: <i>sanbel2015@yandex.ru</i></h3>
            <Button.Link path={Routes.USERS} className='main__btn'>
                Начать
            </Button.Link>
        </section>
    );
};
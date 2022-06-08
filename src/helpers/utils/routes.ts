import { Routes } from '@helpers/constants';
import React from 'react';
import { Main, Users } from '@pages/published/modules';

interface IRoute {
    id: string,
    path: Routes,
    Element: React.FunctionComponent,
}


export const vectorRoutes: Array<IRoute> = [
    {
        id: '1',
        path: Routes.MAIN,
        Element: Main,
    },
    {
        id: '2',
        path: Routes.USERS,
        Element: Users,
    },
];
import React from 'react';
import { Route } from 'react-router-dom';

import { vectorRoutes } from '@helpers/utils/routes';


export const createRoutes = () => {
    return vectorRoutes.map(({ id, path, Element }) => (
        <Route key={id} path={path} element={<Element />} />
    ));
};
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createRoutes } from '@helpers/utils/createRoutes';
import { Loading, NotFound } from '@components';

const PublishedPages = React.lazy(() => import('@pages/published'));


export const RouteEntryPoint: React.FunctionComponent = () => {
    const routes = createRoutes();

    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <React.Suspense fallback={<Loading />}>
                        <PublishedPages />
                    </React.Suspense>
                }>
                    {routes}
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
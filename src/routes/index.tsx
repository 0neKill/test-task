import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Loading, NotFound } from '@components';
import { createRoutes } from '@helpers/utils/createRoutes';

const PublishedPages = React.lazy(() => import('@pages/published'));

export const RouteEntryPoint: React.FunctionComponent = () => {
    const location = useLocation();
    const routes = createRoutes();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route element={<React.Suspense fallback={<Loading />}>
                    <PublishedPages />
                </React.Suspense>}>
                    {routes}
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};


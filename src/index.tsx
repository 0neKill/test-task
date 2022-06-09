import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@assets/styles/index.scss';

import { RouteEntryPoint } from './routes';


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <RouteEntryPoint />
    </BrowserRouter>,
);



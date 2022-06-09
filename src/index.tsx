import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RouteEntryPoint } from './routes';

import '@assets/styles/index.scss';


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <RouteEntryPoint />
    </BrowserRouter>,
);



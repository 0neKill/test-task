import React from 'react';

import { Dashboard } from '@components';

export const Users: React.FunctionComponent = () => {

    const [dashboards, setDashboards] = React.useState(Array(3).fill(undefined));


    return (
        <section className='users'>
            {
                dashboards.map(dash => (
                    <Dashboard
                        key={`${Math.random()}`}
                        title='Руководство'
                        items={[
                            {
                                id: '1',
                                name: 'Margarita Bryan',
                                phone: '+1 (978) 408-2789',
                                email: 'margaritabryan@imkan.com',
                            },
                        ]}
                    />
                ))
            }

        </section>
    );
};

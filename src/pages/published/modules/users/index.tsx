import React from 'react';

import { Dashboard, Loading } from '@components';

import type { Dashboard as IDashboard } from '__types__/dashboard';
import { UserService } from '@services';

export const Users: React.FunctionComponent = () => {

    const [dashboards, setDashboards] = React.useState<IDashboard[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        UserService.getTitleDashboard()
            .then(({ data }) => {
                setDashboards(data);
            })
            .catch(e => console.log('error'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className='users'>
            {
                !loading ?
                    dashboards.map(dash => (
                        <Dashboard
                            key={dash.id}
                            title={dash.title}
                            items={dash.users}
                        />
                    )) : <Loading />
            }

        </section>
    );
};

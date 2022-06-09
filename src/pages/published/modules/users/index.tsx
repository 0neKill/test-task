import React from 'react';
import { motion } from 'framer-motion';

import { Button, Dashboard, Loading, Model } from '@components';
import { variantDashboard } from '@helpers/animations';
import { UserService } from '@services';

import type { ConvertForModel, Dashboard as IDashboard } from '__types__/dashboard';

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

    const handlerAddDashboard = (data: IDashboard) => {
        setDashboards(dash => [...dash, data]);
    };

    return (
        <section className='users'>
            <motion.div variants={variantDashboard}
                        initial='initial'
                        animate='animate'
                        className='users__option'
            >
                <Model.Dashboard handlerOnSubmit={handlerAddDashboard as ConvertForModel}>
                    <Button>+</Button>
                </Model.Dashboard>
            </motion.div>
            {
                !loading ?
                    dashboards.map((dash, index) => (
                        <Dashboard
                            key={dash.id}
                            title={dash.title}
                            items={dash.users}
                            index={index}
                        />
                    )) : <Loading />
            }
        </section>
    );
};

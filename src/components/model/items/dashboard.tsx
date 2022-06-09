import React from 'react';
import { Button, Input } from '@components';

import { Dashboard } from '__types__/dashboard';

interface Props {
    handlerOnSubmit: (dashboard: Dashboard) => void,
    closeModal?: () => void
}

export const DashboardModel: React.FunctionComponent<Props> = ({
                                                                   handlerOnSubmit,
                                                                   closeModal,
                                                               }) => {
    const [dashboard, setDashboard] = React.useState<Dashboard>({ id: '', title: '', users: [] });

    const isDisable = dashboard.title === '';

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDashboard(dash => ({ ...dash, title: event.target.value.trimStart() }));
    };

    const onSubmit = () => {
        clearStateAndCloseModel();
        handlerOnSubmit({
            ...dashboard,
            id: new Date().toString(),
        });
    };

    const clearStateAndCloseModel = () => {
        setDashboard({ id: '', title: '', users: [] });
        closeModal!();
    };

    return (
        <div className='model__container'>
            <Input className='model__input'
                   placeholder='Введите название' value={dashboard.title}
                   onChange={handlerChange} />
            <Button className='model__btn'
                    isDisable={isDisable}
                    onClick={onSubmit}>Добавить доску</Button>
        </div>
    );
};
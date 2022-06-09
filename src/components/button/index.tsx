import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Routes } from '@helpers/constants';

import './button.style.scss';


interface Props {
    children: React.ReactNode,
    className?: string,
    isDisable?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

interface PropsButtonLink {
    children: React.ReactNode,
    path: Routes,
    className?: string,
}

function Button({
                    className,
                    children,
                    isDisable,
                    onClick,
                }: Props) {
    return <button className={clsx('button', className, { disabled: isDisable })}
                   disabled={isDisable}
                   onClick={onClick}>{children}</button>;
}


Button.Link = function ButtonLink({ children, path, className }: PropsButtonLink) {
    return <Link to={path} className={clsx('button button--link', className)}>
        {children}
    </Link>;
};

export default Button;
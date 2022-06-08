import React from 'react';
import clsx from 'clsx';

import './input.style.scss';

type Props = React.HTMLProps<HTMLInputElement>

export const Input: React.FunctionComponent<Props> = React.memo(({
                                                                     className,
                                                                     ...anyProps
                                                                 }) => {
    return (
        <input  {...anyProps} className={clsx('input', className)} />
    );
});
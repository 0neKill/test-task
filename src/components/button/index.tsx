import React from 'react';
import clsx from 'clsx';

import './button.style.scss';

interface Props {
    children: React.ReactNode,
    className?: string,
    isDisable?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const Button: React.FunctionComponent<Props> = React.memo(({
                                                                      className,
                                                                      children,
                                                                      isDisable,
                                                                      onClick,
                                                                  }) => {
    return <button className={clsx('button', className, { disabled: isDisable })} disabled={isDisable} onClick={onClick}>{children}</button>;
});
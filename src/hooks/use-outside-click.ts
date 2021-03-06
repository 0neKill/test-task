import React from 'react';

type UseOutsideClick = (init: boolean) => { refElementClick: React.RefObject<HTMLDivElement>, visible: boolean, handlerClick: () => void };

export const useOutsideClick: UseOutsideClick = () => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const refElementClick = React.useRef<HTMLDivElement>(null);

    const handlerClick = () => {
        setVisible(state => !state);
    };

    const handlerEventListener = (event: MouseEvent) => {
        if (refElementClick.current && !refElementClick.current.contains(event.target as Node)) setVisible(false);
    };

    React.useEffect(() => {
        if (visible) {
            window.document.body.addEventListener('click', handlerEventListener, true);
        }
        return () => window.document.body.removeEventListener('click', handlerEventListener, true);
    }, [visible]);

    return {
        refElementClick,
        visible,
        handlerClick,
    };
};
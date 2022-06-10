import React from 'react';
import clsx from 'clsx';
import { FixedSizeList as List } from 'react-window';

import { Cart } from '@components';

import type { User } from '__types__/user';

interface Props {
    items: Array<User>,
    handlerRemoveItem: (id: string) => void,
    className?: string,
}

export const LazyCartsRender: React.FunctionComponent<Props> = ({
                                                                    items,
                                                                    handlerRemoveItem,
                                                                    className,
                                                                }) => {
    return (
        <List itemSize={140}
              height={550}
              itemCount={items.length}
              itemData={{ items, handlerRemoveItem }}
              overscanCount={3}
              width={250}
              className={clsx(className)}
        >
            {
                props => (
                    <div style={props.style}>
                        <Cart
                            item={props.data.items[props.index]}
                            handlerRemoveItem={props.data.handlerRemoveItem} />
                    </div>
                )
            }
        </List>
    );
};

'use client';

import { cloneElement, useRef, type ReactElement, type Ref } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// CSSTransitionProps is a union (timeout | addEndListener); Omit must distribute over it.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type NodeRefTransitionProps = DistributiveOmit<CSSTransitionProps<HTMLElement>, 'nodeRef' | 'children'> & {
	children: ReactElement<{ ref?: Ref<HTMLElement> }>;
};

// React 19 removed ReactDOM.findDOMNode, which CSSTransition falls back to when
// no nodeRef is given. Each instance owns a ref and attaches it to its child.
const NodeRefTransition = ({ children, ...props }: NodeRefTransitionProps) => {
	const nodeRef = useRef<HTMLElement>(null);

	return (
		<CSSTransition {...(props as CSSTransitionProps<HTMLElement>)} nodeRef={nodeRef}>
			{cloneElement(children, { ref: nodeRef })}
		</CSSTransition>
	);
};

export default NodeRefTransition;

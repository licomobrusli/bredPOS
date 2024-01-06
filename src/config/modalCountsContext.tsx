// modalCountsContext.tsx
import React from 'react';
import { ModalCount } from './types';

const modalCountsContext = React.createContext<ModalCount[] | null>(null);

export default modalCountsContext;

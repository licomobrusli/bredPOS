// servicesContext.tsx
import React from 'react';
import { Service } from './types';

const servicesContext = React.createContext<Service[] | null>(null);

export default servicesContext;

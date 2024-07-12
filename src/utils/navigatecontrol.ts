import React from 'react';

export const navigationRef = React.createRef<any>();

export function navigate(name: any, params?: any) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

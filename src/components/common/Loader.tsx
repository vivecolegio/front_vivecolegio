import React from 'react';
import { Puff } from 'react-loader-spinner';
import { loaderColor } from '../../constants/defaultValues';

const Loader = (props: any ) => {return (
  <Puff color={loaderColor} height="100" width="100" />
)};

export { Loader };


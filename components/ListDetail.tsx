import * as React from 'react';

import { User } from '../interfaces/User';

type ListDetailProps = {
  item: User;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.login}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;

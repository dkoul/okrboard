import React from 'react';
// https://diogofcunha.github.io/react-virtualized-tree/#/examples/large-collection
export function UserInfo(props: any) {
  console.log(props.keycloak && props.keycloak.loadUserInfo());
  return <div>UserInformation</div>;
}
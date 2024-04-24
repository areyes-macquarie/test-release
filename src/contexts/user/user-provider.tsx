import React, { ReactNode } from 'react';
import UserContext, { UserInfo } from './user-context';

type State = {
  userContext?: UserInfo | undefined | null;
  basePath?: string;
};

type Props = State & {
  children?: ReactNode;
  user?: UserInfo | null;
};

export default class UserContextProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.setUserContext = this.setUserContext.bind(this);
    this.getUserContext = this.getUserContext.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

    this.state = {
      userContext: props.user,
      basePath: props.basePath,
    };
  }

  setUserContext = (_data?: UserInfo) => {
    this.setState({
      userContext: _data,
    });
  };

  getUserContext = () => {
    return this.state.userContext;
  };

  setBasePath = (_path?: string) => {
    this.setState({
      basePath: _path,
    });
  };

  getBasePath = () => {
    return this.state.basePath ?? '';
  };

  isLoggedIn = () => {
    return (
      this.state.userContext?.token !== undefined &&
      this.state.userContext?.token?.length > 0
    );
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          id: this.state.userContext?.id ?? '',
          email: this.state.userContext?.email ?? '',
          name: this.state.userContext?.name ?? '',
          token: this.state.userContext?.token ?? '',
          getBasePath: this.getBasePath,
          setBasePath: this.setBasePath,
          setUserContext: this.setUserContext,
          getUserContext: this.getUserContext,
          isLoggedIn: this.isLoggedIn,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

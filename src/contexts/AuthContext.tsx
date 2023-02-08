import React, { useEffect, useState, createContext } from "react";
import { IAuthContextType } from "../interfaces/IAuthContextType";
import { Auth, Hub } from "aws-amplify";
import { Spinner } from "@chakra-ui/react";

export const AuthContext = createContext<IAuthContextType>({
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,

  signIn: async () => { },
  signOut: async () => { },
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  /**
   * fetch currently logged-in user using AWS Auth library
   * @returns {Promise<void>}
   */
  const fetchAuthUser = async () => {
    try {
      const fetchedUser = await Auth.currentAuthenticatedUser();
      setIsAuthenticating(false);
      setUser(fetchedUser);
    } catch (err) {
      setIsAuthenticating(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchAuthUser();

    // listening for auth change events
    const authListener = Hub.listen(
      "auth",
      async ({ payload: { event, data } }) => {
        console.log("Auth Status Changed Event: ", event);
        console.log("Auth Status Changed Data: ", data);
        switch (event) {
          case "signIn":
            await fetchAuthUser();
            break;
          case "signOut":
            setUser(null);
            break;
          case "signIn_failure":
          case "signUp_failure":
            if (user) {
              setUser(null);
            }
            break;
          case "forgotPassword":
          case "forgotPasswordSubmit":
          case "forgotPasswordSubmit_failure":
          case "forgotPassword_failure":
            break;
          default:
            await fetchAuthUser();
        }
      }
    );

    // cleanup
    return () => {
      authListener();
    };
  }, [user]);

  /**
   * log user in
   * @param email
   * @param password
   */
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await Auth.signIn({ username: email, password });
  };

  /**
   * create new user account
   * @param email
   * @param password
   * @param firstName
   * @param lastName
   */
  // const signUp = async ({
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  // }: {
  //   email: string;
  //   password: string;
  //   firstName: string;
  //   lastName: string;
  // }) => {
  //   await Auth.signUp({
  //     username: email,
  //     password,
  //     attributes: {
  //       email,
  //       name: `${firstName} ${lastName}`,
  //     },
  //   });
  //   setUnverifiedAccount({ email, password });
  // };



  /**
   * logout user
   */
  const signOut = async () => Auth.signOut();

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthenticating,
    signIn,
    signOut,
    // signUp,
  }

  if (isAuthenticating) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
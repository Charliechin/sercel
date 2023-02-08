export interface IAuthContextType {
  user: any
  isAuthenticated: boolean
  isAuthenticating: boolean
  signIn: (p: { email: string; password: string }) => Promise<any>
  signOut: () => Promise<any>
}

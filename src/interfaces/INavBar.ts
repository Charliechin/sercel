import { SignOut } from "@aws-amplify/ui-react/dist/types/components/Authenticator/Authenticator"
import { FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export interface INavBarProps {
  signout?: SignOut
  props?: FlexProps | any
  authenticated?: boolean
}

export interface IMenuItemsProps {
  children?: ReactNode
}
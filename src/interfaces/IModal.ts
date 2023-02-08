export interface IModalProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void;
}
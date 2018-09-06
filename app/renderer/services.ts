import { Client } from "app/renderer/api"

export type Services = {
  // Client used to communicate with backend via IPC
  apiClient: Client,

  // Method to show a message for a not-yet-implemented functionality
  showUnimplementedMessage: () => void

  // Method to show a success message
  showSuccess: (message: string) => void
}
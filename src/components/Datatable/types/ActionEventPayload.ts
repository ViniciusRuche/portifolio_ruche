export type ActionEventPayload = {
  [key: string]: unknown
}

export type ActionEvent = {
  type: string
  payload: ActionEventPayload
}

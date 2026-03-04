import { ref } from 'vue'

export function useConfirmationDialog() {
  const dialogOpen = ref(false)
  const dialogTitle = ref('')
  const dialogContent = ref('')
  const handlerOptions = ref({})

  let dialogHandler: ((payload?: object) => void) | null = null

  const confirmAction = (
    message: string,
    title: string,
    onConfirm: () => void,
    payload: object
  ) => {
    dialogOpen.value = true
    dialogTitle.value = title
    dialogContent.value = message
    dialogHandler = onConfirm
    handlerOptions.value = payload || {}
  }

  const handleConfirmation = () => {
    if (dialogHandler) {
      dialogHandler(handlerOptions.value)
      dialogHandler = null
    }
    dialogOpen.value = false
  }

  const handleCancel = () => {
    dialogOpen.value = false
    dialogHandler = null
  }

  return { confirmAction, handleConfirmation, handleCancel, dialogOpen, dialogTitle, dialogContent }
}

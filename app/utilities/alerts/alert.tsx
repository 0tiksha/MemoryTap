import { Alert, AlertButton, AlertOptions } from "react-native";

/**
 * Creates Alert
 * @param title The Title for the Alert
 * @param message The Message for the Alert
 * @param isCancellable If the alert can be closed.
 * @param isError If the Alert is for Alert.
 * @param onDismiss The callback for on dismiss.
 */
export default function createAlert(
  title: string,
  message: string,
  isCancellable: boolean,
  isError?: boolean,
  onDismiss?: () => void,
  buttons?: AlertButton[]
) {
  let options: AlertOptions = {
    cancelable: isCancellable,
    onDismiss: onDismiss,
    userInterfaceStyle: "light",
  };

  if (isError) {
    options = {
      ...options,
      userInterfaceStyle: "dark",
    };
  }

  let alert = Alert.alert(title, message, buttons, options);
  return alert;
}

import defaults from 'lodash/defaults';
import Noty from 'noty';

export const AlertType = {
  DANGER: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'information'
};

// require('noty/lib/noty.css');

const defaultOpts: Noty.Options = {
  theme: 'bootstrap-v4',
  closeWith: ['click', 'button']
};

const defaultCloseMs = 3000;

export function clearAlerts<T>() {
  Noty.closeAll();
}

export function addDangerMessage(message: string) {
  return new Noty(
    defaults(
      {
        text: message,
        type: AlertType.DANGER
      },
      defaultOpts
    )
  ).show();
}

export function addSuccessMessage(message: string) {
  return new Noty(
    defaults(
      {
        text: message,
        type: AlertType.SUCCESS,
        timeout: defaultCloseMs
      },
      defaultOpts
    )
  ).show();
}

export function addWarningMessage(message: string) {
  return new Noty(
    defaults(
      {
        text: message,
        type: AlertType.WARNING
      },
      defaultOpts
    )
  ).show();
}

export function addInfoMessage(message: string) {
  return new Noty(
    defaults(
      {
        text: message,
        type: AlertType.INFO,
        timeout: defaultCloseMs
      },
      defaultOpts
    )
  ).show();
}

export function removeAlert(n) {
  if (n && typeof n.close === 'function') {
    n.close();
  }
}

export interface DialogOptions {
  body: string;
  hideIcon?: boolean;
  type?: 'error' | 'success' | 'warning' | 'info' | 'confirm';
  title?: string;
  showCancelAction?: boolean;
  cancelLabel?: string;
  acceptLabel?: string;
}

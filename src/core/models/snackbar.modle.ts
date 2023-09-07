
export enum SnackbarSeverity {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
}

export interface SnackbarMessage {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

export interface SnackbarContextType {
    snackMessage: SnackbarMessage;
    setSnackbarMessage: (message: SnackbarMessage) => void;
}


export const defaultSnackbarContextType = {
    snackMessage: { open: false, message: "dsfsdfsdf", severity: SnackbarSeverity.Success },
    setSnackbarMessage: () => null
} 
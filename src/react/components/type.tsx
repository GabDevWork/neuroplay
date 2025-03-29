export type TypeDataAlerts = {
    alertType: number,
    alertText: string,
    alertButtons: string[],
    alertsCommans: (()=> void)[],
}
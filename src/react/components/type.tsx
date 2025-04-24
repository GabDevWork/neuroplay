export type TypeDataAlerts = {
    alertType: number,
    alertText: string,
    alertButtons: string[],
    alertsCommans: (()=> void)[],
}

export type TypeDataActivity = {
    activityQuestion: string,
    activityAlternatives: string[],
    activityAnswer: string,
    activityComand: (()=> void)[],
}
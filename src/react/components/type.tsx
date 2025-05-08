export type TypeDataAlerts = {
    alertType: number,
    alertText: string,
    alertButtons: string[],
    alertsCommans: (()=> void)[],
}

export type TypeDataLevel = {
    levelId: number, 
    levelDescription: string,
    levelAnimalDesc: string,
    levelAnimalPhoto: string,
    levelStampPhoto: string,
    activityComand: (()=> (void))[],
}
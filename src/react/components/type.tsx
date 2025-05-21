export type TypeDataAlerts = {
    alertType: number,
    alertText: string,
    alertButtons: string[],
    alertsCommans: (()=> void)[],
}

export type TypeDataLevel = {
    levelStudentId: string,
    levelId: number, 
    levelDescription: string,
    levelAnimalDesc: string,
    levelAnimalPhoto: string,
    levelStampPhoto: string,
    levelRepeat: boolean,
    activityComand: (()=> (void))[],
}
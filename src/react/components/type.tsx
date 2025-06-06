export type TypeDataAlerts = {
    alertType: number,
    alertTitle?: string,
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
    levelAudio: string,
    levelRepeat: boolean,
    activityComand: (()=> (void))[],
}
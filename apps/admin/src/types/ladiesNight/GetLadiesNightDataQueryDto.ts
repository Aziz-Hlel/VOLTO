

export type GetLadiesNightDataQueryDto = {
    startDate?: Date
    endDate?: Date
    limit: number
    page: number
    sort?: 'startDate:asc' | 'startDate:desc'
}
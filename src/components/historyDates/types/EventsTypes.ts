export interface HistoricalEvent {
	id: number
	year: number
	title: string
	description: string
}

export interface TimePeriod {
	id: number
	title: string
	events: HistoricalEvent[]
}

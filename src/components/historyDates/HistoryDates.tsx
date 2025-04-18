import React, { useState } from 'react'
import EventsSlider from '../../features/slider/EventsSlider'
import './styles/historyDates.scss'
import { TimePeriod } from './types/EventsTypes'
import { periods } from './historyEvents'
import Circle from '../../features/circle/Circle'

interface HistoryDatesProps {
	periods?: TimePeriod[]
	initialActivePeriod?: number
}

const HistoryDates: React.FC<HistoryDatesProps> = ({
	periods: customPeriods = periods,
	initialActivePeriod = 0,
}) => {
	const [activePeriod, setActivePeriod] = useState(initialActivePeriod)

	const handlePeriodChange = (index: number) => {
		setActivePeriod(index)
	}

	return (
		<section className="historyDates">
			<div className="historyDates__container">
				<div className="historyDates__content">
					<h2 className="historyDates__title">
						Исторические <br /> даты
					</h2>
					<Circle
						periods={customPeriods}
						activePeriod={activePeriod}
						onPeriodChange={handlePeriodChange}
					/>
				</div>
				<div className="timeline-container">
					<EventsSlider
						periods={customPeriods}
						activePeriod={activePeriod}
					/>
				</div>
			</div>
		</section>
	)
}

export default HistoryDates

import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './eventsSlider.scss'
import { TimePeriod } from '../../components/historyDates/types/EventsTypes'

interface EventsSliderProps {
	periods: TimePeriod[]
	activePeriod: number
}

const EventsSlider: React.FC<EventsSliderProps> = ({
	periods,
	activePeriod,
}) => {
	const eventsSwiperRef = useRef<any>(null)

	useEffect(() => {
		if (eventsSwiperRef.current?.swiper) {
			eventsSwiperRef.current.swiper.slideTo(0)
		}
	}, [activePeriod])

	return (
		<div className="events-slider-container">
			<Swiper
				ref={eventsSwiperRef}
				modules={[Navigation]}
				navigation
				spaceBetween={30}
				slidesPerView={3}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 20 },
					768: { slidesPerView: 2, spaceBetween: 30 },
					1024: { slidesPerView: 3, spaceBetween: 40 },
				}}
			>
				{periods[activePeriod].events.map(event => (
					<SwiperSlide key={event.id}>
						<div className="event-card">
							<h2 className="event-year">
								{event.year}
								<br />
								{event.title}
							</h2>
							<p className="event-description">
								{event.description}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default EventsSlider

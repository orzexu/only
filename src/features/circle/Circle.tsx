import React, { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './circle.scss'
import { TimePeriod } from '../../components/historyDates/types/EventsTypes'
import { animatePeriodChange, getDotPosition } from './circleAnimations'

interface CircleProps {
	periods: TimePeriod[]
	activePeriod: number
	onPeriodChange: (_index: number) => void
}

const Circle: React.FC<CircleProps> = ({
	periods,
	activePeriod,
	onPeriodChange,
}) => {
	const dotsRef = useRef<{ [key: number]: HTMLDivElement | null }>({})
	const isHovered = useRef<{ [key: number]: boolean }>({})
	const animationRef = useRef<gsap.core.Timeline | null>(null)
	const rotationAngle = useRef(30)
	const startYearRef = useRef<HTMLSpanElement | null>(null)
	const endYearRef = useRef<HTMLSpanElement | null>(null)

	const handlePrevPeriod = () => {
		const newIndex =
			activePeriod === 0 ? periods.length - 1 : activePeriod - 1
		animationRef.current?.kill()
		animationRef.current = animatePeriodChange(
			newIndex,
			activePeriod,
			periods,
			dotsRef,
			isHovered,
			rotationAngle,
			startYearRef,
			endYearRef,
			onPeriodChange
		)
	}

	const handleNextPeriod = () => {
		const newIndex =
			activePeriod === periods.length - 1 ? 0 : activePeriod + 1
		animationRef.current?.kill()
		animationRef.current = animatePeriodChange(
			newIndex,
			activePeriod,
			periods,
			dotsRef,
			isHovered,
			rotationAngle,
			startYearRef,
			endYearRef,
			onPeriodChange
		)
	}

	const handleDotHover = (index: number, isHovering: boolean) => {
		const dot = dotsRef.current[index]
		if (!dot || index === activePeriod || animationRef.current?.isActive())
			return

		isHovered.current[index] = isHovering

		if (isHovering) {
			gsap.to(dot, {
				width: 56,
				height: 56,
				backgroundColor: 'white',
				border: '1px solid #42567A',
				duration: 0.3,
			})

			gsap.to(dot.querySelector('.period-dot-number'), {
				opacity: 1,
				duration: 0.2,
			})
		} else {
			gsap.to(dot.querySelector('.period-dot-number'), {
				opacity: 0,
				duration: 0.1,
				onComplete: () => {
					gsap.to(dot, {
						width: 6,
						height: 6,
						backgroundColor: '#42567A',
						border: 'none',
						duration: 0.3,
					})

					gsap.to(dot.querySelector('.period-dot-number'), {
						opacity: 0,
						duration: 0.1,
					})
				},
			})
		}
	}

	useEffect(() => {
		periods.forEach((_, index) => {
			const dot = dotsRef.current[index]
			if (dot) {
				const isActive = index === activePeriod
				gsap.set(dot, {
					...getDotPosition(
						index,
						periods.length,
						rotationAngle.current
					),
					width: isActive ? 56 : 6,
					height: isActive ? 56 : 6,
					backgroundColor: isActive ? 'white' : '#42567A',
					border: isActive ? '1px solid #42567A' : 'none',
				})

				gsap.set(dot.querySelector('.period-dot-number'), {
					opacity: isActive ? 1 : 0,
				})
			}
		})
	}, [periods.length, activePeriod])

	return (
		<>
			<div className="timeline-circle-container">
				<div className="circle-with-lines">
					{periods.map((period, index) => {
						const isActive = index === activePeriod
						return (
							<div
								key={period.id}
								ref={el => {
									dotsRef.current[index] = el
								}}
								className={`period-dot ${isActive ? 'active' : ''}`}
								onClick={() => {
									animationRef.current?.kill()
									animationRef.current = animatePeriodChange(
										index,
										activePeriod,
										periods,
										dotsRef,
										isHovered,
										rotationAngle,
										startYearRef,
										endYearRef,
										onPeriodChange
									)
								}}
								onMouseEnter={() => handleDotHover(index, true)}
								onMouseLeave={() =>
									handleDotHover(index, false)
								}
							>
								<div className="period-dot-number">
									{index + 1}
								</div>
								{isActive && (
									<div className="period-title">
										{period.title}
									</div>
								)}
							</div>
						)
					})}
				</div>

				<div className="center-period">
					<div className="period-years">
						<span ref={startYearRef} className="start-year">
							{periods[activePeriod].events[0].year}
						</span>
						&nbsp;&nbsp;
						<span ref={endYearRef} className="end-year">
							{
								periods[activePeriod].events[
									periods[activePeriod].events.length - 1
								].year
							}
						</span>
					</div>
				</div>

				<div className="circle-nav">
					<div className="circle-period-info">
						{activePeriod + 1}/{periods.length}
					</div>
					<div className="circle-nav-buttons">
						<button
							className="circle-nav-button circle-nav-prev"
							onClick={handlePrevPeriod}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11 3L5 9L11 15"
									stroke="#42567a"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button
							className="circle-nav-button circle-nav-next"
							onClick={handleNextPeriod}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 3L13 9L7 15"
									stroke="#42567a"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Circle

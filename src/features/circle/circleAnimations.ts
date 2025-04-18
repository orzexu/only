import gsap from 'gsap'
import { TimePeriod } from '../../components/historyDates/types/EventsTypes'

interface DotPosition {
	x: number
	y: number
}

export const getDotPosition = (
	index: number,
	total: number,
	rotation: number
): DotPosition => {
	const baseAngle = (index * (360 / total) + rotation) * (Math.PI / 180)
	const radius = 265
	return {
		x: Math.round(Math.sin(baseAngle) * radius),
		y: Math.round(-Math.cos(baseAngle) * radius),
	}
}

export const animatePeriodChange = (
	newIndex: number,
	activePeriod: number,
	periods: TimePeriod[],
	dotsRef: React.RefObject<{ [key: number]: HTMLDivElement | null }>,
	isHovered: React.RefObject<{ [key: number]: boolean }>,
	rotationAngle: React.RefObject<number>,
	startYearRef: React.RefObject<HTMLSpanElement | null>,
	endYearRef: React.RefObject<HTMLSpanElement | null>,
	onPeriodChange: (index: number) => void
) => {
	if (newIndex === activePeriod) return null

	const animation = gsap.timeline({
		onComplete: () => {
			rotationAngle.current = 30 - (newIndex * 360) / periods.length
			onPeriodChange(newIndex)
			isHovered.current[newIndex] = false
		},
	})

	// Анимация текущей активной точки (сжатие), если она не в ховере
	if (dotsRef.current[activePeriod] && !isHovered.current[activePeriod]) {
		animation.to(
			dotsRef.current[activePeriod],
			{
				width: 6,
				height: 6,
				backgroundColor: '#42567A',
				border: 'none',
				duration: 0.5,
				ease: 'power2.inOut',
			},
			0
		)
		animation.to(
			dotsRef.current[activePeriod]!.querySelector('.period-dot-number'),
			{
				opacity: 0,
				duration: 0.3,
				ease: 'power2.inOut',
			},
			0
		)
	}

	// Анимация новой активной точки (увеличение), только если она не в ховере
	if (dotsRef.current[newIndex] && !isHovered.current[newIndex]) {
		animation.to(
			dotsRef.current[newIndex],
			{
				width: 56,
				height: 56,
				backgroundColor: 'white',
				border: '1px solid #42567A',
				duration: 0.5,
				ease: 'power2.inOut',
			},
			0
		)
		animation.to(
			dotsRef.current[newIndex]!.querySelector('.period-dot-number'),
			{
				opacity: 1,
				duration: 0.3,
				ease: 'power2.inOut',
			},
			0
		)
	}

	// Анимация вращения (для всех точек)
	const currentRotation = rotationAngle.current
	const targetRotation = 30 - (newIndex * 360) / periods.length
	const rotationObject = { value: currentRotation }

	animation.to(
		rotationObject,
		{
			value: targetRotation,
			duration: 0.7,
			ease: 'power2.inOut',
			onUpdate: () => {
				periods.forEach((_, index) => {
					if (dotsRef.current[index]) {
						const position = getDotPosition(
							index,
							periods.length,
							rotationObject.value
						)
						gsap.set(dotsRef.current[index], {
							x: position.x,
							y: position.y,
						})
					}
				})
			},
		},
		0
	)

	// Анимация годов
	if (startYearRef.current && endYearRef.current) {
		const refs = [startYearRef.current, endYearRef.current]
		const currentValues = [
			periods[activePeriod].events[0]?.year || 0,
			periods[activePeriod].events[
				periods[activePeriod].events.length - 1
			]?.year || 0,
		]
		const targetValues = [
			periods[newIndex].events[0]?.year || 0,
			periods[newIndex].events[periods[newIndex].events.length - 1]
				?.year || 0,
		]

		animation.to(refs, { filter: 'blur(2px)', duration: 0.3 }, 0)
		animation.to(
			refs,
			{ filter: 'blur(0px)', duration: 0.3, clearProps: 'filter' },
			0.4
		)

		refs.forEach((ref, i) => {
			animation.to(
				{ value: currentValues[i] },
				{
					value: targetValues[i],
					duration: 0.7,
					ease: 'power2.inOut',
					onUpdate: function () {
						ref.textContent = Math.round(
							this.targets()[0].value
						).toString()
					},
				},
				0
			)
		})
	}

	return animation
}

const now = new Date()

export default [
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 1,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    id: 2,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    id: 3,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    id: 24,
    title: 'DST ends on this day (Europe)',
    start: new Date(2023, 8, 30, 0, 0, 0),
    end: new Date(2023, 8, 30, 4, 30, 0),
  },
  {
    id: 4,
    title: 'DST ends on this day (America)',
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 5,
    title: 'DST ends on this day (Europe)',
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
  },
  {
    id: 6,
    title: 'DST ends on this day (America)',
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 26,
    title: 'DST starts on this day (America)',
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
  },
  {
    id: 27,
    title: 'DST starts on this day (Europe)',
    start: new Date(2023, 2, 26, 0, 0, 0),
    end: new Date(2023, 2, 26, 4, 30, 0),
  },
  {
    id: 28,
    title: 'Event 1',
    start: new Date(2023, 7, 25, 10, 0),
    end: new Date(2023, 7, 25, 12, 0),
    description: 'This is event 1 description.',
    color: '#FF5733'
  },
]
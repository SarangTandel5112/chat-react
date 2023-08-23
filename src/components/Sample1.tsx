import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const events = [
    {
        id: 1,
        title: 'Event 1',
        start: new Date(2023, 7, 25, 10, 0),
        end: new Date(2023, 7, 25, 12, 0),
        description: 'This is event 1 description.',
        color: '#FF5733'
    },
    // ... more events
];

function App() {
    const localizer = momentLocalizer(moment);

    return (
        <div className="App">
            <h1>Calendar with Popover</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                components={{
                    event: EventWithPopover
                }}
                style={{ height: 500 }}
            />
        </div>
    );
}

const EventWithPopover = ({ event }: any) => {
    const [showPopover, setShowPopover] = useState(false);

    const handlePopoverClick = (e: any) => {
        e.preventDefault();
        setShowPopover(!showPopover);
    };

    return (
        <OverlayTrigger
            trigger="click"
            placement="right" // Adjust placement as needed
            show={showPopover}
            overlay={
                <Popover id={`popover-${event.id}`} onClick={(e) => e.stopPropagation()}>
                    <Popover.Header as="h3">{event.title}</Popover.Header>
                    <Popover.Body>
                        <p>{event.description}</p>
                        <button onClick={handlePopoverClick}>Close</button>
                    </Popover.Body>
                </Popover>
            }
        >
            <div
                className="rbc-event"
                style={{ backgroundColor: 'none', border: 'none', padding: '2px' }}
                onClick={handlePopoverClick}
            >
                {event.title}
            </div>
        </OverlayTrigger>
    );
};

export default App;

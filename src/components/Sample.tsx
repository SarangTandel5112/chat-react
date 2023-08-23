import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import event from './event';
import { useRef, useState } from 'react';
import { Button, Overlay, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

const localizer = momentLocalizer(moment)

const CustomHeader = ({ label, onNavigate, onView }: any) => {

    const handleTodayClick = () => {
        const now = new Date();
        onNavigate('TODAY', now);
    };

    const handlePrevClick = () => {
        onNavigate('PREV');
    };

    const handleNextClick = () => {
        onNavigate('NEXT');
    };

    const handleViewChange = (view: any) => {
        onView(view);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleViewChange('day')}>Day</button>
                <button onClick={() => handleViewChange('week')}>Week</button>
                <button onClick={() => handleViewChange('month')}>Month</button>
            </div>
            <span>{label}</span>
            <button onClick={handleTodayClick}>Today</button>
            <button onClick={handlePrevClick}>Back</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
    const backgroundColor = '#4286f4';
    const style = {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
    };

    return {
        style,
    };
};

export default function MarkdownEditor() {

    const [tooltipState, setTooltipState]: any = useState({});

    const handleSelectSlot = ({ start, end }: any) => {
        console.log(start, "=====================", end);
    };

    const eventRefs: any = useRef({});

    const handleEventClick = (event: any) => {
        console.log(tooltipState, '=========tooltipState=======');
        console.log(event);

        setTooltipState((prevTooltipState: any) => ({
            ...prevTooltipState,
            [event.id]: !prevTooltipState[event.id],
        }));
    };

    console.log(eventRefs, '===========eventRefs=============');

    const EventWrapper = ({ event, children }: any) => {
        console.log(event, '=====event=======');

        const eventRef = useRef(null);

        eventRefs.current[event.id] = eventRef;

        return (

            <OverlayTrigger
                trigger="click"
                key="left"
                placement="left"
                overlay={
                    <Popover id={`${event.id}`}>
                        <Popover.Header as="h3">{`${event.id}`}</Popover.Header>
                        <Popover.Body>
                            <strong>Holy guacamole!</strong> Check this info.
                        </Popover.Body>
                    </Popover>
                }
            >
                {children}
            </OverlayTrigger>


        );
    };

    const EventWithPopover = ({ event, children }: any) => {
        const [showPopover, setShowPopover] = useState(false);
        console.log(event, '---------event------------');
        console.log(children, '---------children------------');


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



    return (
        <>
            <Calendar
                localizer={localizer}
                components={{
                    toolbar: CustomHeader,
                    eventWrapper: EventWithPopover,
                }}
                events={event}
                eventPropGetter={eventStyleGetter}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable={true} // Allow selecting slots
                onSelectSlot={handleSelectSlot} // Handle slot selection
                onSelectEvent={handleEventClick}
            />
            {/* <>
                {['top', 'right', 'bottom', 'left'].map((placement: any) => (
                    <OverlayTrigger
                        trigger="click"
                        key={placement}
                        placement={placement}
                        overlay={
                            <Popover id={`popover-positioned-${placement}`}>
                                <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
                                <Popover.Body>
                                    <strong>Holy guacamole!</strong> Check this info.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button variant="secondary">Popover on {placement}</Button>
                    </OverlayTrigger>
                ))}
            </> */}
            {/* {event.map((events: any) => (
                <Overlay
                    key={events.id}
                    target={eventRefs.current[events.id]}
                    show={tooltipState[events.id] || false}
                    placement="auto" // Set the placement to 'auto' or 'right'
                >
                    {(props) => (
                        <Tooltip id={`tooltip-${events.id}`} {...props}>
                            {events.title}
                        </Tooltip>
                    )}
                </Overlay>
            ))} */}
        </>
    );
}

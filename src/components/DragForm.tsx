import React, { useState } from 'react';
import { useFormik } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialFields = [
    { id: 'field1', label: 'Text', type: 'text', subFieldName: 'First Name', placeHolder: 'Charmi' },
    { id: 'field2', label: 'Radio', type: 'radio', subFieldName: 'Select Radio', placeHolder: 'Charmi', options: ['option1', 'option2'] },
    // ... Add more fields as needed
];

const DynamicForm: React.FC = () => {
    const [formFields, setFormFields]: any = useState([]);

    const formik = useFormik({
        initialValues: {}, // Your initial values here
        onSubmit: values => {
            console.log('Submitted:', values);
        },
    });

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        if (result.source.droppableId === 'availableFields' && result.destination.droppableId === 'formFields') {
            const draggedField = initialFields[result.source.index];
            // Add the dragged field to the form fields
            setFormFields((prevFields: any) => [...prevFields, draggedField]);
        } else if (result.source.droppableId === 'formFields' && result.destination.droppableId === 'formFields') {
            const updatedFields = Array.from(formFields);
            const [draggedField] = updatedFields.splice(result.source.index, 1);
            updatedFields.splice(result.destination.index, 0, draggedField);
            setFormFields(updatedFields);
        }
    };

    return (
        //     <Formik
        //         initialValues={initialValues}
        //         validationSchema={validationSchema}
        //         onSubmit={(values) => console.log(values)}
        //     >
        //         {({ values }) => (
        //       <Form></Form>
        //     )}
        //   </Formik>
        <form onSubmit={formik.handleSubmit}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <h2>Draggable Fields</h2>
                    <Droppable droppableId="availableFields" direction="horizontal">
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {initialFields.map((field, index) => (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {field.label}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                <div>
                    <h2>Form Fields</h2>
                    <Droppable droppableId="formFields">
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {formFields.map((field: any, index: any) => (
                                    <div key={index}>
                                        <>
                                            <input
                                                type='text'
                                                style={{ border: 'none' }}
                                                id={`formFields[${index}].subFieldName`}
                                                name={`formFields[${index}].subFieldName`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={field.subFieldName}
                                            />
                                            {
                                                field?.type === 'text' ?
                                                    <input
                                                        type={field.type}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder={field.placeHolder}
                                                        readOnly
                                                        value={''} // Adjust this based on your form values structure
                                                    /> : field?.type === 'radio' ?
                                                        <>
                                                            <input
                                                                type='radio'
                                                                id={`dynamicFields.${field.id}`}
                                                                name={`dynamicFields.${field.id}`}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={''}
                                                            />
                                                            <input
                                                                type='text'
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder={field.placeHolder}
                                                                readOnly
                                                                value={''} // Adjust this based on your form values structure
                                                            /></> :
                                                        <></>

                                            }
                                        </>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;

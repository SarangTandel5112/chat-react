import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Switch } from 'antd';
import styles from './DynamicForm.module.css'
import { useNavigate } from 'react-router-dom';

const DynamicForm = () => {

  const navigate = useNavigate();

  const initialValues = {
    maindesc: "aaaaaaa",
    fields: [{ type: '', question: '', options: [], required: false }],
  };

  const validationSchema = Yup.object().shape({
    fields: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required('Type is required')
        // label: Yup.string().when('type', {
        //   is: (val: any) => val === 'radio' || val === 'dropdown',
        //   then: Yup.string().required('Label is required'),
        // }),

      })
    ),
  });

  const handleAddField = (push: any) => {
    push({ type: '', question: '', options: [], required: false });
  };

  const handleAddOption = (pushOption: any, fieldIndex: any) => {
    pushOption('', fieldIndex);
  };

  const handleRemoveField = (remove: any, index: any) => {
    remove(index);
  };

  const ToggleSwitch = ({ field, form }: any) => {
    const handleChange = (checked: any) => {
      form.setFieldValue(field.name, checked);
    };

    return (
      <Switch
        className={styles.tooglebtn}
        checked={field.value}
        onChange={handleChange}
      />
    );
  };

  const renderFormFields = (values: any, push: any, remove: any) => {
    return values.fields.map((field: any, index: any) => {
      return (
        <div key={index} className={styles.optiondiv}>
          <div className={styles.selectdiv}>
            <div>
              <Field
                as="select"
                name={`fields.${index}.type`}
                id={`fields.${index}.type`}
                validate={(value: any) => !value && 'Type is required'}
                className={styles.optionset}
              >
                <option value="">Select type of question</option>
                <option value="text">Short Question</option>
                <option value="textarea">Long Question</option>
                <option value="checkbox">checkbox</option>
                <option value="file">Upload</option>
              </Field>
              <ErrorMessage name={`fields.${index}.type`} component="div" />
            </div>
            <div className={styles.querightdiv}>
              <div className={styles.requireddiv}>
                <Field name={`fields.${index}.required`} component={ToggleSwitch} />
                <span className={styles.tglbtn}>Required</span>
              </div>
              <button className={styles.removebtn} type="button" onClick={() => handleRemoveField(remove, index)}>
                <i className="fa-solid fa-trash addquebtn"></i>
              </button>
            </div>
          </div>

          {field.type && (
            <>
              <div>
                <Field
                  type="text"
                  name={`fields.${index}.question`}
                  id={`fields.${index}.question`}
                  placeholder="Enter Question"
                  validate={(value: any) =>
                    !value ? 'Question is required' : ''
                  }
                  className={styles.quemain}
                />

              </div>
              {
                field.type === 'checkbox' ?
                  <>
                    <FieldArray name={`fields.${index}.options`}>
                      {({ push: pushOption, remove: removeOption }) => (
                        <div>
                          {field.options.map((option: any, optionIndex: any) => (
                            <div key={optionIndex}>
                              <Field type="checkbox" className={styles.checkboxbtn} name={`fields.${index}.optionscheck.${optionIndex}`} />
                              <Field
                                type="text"
                                className={styles.checkname}
                                name={`fields.${index}.options.${optionIndex}`}
                                placeholder={`Option${optionIndex}`}
                                validate={(value: any) =>
                                  !value && 'Option is required'
                                }
                                style={{ border: 'none' }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(optionIndex)
                                }
                                className={styles.addoptionbtn}
                              >
                                <i className="fa-solid fa-trash addquebtn"></i>
                              </button>
                            </div>
                          ))}
                          <br />
                          <button
                            type="button"
                            onClick={() =>
                              handleAddOption(pushOption, index)
                            }
                            className={styles.addoptionbtn}
                          >
                            <i className="fa-solid fa-plus addquebtn"></i><span className={styles.addquename}>Add Option</span>
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </> :
                  field.type === 'file' ?
                    <Field
                      type="file"
                      name={`fields.${index}.file`}
                      id={`fields.${index}.file`}
                      placeholder="Enter Question"
                      className={styles.filemain}
                    />
                    :
                    <></>
              }
              <ErrorMessage name={`fields.${index}.question`} component="div" />
            </>
          )}
          <br></br>

        </div>
      );
    });
  };

  return (
    <div className={styles.maincomp}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="fields">
              {({ push, remove }) => (
                <div>
                  <div className={styles.uperdiv}>
                    <button className={styles.addNewDevice} type="submit">
                      Save Template
                    </button>
                  </div>
                  <div className={styles.maintitle}>
                    
                    <Field
                      type="text"
                      rows="2"
                      cols="50"
                      name="maindesc"
                      id="maindesc"
                      placeholder="Enter Description"
                      validate={(value: any) =>
                        !value ? 'Description is required' : ''
                      }
                      className={styles.textarea}
                    />
                  </div>

                  {renderFormFields(values, push, remove)}
                  <br></br>
                  <button type="button" className={styles.addquebtn} onClick={() => handleAddField(push)}>
                    <i className="fa-solid fa-plus addquebtn"></i><span className={styles.addquename}>Add Question</span>
                  </button>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
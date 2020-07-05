import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import { object, string, date } from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ICreateObjective {
  objectiveTitle: string;
  description: string;
  owner: string;
  endDate: Date;
}

const formSchema = object({
  objectiveTitle: string().required('Objective title is required field'),
  description: string().required(),
  owner: string().required(),
  endDate: date(),
});

const initialValues: ICreateObjective = {
  objectiveTitle: '',
  description: '',
  owner: '',
  endDate: new Date(),
};

export function CreateObjective() {
  const renderForms = (formikProps: FormikProps<ICreateObjective>) => {
    const { touched, errors, handleSubmit, handleChange, values, setFieldValue } = formikProps;
    return (
      <form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="objectiveTitle">
          <Form.Label>Objective Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="objectiveTitle"
            isInvalid={touched['objectiveTitle'] && !!errors['objectiveTitle']}
            type="text"
            placeholder="Objective Title"
            value={values['objectiveTitle']}
          />
          <Form.Control.Feedback type="invalid">{errors['objectiveTitle']}</Form.Control.Feedback>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChange}
            name="description"
            isInvalid={touched['description'] && !!errors['description']}
            placeholder="description of the objective"
            value={values['description']}
          />
          <Form.Control.Feedback type="invalid">{errors['description']}</Form.Control.Feedback>
          <Form.Label>Owner</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="owner"
            isInvalid={touched['owner'] && !!errors['owner']}
            type="text"
            placeholder="Owner of the workstation"
            value={values['owner']}
          />
          <Form.Control.Feedback type="invalid">{errors['owner']}</Form.Control.Feedback>
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={values['endDate']}
            className="date-picker"
            onChange={(date) => setFieldValue('endDate', date)}
            dateFormat="yyyy, QQQ"
            showQuarterYearPicker
          />
          <Form.Control.Feedback type="invalid">{errors['endDate']}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Create Objective</Button>
      </form>
    );
  };
  const submitObjective = (values: ICreateObjective, actions: any) => {
    console.log('submitojective', values, actions);
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Formik validationSchema={formSchema} onSubmit={submitObjective} initialValues={initialValues}>
            {(formik) => renderForms(formik)}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

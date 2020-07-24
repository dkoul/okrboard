import React from 'react';
import { Spinner, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import { object, string, date } from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery, useMutation } from 'react-query';
import { getAllDepartments, createObjective, getUsers } from '../api/workstation';
import Select from 'react-select';
import { ILabel } from '../models/shared';
import { addSuccessMessage, addDangerMessage } from '../utils/alertUtil';
import { find, map } from 'lodash';

interface ICreateObjective {
  objectiveTitle: string;
  description: string;
  endDate: Date;
  departmentName: ILabel;
  ownerName: ILabel;
}

const formSchema = object({
  objectiveTitle: string().required('Objective title is required field'),
  description: string().required(),
  owner: string().required(),
  endDate: date()
});

const initialValues: ICreateObjective = {
  objectiveTitle: '',
  description: '',
  endDate: new Date(),
  departmentName: {
    label: '',
    value: '',
    key: ''
  },
  ownerName: {
    label: '',
    value: '',
    key: ''
  }
};

export function CreateObjective() {
  const departmentDetails = useQuery('getAllDepartments', getAllDepartments);
  const userDetails = useQuery('getUsers', getUsers);
  const [sObjective, { isLoading }] = useMutation(createObjective, {});
  const renderForms = (formikProps: FormikProps<ICreateObjective>) => {
    const { touched, errors, handleSubmit, handleChange, values, setFieldValue } = formikProps;
    const departmentOptions = map(departmentDetails.data, d => ({ value: d.id, label: d.name }));
    const usersOptions = map(userDetails.data, d => ({ value: d.id, label: `${d.firstName} ${d.lastName}` }));

    return (
      <form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="objectiveTitle">
          <Form.Label>Department</Form.Label>
          <Select
            onChange={option => setFieldValue('departmentName', option)}
            placeholder="select Department"
            name="departmentName"
            value={values.departmentName}
            options={departmentOptions}
          />
          <Form.Label>Owner</Form.Label>
          <Select
            onChange={option => setFieldValue('ownerName', option)}
            placeholder="select Owner"
            name="ownerName"
            value={values.ownerName}
            options={usersOptions}
          />
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
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={values['endDate']}
            className="date-picker"
            onChange={date => setFieldValue('endDate', date)}
            dateFormat="yyyy, QQQ"
            showQuarterYearPicker
          />
          <Form.Control.Feedback type="invalid">{errors['endDate']}</Form.Control.Feedback>
        </Form.Group>
        {isLoading && <Spinner animation="border" />}
        {!isLoading && <Button type="submit">Create Objective</Button>}
      </form>
    );
  };
  const submitObjective = async (values: ICreateObjective, actions: any) => {
    try {
      await sObjective({
        department: find(departmentDetails.data, d => d.id === values.departmentName.value),
        owner: find(userDetails.data, d => d.id === values.ownerName.value),
        title: values.objectiveTitle,
        startDate: '2020-07-18',
        endDate: '2020-07-18',
        description: values.description
      });
      addSuccessMessage('Successfully created Objective.');
    } catch (error) {
      addDangerMessage('Error in creating objective.');
    }
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Formik validationSchema={formSchema} onSubmit={submitObjective} initialValues={initialValues}>
            {formik => renderForms(formik)}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

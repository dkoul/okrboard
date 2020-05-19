import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import { object, string } from 'yup';
import { ResultType } from './ResultType';

// https://anujsingla.atlassian.net/plugins/servlet/ac/okrplugin_prod/post-install#!/okr-explorer?expandedItems=%5B%2275330-0%22,%2275332-1%22,%2275331-1%22,%2275333-1%22,%2275335-1%22,%2275336-1%22,%2275337-1%22,%2275334-1%22,%2275338-2%22,%2275342-3%22,%2275345-3%22,%2275346-3%22,%2275343-3%22,%2275339-2%22,%2275340-3%22,%2275344-3%22,%2275341-3%22,%220-0%22,%2275347-0%22%5D&assigneeIds=null&intervalId=9914&groupIds=null&gradeId=0&OKRTypeId=3

interface ICreateWorkstation {
  keyResultTitle: string;
  resultType: string;
  description: string;
}

const formSchema = object({
  keyResultTitle: string().required('Name is a required field'),
  resultType: string(),
  description: string().required('Description is a required field'),
});

const initialValues: ICreateWorkstation = {
  keyResultTitle: '',
  resultType: '',
  description: '',
};

export function KeyResults() {
  const renderForms = (formikProps: FormikProps<ICreateWorkstation>) => {
    const { touched, errors, handleSubmit, handleChange, values } = formikProps;
    return (
      <form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="keyResultTitle">
          <Form.Label>Key Result Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="keyResultTitle"
            isInvalid={touched['keyResultTitle'] && !!errors['keyResultTitle']}
            type="text"
            placeholder="Workstream name"
            value={values['keyResultTitle']}
          />
          <Form.Control.Feedback type="invalid">{errors['keyResultTitle']}</Form.Control.Feedback>
          <ResultType />
          <Form.Control.Feedback type="invalid">{errors['resultType']}</Form.Control.Feedback>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="description"
            isInvalid={touched['description'] && !!errors['description']}
            type="text"
            placeholder="Owner of the workstation"
            value={values['description']}
          />
          <Form.Control.Feedback type="invalid">{errors['description']}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Create key Result</Button>
      </form>
    );
  };
  const submitKeyResult = (values: ICreateWorkstation, actions: any) => {
    console.log('submitWorlstation', values, actions);
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Formik validationSchema={formSchema} onSubmit={submitKeyResult} initialValues={initialValues}>
            {(formik) => renderForms(formik)}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

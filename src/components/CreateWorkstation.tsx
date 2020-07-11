import React from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {Formik, FormikProps} from 'formik';
import {object, string} from 'yup';
import {useMutation} from 'react-query';
import {addWorkstation} from '../api/workstation';

interface ICreateWorkstation {
    name : string;
    purpose : string;
    owner : string;
}

const formSchema = object({
    name: string().required('Name is a required field'),
    purpose: string().required('Purpose is a required field'),
    owner: string().required('Owner is a required field')
});

const initialValues : ICreateWorkstation = {
    name: '',
    purpose: '',
    owner: ''
};

export function CreateWorkstation() {
    const [submitWorkstation] = useMutation(addWorkstation, {});
    const renderForms = (formikProps : FormikProps < ICreateWorkstation >) => {
        const {touched, errors, handleSubmit, handleChange, values} = formikProps;
        return (
            <form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="name"
                        isInvalid={touched['name'] && !!errors['name']}
                        type="text"
                        placeholder="Workstream name"
                        value={values['name']}/>
                    <Form.Control.Feedback type="invalid">{errors['name']}</Form.Control.Feedback>
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="purpose"
                        isInvalid={touched['purpose'] && !!errors['purpose']}
                        placeholder="Purpose of the workstream"
                        value={values['purpose']}/>
                    <Form.Control.Feedback type="invalid">{errors['purpose']}</Form.Control.Feedback>
                    <Form.Label>Owner</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="owner"
                        isInvalid={touched['owner'] && !!errors['owner']}
                        type="text"
                        placeholder="Owner of the workstation"
                        value={values['owner']}/>
                    <Form.Control.Feedback type="invalid">{errors['owner']}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Create Workstation</Button>
            </form>
        );
    };
    const submitWorkStation = (values : ICreateWorkstation, actions : any) => {
        console.log('submitWorlstation', values, actions);
        submitWorkstation({
            // id: Math.random() * 100,
            name: values.name
        });
    };
    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Formik
                        validationSchema={formSchema}
                        onSubmit={submitWorkStation}
                        initialValues={initialValues}>
                        {formik => renderForms(formik)}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

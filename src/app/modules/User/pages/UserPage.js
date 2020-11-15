import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import * as Yup from "yup";
import { toast } from 'react-toastify';

import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import { Card, CardBody } from "../../../../_metronic/_partials/controls";
import * as actions from '../_redux/userActions';


const UserSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("First Name Name is required"),
    lastname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Last Name Name is required"),
    email: Yup.string()
        .email()
        .required("email is required"),
});


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export const UserPage = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const cancelClickHandler = () => { history.push('/dashbaord', { from: "/user" }); }

    const { actionsLoading, userCreated } = useSelector(
        (state) => ({ actionsLoading: state.user.actionsLoading, userCreated: state.user.userCreated }),
        shallowEqual
    );

    const notify = () => {
        if (userCreated) {
            toast.success("User saved", {
                //onClose: () => { props.history.replace('/dashboard'); },
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        if(userCreated){
            notify();
        }
    });

    const dispatch = useDispatch();
    const saveUser = (user) => {
        dispatch(actions.createUser(user));
    };

    return (<>
        <Formik
            initialValues={{}}
            validationSchema={UserSchema}
            onSubmit={(values) => {
                const user = {
                    ...values,
                }
                saveUser(user);
            }}
        >
            {({ handleSubmit, handleBlur, touched, errors, values, handleChange, setFieldValue, setFieldTouched }) => {
                return (
                    <>
                        <StaticSubHeader
                            title="New User"
                            saveBtn="Save"
                            saveBtnClickHandler={handleSubmit}
                            loading={actionsLoading}
                            cancelBtn="Cancel"
                            cancelBtnClickHandler={cancelClickHandler}
                        />
                        <Card>
                            <CardBody>
                                <Form className={classes.root}>
                                    <TextField
                                        id="firstname"
                                        label="First Name"
                                        name="firstname"
                                        style={{ margin: 8 }}
                                        placeholder="Type the first name"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.firstname && touched.firstname) && errors.firstname}
                                        error={errors.firstname && touched.firstname}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        style={{ margin: 8 }}
                                        placeholder="Type the last name"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.lastname && touched.lastname) && errors.lastname}
                                        error={errors.lastname && touched.lastname}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        name="email"
                                        style={{ margin: 8 }}
                                        placeholder="Type the email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.email && touched.email) && errors.email}
                                        error={errors.email && touched.email}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Form>
                            </CardBody>
                        </Card>
                    </>
                );
            }
            }
        </Formik>
    </>);
};

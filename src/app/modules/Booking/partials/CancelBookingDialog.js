import React  from "react";
import { Modal, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import * as actions from "../_redux/bookingActions";


const CancelBookingSchema = Yup.object().shape({
    note: Yup.string()
        .required("Activity Name is required"),
});

export const CancelBookingDialog = (props) => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(
        (state) => ({ isLoading: state.booking.actionsLoading }),
        shallowEqual
    );

    const cancelBooking = (id, activityId, note) => {
        // server request for deleting remark by id
        dispatch(actions.updateBooking(id, 'CANCELLED', note)).then(() => {
            // refresh list after update
            dispatch(
                actions.fetchBookings({ activity: activityId, status: 'BOOKED' })
            );
            // closing modal
            props.setShowCancelBookingDialog(false);
        });
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{note:''}}
            validationSchema={CancelBookingSchema}
            onSubmit={(values,resetForm) => {
                cancelBooking(props.id, props.activityId, values.note);
                resetForm({values:''});
            }}
        >
            {({ handleSubmit, handleBlur, touched, errors }) => {

                const getInputClasses = (fieldname) => {
                    if (touched[fieldname] && errors[fieldname]) {
                        return "is-invalid";
                    }
                    if (touched[fieldname] && !errors[fieldname]) {
                        return "is-valid";
                    }
                    return "";
                };

                return (
                    <Modal
                        show={props.showCancelBookingDialog}
                        onHide={null}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        {/* {isLoading && <ModalProgressBar variant="query" />} */}
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Cancel Booking
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="form form-label-right">
                                <Field>
                                    {({ field, form, meta }) =>
                                        <FormGroup controlId="note">
                                            <FormLabel >Please add a note why you are cancelling this booking</FormLabel>
                                            <FormControl className={getInputClasses("note")} as="textarea" rows="6" placeholder="Note" onChange={field.onChange} onBlur={handleBlur} />
                                        </FormGroup>
                                    }
                                </Field>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <button
                                    type="reset"
                                    onClick={() => props.setShowCancelBookingDialog(false)}
                                    className="btn btn-light btn-elevate"
                                >
                                    Back
                            </button>
                                <> </>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-danger font-weight-bolder font-size-sm"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cancelling...' : 'Confirm Cancelling'}
                                </button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                );
            }
            }
        </Formik>
    );
}

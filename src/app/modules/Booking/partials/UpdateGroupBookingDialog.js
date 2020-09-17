import React from 'react';
import { useDispatch , useSelector,  shallowEqual} from "react-redux";
import { Modal } from 'react-bootstrap';

import * as actions from "../_redux/bookingActions";


export const UpdateGroupBookingDialog = (props) => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(
        (state) => ({ isLoading: state.booking.actionsLoading }),
        shallowEqual
    );

    const updateBookings = (ids, activityId) => {
        // server request for deleting remark by id
        dispatch(actions.updateBookings(ids, 'BOOKED',activityId)).then(() => {
            // refresh list after update
            dispatch(
                actions.fetchBookings({ activity: activityId, status: 'PENDING' })
            );
            // closing modal
            props.setShowUpdateGroupBookingDialog(false);
        });
    };

    return (
    <Modal
        show={props.showUpdateGroupBookingDialog}
        onHide={null}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        {/* {isLoading && <ModalProgressBar variant="query" />} */}
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Update Booking Status
    </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {(
                <span>Are you sure to confirm this booking?</span>
            )}
            {/* {isLoading && <span>Booking is updating...</span>} */}
        </Modal.Body>
        <Modal.Footer>
            <div>
                <button
                    type="button"
                    onClick={() => props.setShowUpdateGroupBookingDialog(false)}
                    className="btn btn-light btn-elevate"
                >
                    Cancel
                </button>
                <> </>
                <button
                    type="button"
                    onClick={() => updateBookings(props.ids,props.activityId)}
                    className="btn btn-primary btn-elevate"
                // disabled={isLoading}
                >
                    {isLoading ? 'Confirming...' : 'Confirm All'}
                    {/* Confirm All */}
                </button>
            </div>
        </Modal.Footer>
    </Modal>
    );

}
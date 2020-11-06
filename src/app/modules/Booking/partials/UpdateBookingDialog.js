import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch , useSelector,  shallowEqual} from "react-redux";
//import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../_redux/bookingActions";


export const UpdateBookingDialog = (props) => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(
        (state) => ({ isLoading: state.booking.actionsLoading }),
        shallowEqual
    );

    const updateBooking = (id, activityId) => {
        // server request for deleting remark by id
        dispatch(actions.updateBooking(id, 'BOOKED')).then(() => {
            // refresh list after update
            dispatch(
                actions.fetchBookings({ activity: activityId, status: 'PENDING' })
            );
            // closing modal
            props.setShowUpdateBookingDialog(false);
        });
    };

    return (
        <Modal
            show={props.showUpdateBookingDialog}
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
                        onClick={() => props.setShowUpdateBookingDialog(false)}
                        className="btn btn-light btn-elevate"
                    >
                        Cancel
                    </button>
                    <> </>
                    <button
                        type="button"
                        onClick={() => updateBooking(props.id,props.activityId)}
                        className="btn btn-primary btn-elevate"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Confirming...' : 'Confirm'}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

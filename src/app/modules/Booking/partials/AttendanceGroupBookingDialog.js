import React from 'react';
import { Modal } from 'react-bootstrap';
import Moment from 'moment';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';


export const AttendanceGroupBookingDialog = (props) => {

    return (
        <>
            <Modal
                show={props.showAttendanceGroupBookingDialog}
                onHide={null}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                {/* {isLoading && <ModalProgressBar variant="query" />} */}
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Attendance
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="exampleForm.ControlSelect1">
                        <FormLabel>Select the attendance status for {Moment().format('DD/MM/yyyy')}</FormLabel>
                        <FormControl as="select">
                            <option>Absent</option>
                            <option>Late</option>
                            <option>Left early</option>
                            <option>Present</option>
                        </FormControl>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button
                            type="button"
                            onClick={() => props.setShowAttendanceGroupBookingDialog(false)}
                            className="btn btn-light btn-elevate"
                        >
                            Cancel
                        </button>
                        <> </>
                        <button
                            type="button"
                            onClick={null}
                            className="btn btn-primary btn-elevate"
                        //disabled={isLoading}
                        >
                            Save
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );

}
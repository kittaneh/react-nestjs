import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormGroup, FormLabel, Col, Row } from 'react-bootstrap';
import { FormControlLabel, Switch } from "@material-ui/core";

import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import * as actions from "../_redux/activity/activitiesActions";


export const ActivityView = ({ activityId }) => {

    const dispatch = useDispatch();
    const { activity , pub , actionsLoading } = useSelector(
        (state) => ({
            actionsLoading: state.activities.actionsLoading,
            pub: state.activities.published,
            activity: state.activities.activity,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(actions.fetchActivity(activityId));
    }, [activityId, dispatch]);

    const tags = ['success', 'primary'];

    const handleChange = (id) => event => {
        dispatch(actions.updateActivity(id,{isPublished:event.target.checked}));
    };


    return (
        <>
            {activity === null ? <Spinner /> :
                <form className="form form-label-right">
                    <FormGroup as={Row} controlId="activityName">
                        <FormLabel column sm={2}>Name</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={6}>
                            <p>{activity[0].activity_name}</p>
                        </Col>
                        <Col sm={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={pub}
                                        onChange={handleChange(activity[0].id)}
                                        value="published"
                                        color="primary"
                                    />
                                }
                                disabled={actionsLoading}
                                label={actionsLoading ? 'Loading...' :'Publish'}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityCategories">
                        <FormLabel column sm={2}>Categories</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            {activity[0].categories.split(',').map((cat, index) => {
                                return (<span key={cat} className={`label label-lg label-light-${tags[index]} label-inline mr-2"`}>{cat}</span>)
                            })}
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityType">
                        <FormLabel column sm={2}>Type</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_type_name}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityDesc">
                        <FormLabel column sm={2}>Description</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_desc}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityAgeRange">
                        <FormLabel column sm={2}>Age Range</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].age_range}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityCapacity">
                        <FormLabel column sm={2}>Capacity</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_capacity}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityLocation">
                        <FormLabel column sm={2}>Location</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_location}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityDays">
                        <FormLabel column sm={2}>Days</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].days}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityStartTime">
                        <FormLabel column sm={2}>Start Time</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_start_time.slice(0, -3)}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} controlId="activityEndTime">
                        <FormLabel column sm={2}>End Time</FormLabel>
                        <Col style={{ marginTop: "1%" }} sm={10}>
                            <p>{activity[0].activity_end_time.slice(0, -3)}</p>
                        </Col>
                    </FormGroup>
                </form>
            }
        </>
    );
}
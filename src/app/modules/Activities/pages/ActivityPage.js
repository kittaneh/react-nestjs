import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Typeahead } from 'react-bootstrap-typeahead';
import { FormGroup, FormLabel, FormCheck, FormControl, Col, Row, InputGroup } from 'react-bootstrap';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import * as Yup from "yup";

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-tabs/style/react-tabs.css';
import 'rc-slider/assets/index.css';
import '../css/ActivityPage.css';


import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import { Card, CardBody } from "../../../../_metronic/_partials/controls";
import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import { ActivityCoverPhoto } from '../partials/ActivityCoverPhoto';
import * as typeActions from '../_redux/type/typesActions';
import * as activitiesActions from '../_redux/activity/activitiesActions';


const ActivitySchema = Yup.object().shape({
    activityName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Activity Name is required"),
    location: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(256, "Maximum 256 symbols")
        .required("Location is required"),
    activityPrice: Yup.number()
        .moreThan(-1, "Price should be positive"),
    activityCapacity: Yup.number()
        .moreThan(-1, "Capacity should be positive"),
    category: Yup.string()
        .required("Category is required"),
    startDate: Yup.date(),
    endDate: Yup.date(),
    startTime: Yup.date(),
    endTime: Yup.date()
});


export const ActivityPage = (props) => {

    const [coverPhoto, setCoverPhoto] = useState(toAbsoluteUrl("/media/products/trolls.jpg"));
    const [multiSelections, setMultiSelections] = useState([]);
    const [ageRange, setAgeRange] = useState([4, 10]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(Moment().add(10, 'days').toDate());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(Moment().add(45, 'minutes').toDate());

    const { currentState } = useSelector(
        (state) => ({ currentState: state.types }),
        shallowEqual
    );
    const { entities } = currentState;
    const types = entities === null ? [] : entities;

    const { actionsLoading , activityCreated } = useSelector(
        (state) => ({ actionsLoading: state.activities.actionsLoading , activityCreated: state.activities.activityCreated }),
        shallowEqual
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(typeActions.fetchTypes());
    }, [dispatch]);

    useEffect(() => {
        if(activityCreated){
            notify();
        }
    });


    const saveActivity = (activity) => {
        dispatch(activitiesActions.createActivity(activity));
    };

    const Slider = require('rc-slider');
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const marks = {
        1: <strong>1</strong>,
        18: <strong>18</strong>
    };

    const notify = () => {
        if (activityCreated) {
            toast.success("Activity saved", {
                onClose: () => { props.history.replace('/activities'); },
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

    const preview = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const cancelClickHandler = () => { props.history.replace('/activities'); }

    return (
        <>
            <Formik
                initialValues={{}}
                validationSchema={ActivitySchema}
                onSubmit={(values) => {
                    const imgData = coverPhoto.replace('data:', '').split(";")[1];
                    const imgMimeType = coverPhoto.replace('data:', '').split(";")[0];
                    setTimeout(() => {
                        const activity = {
                            ...values,
                            days: values.day.join("-"),
                            category: multiSelections.map(sel => sel.id),
                            ageRange: ageRange.join("-"),
                            startDate: startDate,
                            endDate: endDate,
                            startTime: Moment().utc(startTime).format('HH:mm:ss'),
                            endTime: Moment().utc(endTime).format('HH:mm:ss'),
                            image: imgData,
                            mime: imgMimeType,
                            organiser: 1
                        }
                        saveActivity(activity);
                    }, 1000);
                }}
            >
                {({ handleSubmit, handleBlur, touched, errors, setFieldValue, setFieldTouched }) => {

                    const getInputClasses = (fieldname) => {
                        if (touched[fieldname] && errors[fieldname]) {
                            return "is-invalid";
                        }
                        if (touched[fieldname] && !errors[fieldname]) {
                            return "is-valid";
                        }
                        return "";
                    };

                    const errorDiv = (msg) => (<div className="fv-plugins-message-container">
                        <div className="fv-help-block">{msg}</div>
                    </div>);

                    return (
                        <>
                            <StaticSubHeader
                                title="Add/Edit Activity"
                                saveBtn="Save"
                                saveBtnClickHandler={handleSubmit}
                                loading={actionsLoading}
                                cancelBtn="Cancel"
                                cancelBtnClickHandler={cancelClickHandler}
                            />
                                <Card>
                                    <CardBody>
                                            <Form className="form form-label-right">
                                                <div className="form-group row">
                                                    <ActivityCoverPhoto
                                                        coverPhoto={coverPhoto}
                                                        preview={preview}
                                                    />
                                                </div>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="activityType">
                                                            <FormLabel column sm={2}>Type</FormLabel>
                                                            <Col style={{ marginTop: "1%" }} sm={10}>
                                                                {types.map(type => (
                                                                    <FormCheck
                                                                        inline
                                                                        key={type.id}
                                                                        type="radio"
                                                                        value={type.id}
                                                                        label={type.activityTypeName}
                                                                        onChange={field.onChange}
                                                                        name="activityType"
                                                                        id="activityType"
                                                                    // checked={type.id===1}
                                                                    />
                                                                ))}
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="activityName">
                                                            <FormLabel column sm={2}>Name</FormLabel>
                                                            <Col sm={10}>
                                                                <FormControl className={getInputClasses("activityName")} type="text" placeholder="Name" onChange={field.onChange} onBlur={handleBlur} />
                                                                <ErrorMessage name="activityName" render={(msg) => errorDiv(msg)} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="activityDesc">
                                                            <FormLabel column sm={2}>Description</FormLabel>
                                                            <Col sm={10}>
                                                                <FormControl className={getInputClasses("activityDesc")} as="textarea" rows="6" placeholder="Description" onChange={field.onChange} onBlur={handleBlur} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="category">
                                                            <FormLabel column sm={2}>Category</FormLabel>
                                                            <Col sm={10}>
                                                                <Typeahead
                                                                    id="category"
                                                                    labelKey="name"
                                                                    //multiple
                                                                    onChange={(selected) => {
                                                                        setFieldValue('category', selected);
                                                                        setMultiSelections(selected);
                                                                    }}
                                                                    onBlur={(e) => setFieldTouched('category', true)}
                                                                    options={[{ id: 10, name: 'Outdoor' }, { id: 11, name: 'Indoor' }]}
                                                                    placeholder="Category"
                                                                    selected={multiSelections}
                                                                    isInvalid={getInputClasses("category") === 'is-invalid'}
                                                                    isValid={getInputClasses("category") === 'is-valid'}
                                                                />
                                                                <ErrorMessage name="category" render={(msg) => errorDiv(msg)} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="activityPrice">
                                                            <FormLabel column sm={2}>Price</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-money-check-alt"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl type="text" className={getInputClasses("activityPrice")} placeholder="Price" onChange={field.onChange} onBlur={handleBlur} />
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text id="inputGroupAppend">NIS</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                                <ErrorMessage name="activityPrice" render={(msg) => errorDiv(msg)} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="ageRange">
                                                            <FormLabel column sm={2}>Age Range</FormLabel>
                                                            <Col style={{ marginTop: "1%" }} sm={10}>
                                                                <Range
                                                                    dots
                                                                    min={1}
                                                                    max={18}
                                                                    allowCross={false}
                                                                    marks={marks}
                                                                    onChange={setAgeRange}
                                                                    value={ageRange}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="activityCapacity">
                                                            <FormLabel column sm={2}>Capacity</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl type="text" className={getInputClasses("activityCapacity")} placeholder="Capacity" onChange={field.onChange} onBlur={handleBlur} />
                                                                </InputGroup>
                                                                <ErrorMessage name="activityCapacity" render={(msg) => errorDiv(msg)} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="location">
                                                            <FormLabel column sm={2}>Location</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-map-marker"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl className={getInputClasses("location")} type="text" placeholder="Location" onChange={field.onChange} onBlur={handleBlur} />
                                                                </InputGroup>
                                                                <ErrorMessage name="location" render={(msg) => errorDiv(msg)} />
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="startDate">
                                                            <FormLabel column sm={2}>Start Date</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-hourglass-start"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <DatePicker
                                                                        wrapperClassName="w-94"
                                                                        selected={startDate}
                                                                        selectsStart
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        onChange={date => setStartDate(date)}
                                                                        customInput={<FormControl className={getInputClasses("endTime")} onBlur={handleBlur} type="text" placeholder="Start Date" />}
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="endDate">
                                                            <FormLabel column sm={2}>End Date</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-hourglass-end"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <DatePicker
                                                                        wrapperClassName="w-94"
                                                                        selected={endDate}
                                                                        selectsEnd
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        minDate={startDate}
                                                                        onChange={date => setEndDate(date)}
                                                                        customInput={<FormControl className={getInputClasses("endTime")} onBlur={handleBlur} type="text" placeholder="End Date" />}
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="startTime">
                                                            <FormLabel column sm={2}>Start Time</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <DatePicker
                                                                        wrapperClassName="w-94"
                                                                        selected={startTime}
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Time"
                                                                        dateFormat="h:mm aa"
                                                                        onChange={date => setStartTime(date)}
                                                                        customInput={<FormControl className={getInputClasses("endTime")} onBlur={handleBlur} type="text" placeholder="Start Time" />}
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="endTime">
                                                            <FormLabel column sm={2}>End Time</FormLabel>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                                    </InputGroup.Prepend>
                                                                    <DatePicker
                                                                        wrapperClassName="w-94"
                                                                        selected={endTime}
                                                                        onChange={date => setEndTime(date)}
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={15}
                                                                        timeCaption="Time"
                                                                        dateFormat="h:mm aa"
                                                                        customInput={<FormControl className={getInputClasses("endTime")} onBlur={handleBlur} type="text" placeholder="End Time" />}
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                                <Field>
                                                    {({ field, form, meta }) =>
                                                        <FormGroup as={Row} controlId="days">
                                                            <FormLabel column sm={2}>Days</FormLabel>
                                                            <Col style={{ marginTop: "1%" }} sm={10}>
                                                                {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                                                    <FormCheck
                                                                        inline
                                                                        key={day}
                                                                        type="checkbox"
                                                                        label={day}
                                                                        name="day"
                                                                        id="day"
                                                                        value={day}
                                                                        onChange={field.onChange}
                                                                    // checked
                                                                    />
                                                                ))}
                                                            </Col>
                                                        </FormGroup>
                                                    }
                                                </Field>
                                            </Form>
                                    </CardBody>
                                </Card>
                        </>
                    );
                }
                }
            </Formik>

        </>
    );
}

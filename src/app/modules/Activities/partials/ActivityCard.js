import React from 'react';
import SVG from "react-inlinesvg";

import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import classes from '../css/ActivityCard.module.css';

const activityCard = (props) => {

    let progressBarclassNamees = ['progress-bar'];

    if (props.percentage >= 0.50) {
        progressBarclassNamees.push('kt-bg-success');
    } else if (props.percentage < 0.50) {
        progressBarclassNamees.push('kt-bg-warning');
    }

    const tags = ['success', 'primary'];

    return (
        <div className="card card-custom gutter-b">
            <div className="card-body">
                <div className="d-flex">
                    {/* <!--begin: Pic--> */}
                    <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
                        <div className="symbol symbol-50 symbol-lg-120">
                            <img alt="Pic"
                                className={classes.Image}
                                src={`https://bj-images.s3.amazonaws.com/activity/${props.activityImage}`}
                            />
                        </div>
                        {/* <div className="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
                            <span className="font-size-h3 symbol-label font-weight-boldest">JM</span>
                        </div> */}
                    </div>
                    {/* <!--end: Pic-->
                <!--begin: Info--> */}
                    <div className="flex-grow-1">
                        {/* <!--begin: Title--> */}
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="mr-3">
                                {/* <!--begin::Name--> */}
                                <a href="/#" className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3">{props.activityName}
                                </a>
                                {/* <!--end::Name--> *
                                {/* <!--begin::Contacts--> */}
                                <div className="">
                                    {props.categories.split(',').map((cat, index) => {
                                        return (<span key={cat} className={`label label-lg label-light-${tags[index]} label-inline mr-2"`}>{cat}</span>)
                                    })}
                                </div>
                                <div className="d-flex flex-wrap my-2">
                                    <a href="#t" className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                                        <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                                            {/* <!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Map/Marker2.svg--> */}
                                            <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Marker2.svg")} />
                                            {/* <!--end::Svg Icon--> */}
                                        </span>{props.address}</a>
                                    <a href="#t" className="text-muted text-hover-primary font-weight-bold">
                                        <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                                            {/* <!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Communication/Mail-notification.svg--> */}
                                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Notification2.svg")} />
                                            {/* <!--end::Svg Icon--> */}
                                </span>{props.days} ,{props.startTime} - {props.endTime}</a>
                                </div>
                                {/* <!--end::Contacts--> */}
                            </div>
                            <div className="my-lg-0 my-1">
                                {/* <a href="/#" className="btn btn-sm btn-light-success font-weight-bolder text-uppercase mr-3">Reports</a>
                                <a href="/#" className="btn btn-sm btn-info font-weight-bolder text-uppercase">New Task</a> */}
                                <span className="font-weight-bold">NIS {props.price}</span>
                            </div>
                        </div>
                        {/* <!--end: Title--> */}
                        {/* <!--begin: Content--> */}
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <div className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5">
                                <p>{props.desc}</p><br />
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <div className="d-flex flex-wrap align-items-center py-2">
                                <div className="flex-grow-1 flex-shrink-0 w-150px w-xl-300px mt-4 mt-sm-0">
                                    <span className="font-weight-bold">Progress</span>
                                    <div className="progress progress-xs mt-2 mb-2">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "63%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span className="font-weight-bolder text-dark">78%</span>
                                </div>
                            </div>
                        </div>
                        {/* <!--end: Content--> */}
                    </div>
                    {/* <!--end: Info--> */}
                </div>
                <div className="separator separator-solid my-7"></div>
                {/* <!--begin: Items--> */}
                <div className="d-flex align-items-center flex-wrap">
                    {/* <!--begin: Item--> */}
                    <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
                        <span className="mr-4">
                            <i className="flaticon-cart icon-2x text-muted font-weight-bold"></i>
                        </span>
                        <div className="d-flex flex-column text-dark-75">
                            <span className="font-weight-bolder font-size-sm">Earnings</span>
                            <span className="font-weight-bolder font-size-h5">
                                <span className="text-dark-50 font-weight-bold">NIS</span>570</span>
                        </div>
                    </div>
                    {/* <!--end: Item--> */}
                    {/* <!--begin: Item--> */}
                    <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
                        <span className="mr-4">
                            <i className="flaticon-file-2 icon-2x text-muted font-weight-bold"></i>
                        </span>
                        <div className="d-flex flex-column flex-lg-fill">
                            <span className="text-dark-75 font-weight-bolder font-size-sm">73 Pending Skills</span>
                            <a href="/#" className="text-primary font-weight-bolder">View</a>
                        </div>
                    </div>
                    {/* <!--end: Item--> */}
                    {/* <!--begin: Item--> */}
                    <div className="d-flex align-items-center flex-lg-fill my-1">
                        {/* <span className="mr-4">
                            <i className="flaticon-network icon-2x text-muted font-weight-bold"></i>
                        </span> */}
                        <div className="symbol-group symbol-hover">
                            <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Mark Stone">
                                <img alt="Pic" src={toAbsoluteUrl("/media/users/superheroBoy.png")} />
                            </div>
                            <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Charlie Stone">
                                <img alt="Pic" src={toAbsoluteUrl("/media/users/superheroBoy2.png")} />
                            </div>
                            <div className="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Luca Doncic">
                                <img alt="Pic" src={toAbsoluteUrl("/media/users/superheroGirl.png")} />
                            </div>
                            <div className="symbol symbol-30 symbol-circle symbol-light">
                                <span className="symbol-label font-weight-bold">5+</span>
                            </div>
                        </div>
                    </div>
                    {/* <!--end: Item--> */}
                </div>
                {/* <!--begin: Items--> */}
            </div>
        </div>
    );
}

export default activityCard;
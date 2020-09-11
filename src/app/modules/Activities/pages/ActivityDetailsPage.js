/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */

import React, { useState } from 'react';
//import SVG from "react-inlinesvg";

//import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import { Card, CardHeader, CardBody } from "../../../../_metronic/_partials/controls";
import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import { BookingTable } from '../../Booking/partials/BookingTable'


export const ActivityDetailsPage = (props) => {

    const [tab, setTab] = useState("requested");

    console.log(props);

    return (
        <>
            <StaticSubHeader
                title="Activity Info"
            />
            <Card>
                <CardHeader>
                    <ul className="nav nav-tabs nav-tabs-line nav-tabs-bold" style={{ marginTop: '3%' }} role="tablist">
                        <li className="nav-item" onClick={() => setTab("basic")}>
                            <a
                                className={`nav-link ${tab === "basic" && "active"}`}
                                data-toggle="tab"
                                role="tab"
                                aria-selected={(tab === "basic").toString()}
                            >
                                <span className="font-weight-bold">Basic info</span>
                            </a>
                        </li>
                        {(
                            <>
                                {" "}
                                <li className="nav-item" onClick={() => setTab("requested")}>
                                    <a
                                        className={`nav-link ${tab === "requested" && "active"}`}
                                        data-toggle="tab"
                                        role="button"
                                        aria-selected={(tab === "requested").toString()}
                                    >
                                        <span className="font-weight-bold">Requested</span>
                                    </a>
                                </li>
                                <li className="nav-item" onClick={() => setTab("booked")}>
                                    <a
                                        className={`nav-link ${tab === "booked" && "active"}`}
                                        data-toggle="tab"
                                        role="tab"
                                        aria-selected={(tab === "specs").toString()}
                                    >
                                        {/* <span className="svg-icon svg-icon-md svg-icon-500 mr-1">
                                            <SVG src={toAbsoluteUrl("/media/svg/icons/others/requested.svg")} />
                                            </span> */}
                                        <span className="font-weight-bold">Booked</span>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </CardHeader>
                <CardBody>
                    {tab === "basic" && (
                        <div>Hello basic</div>
                    )}
                    {tab === "requested" && (
                        <BookingTable
                            activityId={props.match.params.id}
                            status={'PENDING'}
                        />
                    )}
                    {tab === "booked" && (
                        <div>Hello booked</div>
                    )}
                </CardBody>


            </Card>
        </>
    );
} 
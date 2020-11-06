/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useMemo } from 'react';
import SVG from "react-inlinesvg";

import { AddSkillsDialog } from './AddSkillsDialog';
import { useSkillsUIContext } from "../context//SkillsUIContext";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export const SkillsList = (props) => {

    const skillsUIContext = useSkillsUIContext();
    const skillsUIProps = useMemo(() => {
        return {
            ids: skillsUIContext.ids,
            setIds: skillsUIContext.setIds,
            showAddSkillsDialog: skillsUIContext.showAddSkillsDialog,
            setShowAddSkillsDialog: skillsUIContext.setShowAddSkillsDialog,
        };
    }, [skillsUIContext]);

    const openAddSkillsDialog = (id) => {
        //skillsUIProps.setSelectedId(id);
        skillsUIProps.setShowAddSkillsDialog(true);
    }

    return (
        <>
            <AddSkillsDialog
                activityId={props.activityId}
            />
            <div className="card-spacer">
                <div className="row m-0">
                    <div className="col shadow-sm bg-light-success px-4 py-8 rounded-xl mr-7 mb-7">
                        <span className="svg-icon svg-icon-success svg-icon-3x  d-block my-2">
                            <SVG
                                src={toAbsoluteUrl("/media/svg/icons/Code/Plus.svg")}
                            ></SVG>
                        </span>
                        <a
                            href="#"
                            onClick={openAddSkillsDialog}
                            className="text-success font-weight-bold font-size-h6"
                        >
                            Add Skill
                        </a>
                        <br />
                        {/* <span className="text-muted font-weight-bold mt-2">
                        The analysis of facts to form a judgment.
                    </span> */}
                    </div>
                    <div className="col shadow-sm px-4 py-8 rounded-xl mr-7 mb-7">
                        <span className="svg-icon svg-icon-primary svg-icon-3x  d-block my-2">
                            <SVG
                                src={toAbsoluteUrl("/media/svg/icons/Communication/Add-user.svg")}
                            ></SVG>
                        </span>
                        <a
                            href="#"
                            className="font-weight-bold font-size-h6"
                        >
                            Critical Thinking
                        </a>
                        <br />
                        <span className="text-muted font-weight-bold mt-2">
                            The analysis of facts to form a judgment.
                    </span>
                    </div>
                    <div className="col shadow-sm  px-4 py-8 rounded-xl mb-7">
                        <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                            <SVG
                                src={toAbsoluteUrl(
                                    "/media/svg/icons/Home/Ladder.svg"
                                )}
                            ></SVG>
                        </span>
                        <a
                            href="#"
                            className="text-primary font-weight-bold font-size-h6 mt-2"
                        >
                            Problem Solving
                        </a>
                        <br />
                        <span className="text-muted font-weight-bold mt-2">
                            The ability to solve problems in an effective and timely manner without any impediments.
                        </span>
                    </div>
                </div>
                {/* <div className="row m-0">
                <div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
                    <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                        <SVG
                            src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                        ></SVG>
                    </span>
                    <a
                        href="#"
                        className="text-danger font-weight-bold font-size-h6 mt-2"
                    >
                        Reviewed
              </a>
                    <br />
                    <span className="text-muted font-weight-bold mt-2">
                        2 activities
            </span>
                </div>
                <div className="col bg-light-success px-6 py-8 rounded-xl">
                    <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                        <SVG
                            src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Urgent-mail.svg"
                            )}
                        ></SVG>
                    </span>
                    <a
                        href="#"
                        className="text-success font-weight-bold font-size-h6 mt-2"
                    >
                        Requested
              </a>
                    <br />
                    <span className="text-muted font-weight-bold mt-2">
                        44 activities
            </span>
                </div>
            </div>
        */}
            </div>


        </>
    );

}
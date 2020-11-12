import React, { useMemo, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";

import * as actions from "../_redux/skillsActions";
import { getSelectRow } from "../../../../_metronic/_helpers";
import { useSkillsUIContext } from "../context//SkillsUIContext";
import * as columnFormatters from "./column-formatters";

export const AddSkillsDialog = (props) => {

    const skillsUIContext = useSkillsUIContext();
    const skillsUIProps = useMemo(() => {
        return {
            ids: skillsUIContext.ids,
            setIds: skillsUIContext.setIds,
            showAddSkillsDialog: skillsUIContext.showAddSkillsDialog,
            setShowAddSkillsDialog: skillsUIContext.setShowAddSkillsDialog,
        };
    }, [skillsUIContext]);

    const { currentState } = useSelector(
        (state) => ({ currentState: state.skills }),
        shallowEqual
    );
    const { unMappedSkills, actionsLoading } = currentState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUnMappedSkills({params:{activity:props.activityId}}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleSubmit = (ids, activityId) => {
        //server request for deleting remark by id
        dispatch(actions.addSkills({activity: activityId, skill_ids: ids})).then(() => {
            // refresh list after update
           // dispatch(actions.fetchSkills({}));
            // closing modal
            skillsUIProps.setShowAddSkillsDialog(false);
        });
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            hidden: true,
        },
        {
            dataField: "skill_desc",
            text: "Skill Desc",
            hidden: true,
        },
        {
            dataField: "skill_name",
            text: "Skill Name",
            formatter: columnFormatters.SkillNameColumnFormatter,
        }
    ];

    return (
        <>
            <Modal
                show={skillsUIProps.showAddSkillsDialog}
                onHide={null}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Skills
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BootstrapTable
                        wrapperClasses="table-responsive"
                        classes="table table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        bordered={false}
                        remote
                        keyField="id"
                        data={unMappedSkills}
                        columns={columns}
                        noDataIndication={() => <div className="text-center">No data</div>}
                        selectRow={getSelectRow({
                            entities:unMappedSkills,
                            ids: skillsUIProps.ids,
                            setIds: skillsUIProps.setIds,
                        })}
                    >
                    </BootstrapTable>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button
                            type="reset"
                            onClick={() => skillsUIProps.setShowAddSkillsDialog(false)}
                            className="btn btn-light btn-elevate"
                        >
                            Back
                            </button>
                        <> </>
                        <button
                            //type="submit"
                            onClick={ () => {handleSubmit(skillsUIProps.ids, props.activityId)}}
                            className="btn btn-primary font-weight-bolder font-size-sm"
                            disabled={actionsLoading}
                        >
                            Add
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
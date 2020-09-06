import React from 'react';

export const ActivityCoverPhoto = (props) => {

    return (
        <>
            <label className="col-xl-3 col-lg-3 col-form-label"><span className="text-right">Cover Photo</span></label>
            <div className="col-lg-9 col-xl-6">
                <div className="kt-avatar kt-avatar--outline kt-avatar--circle-"
                    id="kt_user_edit_avatar">
                    <div className="kt-avatar__holder"
                        style={{ backgroundImage: `url(${props.coverPhoto})` }}>
                    </div>
                    {/* <img src={coverPhoto} alt="cvr"/> */}
                    <label className="kt-avatar__upload"
                        data-toggle="kt-tooltip" title=""
                        data-original-title="Change Photo">
                        <i className="fa fa-pen"></i>
                        <input type="file" name="profile_avatar"
                            //ref={props.photoEl}
                            onChange={props.preview}
                            accept=".png, .jpg, .jpeg" />
                    </label>
                    <span className="kt-avatar__cancel"
                        data-toggle="kt-tooltip" title=""
                        data-original-title="Cancel avatar">
                        <i className="fa fa-times"></i>
                    </span>
                </div>
            </div>
        </>);
}
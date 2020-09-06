import React from 'react';

import ActivityCard from '../partials/ActivityCard';

const activityList = (props) => {
    return (
        <>
            {props.entities.map(activity => (
                <div key={activity.id} className="row">
                    <div className="col-xl-12">
                        <ActivityCard
                            activityName={activity.activity_name}
                            activityImage={activity.activity_image_url}
                            address={activity.activity_location}
                            price={activity.activity_price}
                            desc={activity.activity_desc}
                        />
                    </div >
                </div >
            ))}
        </>
    );
};

export default activityList;
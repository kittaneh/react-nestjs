import React from 'react';

import ActivityCard from '../partials/ActivityCard';

const activityList = (props) => {
    return (
        <>
            {props.entities.map(activity => (
                <div key={activity.id} className="row">
                    <div className="col-xl-12">
                        <ActivityCard
                            activityId={activity.id}
                            activityName={activity.activity_name}
                            activityImage={activity.activity_image_url}
                            address={activity.activity_location}
                            price={activity.activity_price}
                            desc={activity.activity_desc}
                            categories={activity.categories}
                            days={activity.days}
                            startTime={activity.activity_start_time}
                            endTime={activity.activity_end_time}
                        />
                    </div >
                </div >
            ))}
        </>
    );
};

export default activityList;
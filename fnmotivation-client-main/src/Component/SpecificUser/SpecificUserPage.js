import React from 'react';
import { SpecificUserDataProvider } from '../contexts/User/specificUserContext';
import SpecificUser from './SpecificUser';

const SpecificUserPage = ({getNotifications}) => {
    return (
        <div>

            <SpecificUserDataProvider>
                <SpecificUser getNotifications={getNotifications}/>
            </SpecificUserDataProvider>
        </div>
    );
};

export default SpecificUserPage;
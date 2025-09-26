import ContentLayout from '@/components/Layout/ContentLayout'
import HeaderLayout from '@/components/Layout/HeaderLayout'
import MainContentLayout from '@/components/Layout/MainContentLayout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Staff = () => {

    
    return (
        <ContentLayout>
            <HeaderLayout groupLabel="Staff" />
            <MainContentLayout>

                <Outlet />


            </MainContentLayout>
        </ContentLayout>
    )
}

export default Staff
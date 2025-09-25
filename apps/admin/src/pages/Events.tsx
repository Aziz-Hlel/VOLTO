

import EventMainContent from '@/components/events/EventMainContent'
import ContentLayout from '@/components/Layout/ContentLayout'
import HeaderLayout from '@/components/Layout/HeaderLayout'
import MainContentLayout from '@/components/Layout/MainContentLayout'
import { Outlet } from 'react-router-dom'

const Events = () => {
    return (
        <ContentLayout>
            <HeaderLayout groupLabel="Events" />
            <MainContentLayout>

                <Outlet />


            </MainContentLayout>
        </ContentLayout>
    )
}

export default Events
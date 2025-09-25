import { apiRoutes } from '@/Api';
import useApiQuery from '@/hooks/useApiQuery';
import type { EventResponseDto } from '@/types/events/eventResponse.dto';
import React from 'react'
import { EventsDataTable } from './EventsDataTable';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const EventMainContent = () => {

    const { data } = useApiQuery<EventResponseDto[]>({
        url: apiRoutes.events.list,
        queryParams: { page: 1, limit: 50 },
        queryKey: ['events'],
        options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
    });


    const events = data?.data




    if (!events) return <>loading ...</>


    function setEditingAdmin(admin: EventResponseDto): void {
        throw new Error('Function not implemented.');
    }

    function setDeletingAdmin(admin: EventResponseDto): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="space-y-4 lg:space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h2 className="text-xl lg:text-2xl font-bold">Events table</h2>
                </div>

                {/* <AddAdminDialog /> */}
                <Link to={"/events/create"}>
                    <Button className="flex items-center gap-2 cursor-pointer">
                        Add Event +
                    </Button>
                </Link>

            </div>

            <EventsDataTable
                data={events}
                onEdit={setEditingAdmin}
                onDelete={setDeletingAdmin}
            />

            {/* {editingAdmin && (
                <EditAdminDialog
                    admin={editingAdmin}
                    open={!!editingAdmin}
                    onOpenChange={(open) => !open && setEditingAdmin(null)}
                    onUpdateAdmin={handleUpdateAdmin}
                />
            )}

            <DeleteConfirmationDialog
                open={!!deletingAdmin}
                onOpenChange={(open) => !open && setDeletingAdmin(null)}
                onConfirm={handleDeleteAdmin}
                title="Delete Administrator"
                description={`Are you sure you want to delete ${deletingAdmin?.username}? This action cannot be undone.`}
            /> */}

        </div>
    )
}

export default EventMainContent
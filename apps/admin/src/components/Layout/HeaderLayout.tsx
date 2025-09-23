import React from 'react'

const HeaderLayout = ({ groupLabel, label }: { groupLabel: string, label?: string }) => {
    return (
        <header className="border-b bg-card px-6 py-4 sticky top-0 ">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{groupLabel}</h1>
                    <p className="text-muted-foreground">{label}</p>
                </div>
            </div>
        </header>
    )
}

export default HeaderLayout
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ResourceLanding from '../components/Resources/ResourceLanding'
import CreateResource from '../components/Resources/CreateResource'
import ExploreResources from '../components/Resources/ExploreResources'

const ResourcePage = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ResourceLanding />} />
                <Route path='/create' element={<CreateResource />} />
                <Route path='/explore' element={<ExploreResources />} />
            </Routes>
        </div>
    )
}

export default ResourcePage
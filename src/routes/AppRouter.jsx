import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Login, App } from '../pages';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';
import { ListDirectors } from '../pages/director/ListDirectors';
import { ShowDirector } from '../pages/director/ShowDirector';
import { CreateDirector, UpdateDirector } from '../pages/director';
import { ShowProfile } from '../pages/Profile/ShowProfile';
import { ShowJails } from '../pages/Jails/ShowJails';
import { ListReports } from '../pages/Report/ListReports';
import { ShowReport } from '../pages/Report/ShowReport';
import { CreateReport, UpdateReport} from '../pages/Report';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route element={<AuthTemplate />}>
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                </Route>

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                                <Route element={<DashboardTemplate/>}>
                                    <Route index path='/' element={<App />} />
                                    <Route index path='/directors' element={<ListDirectors />} />
                                    <Route index path='/directors/show/:id' element={<ShowDirector />} />
                                    <Route index path='/directors/create' element={<CreateDirector />} />
                                    <Route index path='/directors/edit/:id' element={<UpdateDirector />} />
                                    <Route index path='/profile' element={<ShowProfile />} />
                                    <Route index path = '/jails' element = {<ShowJails/>} />
                                    <Route index path = '/reports' element = {<ListReports/>} />
                                    <Route index path = '/reports/show/:id' element={<ShowReport/>} />
                                    <Route index path='/reports/create' element={<CreateReport />} />
                                    <Route index path='/reports/edit/:id' element={<UpdateReport />} />
                                </Route>
                        </Routes>

                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}

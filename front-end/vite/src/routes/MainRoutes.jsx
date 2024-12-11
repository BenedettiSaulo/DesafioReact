import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const ListUsersDefault = Loadable(lazy(() => import('views/pages/users/ListUsers')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const CreateUser = Loadable(lazy(() => import('views/pages/users/CreateUser')));
const UpdateUser = Loadable(lazy(() => import('views/pages/users/UpdateUser')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <ListUsersDefault />
        },
        {
            path: '/user/create',
            element: <CreateUser />
        },
        {
            path: '/user/update/:userId',
            element: <UpdateUser />
        },
        // {
        //   path: '/',
        //   element: <DashboardDefault />
        // },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        // {
        //   path: 'icons',
        //   children: [
        //     {
        //       path: 'tabler-icons',
        //       element: <UtilsTablerIcons />
        //     }
        //   ]
        // },
        // {
        //   path: 'icons',
        //   children: [
        //     {
        //       path: 'material-icons',
        //       element: <UtilsMaterialIcons />
        //     }
        //   ]
        // },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;

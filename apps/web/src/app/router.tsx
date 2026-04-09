import { createBrowserRouter } from 'react-router-dom'
import { GapAnalysisRoute } from './routes/gap-analysis-route'
import { DataManagementRoute } from './routes/data-management-route'
import { GuideRoute } from './routes/guide-route'
import { HomeRoute } from './routes/home-route'
import { InventoryItemEditRoute } from './routes/inventory-item-edit-route'
import { InventoryQuickAddRoute } from './routes/inventory-quick-add-route'
import { InventoryOverviewRoute } from './routes/inventory-overview-route'
import { MaintenanceRoute } from './routes/maintenance-route'
import { NeedsRoute } from './routes/needs-route'
import { ProfileRoute } from './routes/profile-route'
import { QuickHelpRoute } from './routes/quick-help-route'
import { ShoppingOverviewRoute } from './routes/shopping-overview-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/profil',
    element: <ProfileRoute />,
  },
  {
    path: '/behov',
    element: <NeedsRoute />,
  },
  {
    path: '/gap-analys',
    element: <GapAnalysisRoute />,
  },
  {
    path: '/inkopsoversikt',
    element: <ShoppingOverviewRoute />,
  },
  {
    path: '/installningar/data',
    element: <DataManagementRoute />,
  },
  {
    path: '/underhall',
    element: <MaintenanceRoute />,
  },
  {
    path: '/snabbhjalp',
    element: <QuickHelpRoute />,
  },
  {
    path: '/guider/:scenarioId',
    element: <GuideRoute />,
  },
  {
    path: '/forrad/ny',
    element: <InventoryQuickAddRoute />,
  },
  {
    path: '/forrad',
    element: <InventoryOverviewRoute />,
  },
  {
    path: '/forrad/:itemId/redigera',
    element: <InventoryItemEditRoute />,
  },
])

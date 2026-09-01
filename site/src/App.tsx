import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import { GetAppProvider } from './components/GetAppModal';
import Home from './pages/Home';
// The affiliate "Shop" page — kept in the main bundle (not lazy) so it opens
// instantly in the Instagram in-app browser, which is the traffic it serves.
import Styles from './pages/Styles';

const Explore = lazy(() => import('./pages/Explore'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const WallpaperDetail = lazy(() => import('./pages/WallpaperDetail'));
const Pro = lazy(() => import('./pages/Pro'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const DeleteData = lazy(() => import('./pages/DeleteData'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** /wallpaper/:id is the app's internal route name; keep it working as an alias. */
function WallpaperAlias() {
  const { id } = useParams();
  return <Navigate to={`/w/${id ?? ''}`} replace />;
}

export default function App() {
  return (
    <GetAppProvider>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="w/:id" element={<WallpaperDetail />} />
            <Route path="wallpaper/:id" element={<WallpaperAlias />} />
            <Route path="styles" element={<Styles />} />
            <Route path="pro" element={<Pro />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="refund" element={<Refund />} />
            <Route path="delete-data" element={<DeleteData />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </GetAppProvider>
  );
}

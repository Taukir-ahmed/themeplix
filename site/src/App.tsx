import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import { GetAppProvider } from './components/GetAppModal';
import Home from './pages/Home';

const Explore = lazy(() => import('./pages/Explore'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const WallpaperDetail = lazy(() => import('./pages/WallpaperDetail'));
const Pro = lazy(() => import('./pages/Pro'));
const Privacy = lazy(() => import('./pages/Privacy'));
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
            <Route path="pro" element={<Pro />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="delete-data" element={<DeleteData />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </GetAppProvider>
  );
}

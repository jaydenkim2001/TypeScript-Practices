import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import LoadingSpinner from "./common/components/LoadingSpinner";

//Lazy Loading
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);
const LibraryPage = React.lazy(
  () => import("./pages/MobilePlaylistPage/LibraryPage")
);

// 0. Sidebar exists constantly throughout different pages.
// 1. Home Page                 ('/')
// 2. Search Page               ('/search')
// 3. Search Result Page        ('/search/:keyword')
// 4. Playlist Detail Page      ('/playlist/:id')
// 5. (Mobile Version) Playlist Display Page    ('/playlist')

function App() {
  return (
    // <Suspense> defines a loading boundary. If anything inside that boundary is not ready yet
    // (e.g., a component loaded with React.lazy hasn’t finished downloading),
    // React will render the boundary’s fallback UI until it’s ready.
    <Suspense fallback={<LoadingSpinner fullscreen/>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          {/* <Route path='/playlist' element={<LibraryPage/>}/> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx'
import { CatProvider } from './context/CatContext.tsx'

import HomePage from './pages/web/HomePage.tsx'
import LoginPage from './pages/web/LoginPage.tsx'
import DecisionPage from './pages/web/DecisionPage.tsx'
import SelectCatPage from './pages/web/SelectCatPage.tsx'
import SimulationPage from './pages/web/SimulationPage.tsx'

import QuizHomePage from './pages/quiz/QuizHomePage.tsx'
import QuizQuestionPage from './pages/quiz/QuizQuestionPage.tsx'
import QuizResultPage from './pages/quiz/QuizResult.tsx'

function Layout({ children }){
  return( 
      <div className="min-h-screen bg-[url('./assets/noisebg.svg')]">
        <NavBar />
        {children}
      </div>
      );
}

function QuizLayout({ children }){
  return( 
      <div className="min-h-screen bg-(--quiz-bg-color)">
        {children}
      </div>
      );
}

function SidePic({ children }){
  return( <div className="flex min-h-screen bg-[url('./assets/noisebg.svg')]">
            <aside className="hidden md:block w-3/5 bg-(--navbar-color) bg-cover bg-center">
            </aside>
            <div className="w-full md:w-2/5">
              {children}
            </div>
          </div>)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="923855747932-a5k05rdp5c91v8c7o9qvi6tl6shsdh9p.apps.googleusercontent.com">
      <AuthProvider>
        <CatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Layout><HomePage/></Layout>} />
            <Route path="/login" element={<SidePic><LoginPage/></SidePic>} />
            <Route path="/select" element={<Layout><DecisionPage/></Layout>} />
            <Route path="/selectcat" element={<Layout><SelectCatPage/></Layout>} />
            <Route path="/simulation/:catId" element={<Layout><SimulationPage/></Layout>} />
            <Route path="/quiz" element={<QuizLayout><QuizHomePage/></QuizLayout>} />
            <Route path="/quiz-question" element={<QuizLayout><QuizQuestionPage/></QuizLayout>} />
            <Route path="/quiz/result" element={<QuizLayout><QuizResultPage/></QuizLayout>} />
          </Routes>
        </BrowserRouter>
        </CatProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)

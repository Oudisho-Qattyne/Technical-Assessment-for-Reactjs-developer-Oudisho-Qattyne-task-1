import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { FaGithub } from 'react-icons/fa';
import Issues from './pages/issues/Issues.tsx';
import Issue from './pages/issue/Issue.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
      <div className="relaive w-full bg-leight  dark:bg-dark-foreground flex flex-row justify-between items-center p-5">
        <div className='relative flex flex-row gap-3 justify-center items-center'>
          <FaGithub className="text-4xl dark:text-white text-dark" />
          <div className='relative flex flex-row'>

            <p className="relative p-1 font-bold ">facebook</p>
            <p className="relative p-1 font-bold ">/</p>
            <p className="relative p-1 font-bold ">react</p>
          </div>

        </div>
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Issues />} />
        <Route path="/:id" element={<Issue />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

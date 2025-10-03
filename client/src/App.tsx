import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';

import LandingPage from './pages/landingPage/LandingPage';
import SignupPage from './pages/authPage/SignupPage';
import LoginPage from "./pages/authPage/LoginPage";
import HomePage from './pages/homePage/HomePage';

import TransactionPage from './pages/transactionPage/TransactionPage';
import PredictiveAnalyticsPage from './pages/analyticsPage/AnalyticsPage';
import SmartRecommendationsPage from './pages/recommendationPage/RecommendationPage';
import ChatBotPage from './pages/chatBotPage/ChatBotPage';

function App() {
    
    return (
        <Router>
            <Routes>
                
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/transaction" element={<TransactionPage />} />
                        <Route path="/analytics" element={<PredictiveAnalyticsPage />} />
                        <Route path="/smart-recommendation" element={<SmartRecommendationsPage />} />
                        <Route path="/chatbot" element={<ChatBotPage />} />
                    </Route>
                </Route>
                
                <Route path="/" element={<PublicRoute element={<LandingPage />} />} />
                <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />

            </Routes>
        </Router>
    );
}

export default App

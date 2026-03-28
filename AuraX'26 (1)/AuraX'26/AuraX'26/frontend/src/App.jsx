import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsExplorer from './components/EventsExplorer';
import Schedule from './components/Schedule';
import { ResourceHub, MentorSupport, FAQCenter } from './components/ResourceHub';
import ParticipantProfiles from './components/ParticipantProfiles';
import Dashboard from './components/Dashboard';
import DigitalPass from './components/DigitalPass';
import { ContactSection, Footer } from './components/ContactSection';
import OnboardingModal from './components/OnboardingModal';
import SparkleCursor from './components/SparkleCursor';

export const AppContext = createContext(null);
export function useApp() { return useContext(AppContext); }

function MainPage() {
  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>
      <Hero />
      <div className="neon-divider" />
      <About />
      <div className="neon-divider" />
      <EventsExplorer />
      <div className="neon-divider" />
      <Schedule />
      <div className="neon-divider" />
      <ResourceHub />
      <div className="neon-divider" />
      <MentorSupport />
      <div className="neon-divider" />
      <FAQCenter />
      <div className="neon-divider" />
      <ParticipantProfiles />
      <div className="neon-divider" />
      <Dashboard />
      <div className="neon-divider" />
      <DigitalPass />
      <div className="neon-divider" />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [mentorRequests, setMentorRequests] = useState([]);

  const toggleBookmark = (eventId) => {
    setBookmarks(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const toggleRegister = (eventId) => {
    setRegisteredEvents(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const contextValue = {
    user, setUser,
    interests, setInterests,
    bookmarks, toggleBookmark,
    registeredEvents, toggleRegister,
    mentorRequests, setMentorRequests,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <SparkleCursor />
      <BrowserRouter>
        <Navbar />
        {showOnboarding && !user && (
          <OnboardingModal
            onComplete={(userData, userInterests) => {
              setUser({ ...userData, interests: userInterests });
              setInterests(userInterests);
              setShowOnboarding(false);
            }}
            onSkip={() => setShowOnboarding(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
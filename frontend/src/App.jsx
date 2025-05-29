import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Notifications from "./Components/Notifications";
import StreamsDegreeExplorer from "./Components/StreamsDegreeExplorer ";
import EducationPrograms from "./Components/EducationPrograms ";
import StudyAbroad from "./Components/StudyAbroad ";
import CitiesCoursesExplorer from "./Components/CitiesCoursesExplorer ";
import ModernFooter from "./Components/ModernFooter ";
import NavColleges from "./Components/NavColleges";
import CollegeDetails from './Components/CollegeDetails';

// Main Home Page Component
const HomePage = () => {
  return (
    <>
      <Home />
      <Notifications />
      <StreamsDegreeExplorer />
      <EducationPrograms />
      <StudyAbroad />
      <CitiesCoursesExplorer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/college/:slug" element={<NavColleges />} />
        <Route path="/colleges/:collegeName" element={<CollegeDetails />} />
      </Routes>
      <ModernFooter />
    </Router>
  );
}

export default App;
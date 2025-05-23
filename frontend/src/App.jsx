import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Notifications from "./Components/Notifications";
import StreamsDegreeExplorer from "./Components/StreamsDegreeExplorer ";
import EducationPrograms from "./Components/EducationPrograms ";
import StudyAbroad from "./Components/StudyAbroad ";
import CitiesCoursesExplorer from "./Components/CitiesCoursesExplorer ";
import ModernFooter from "./Components/ModernFooter ";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <Notifications></Notifications>
      <StreamsDegreeExplorer></StreamsDegreeExplorer>
      <EducationPrograms></EducationPrograms>
      <StudyAbroad></StudyAbroad>
      <CitiesCoursesExplorer></CitiesCoursesExplorer>
      <ModernFooter></ModernFooter>
    </>
  );
}

export default App;

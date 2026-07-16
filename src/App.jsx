import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import GetInvolved from "./pages/GetInvolved.jsx";
import Volunteer from "./pages/Volunteer.jsx";
import Join from "./pages/Join.jsx";
import Voting from "./pages/Voting.jsx";
import Candidates from "./pages/Candidates.jsx";
import News from "./pages/News.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="get-involved/volunteer" element={<Volunteer />} />
        <Route path="get-involved/join" element={<Join />} />
        <Route path="voting" element={<Voting />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

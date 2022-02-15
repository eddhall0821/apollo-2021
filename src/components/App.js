import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Test from "../routes/Test";
import Upload from "../routes/Upload";
import Labeling from "../routes/Labeling";
import ProjectList from "../routes/ProjectList";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      {/* <Route path="/detail/:id" component={Detail} /> */}
      <Route path="/test" component={Test} />
      <Route path="/upload" component={Upload} />
      <Route path="/labeling/:id" component={Labeling} />
      <Route path="/project_list" component={ProjectList} />
    </Router>
  );
}

export default App;

import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Test from "../routes/Test";
import Upload from "../routes/Upload";
import Uploaded from "../routes/Uploaded";
import Labeling from "../routes/Labeling";
import Download from "../routes/Download";
import ProjectList from "../routes/ProjectList";
import Detail from "../routes/Detail";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/detail" component={Detail} />
      <Route path="/test" component={Test} />
      <Route path="/upload/:id" component={Upload} />
      <Route path="/uploaded/:id" component={Uploaded} />
      <Route path="/labeling/:id" component={Labeling} />
      <Route path="/download/:id" component={Download} />
      <Route path="/project_list" component={ProjectList} />
    </Router>
  );
}

export default App;

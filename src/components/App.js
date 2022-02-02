import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import Test from "../routes/Test";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/test" component={Test} />
    </Router>
  );
}

export default App;

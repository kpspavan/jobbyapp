import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home/Home'
import JobItemDetails from './components/JobItemDetails/JobItemDetails'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import JobSection from './components/JobSection/JobSection'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobSection} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App

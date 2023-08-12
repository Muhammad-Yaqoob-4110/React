import './App.css';
import Movies from './components/movies';
import { Route,Redirect,Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import MovieDetail from './components/movieDetail';
import NewMovie from './components/newMovie';
function App() {
  return (
   <div>
    <Navbar/>
     <div className='container my-3'>
     <Switch>
      <Route exact path = "/movies/new" render = {(props) => <NewMovie {...props}/>}/>
      <Route exact  path = "/movies/:_id" render = {(props) => <MovieDetail {...props}/>}/>
      <Route exact  path = "/movies" render = {(props)=> <Movies {...props}/>}/>
      <Route exact  path = "/" render = {(props)=> <Movies {...props}/>}/>
      <Route path = "/not-found" component = {NotFound}/>
      {/* <Redirect from = "/" to = "/movies"/> */}
      <Redirect to = "/not-found"/>
      </Switch>
    </div>
   </div>
  );
}

export default App;

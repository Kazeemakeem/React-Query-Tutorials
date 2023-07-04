import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParalleQueriesPage from "./components/ParalleQueries.page";
import DynamicParallelQueriesPage from "./components/DynamicParallelQueries.page";
import DynamicMultipleQueriesPage from "./components/DynamicMultipleQueries.page";
import DependentQueries from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/InfiniteQueries.page";
import InfiniteQueriesWithHookPage from "./components/InfiniteQueriesWithHook.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-multiple">
                  RQ Multiple Dynamic Queries
                </Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginated</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-infinite">
              <InfiniteQueriesWithHookPage />
            </Route>
            <Route path="/rq-paginated">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-dependent">
              <DependentQueries email="user@example.com" />
            </Route>
            <Route path="/rq-dynamic-multiple">
              <DynamicMultipleQueriesPage heroIds={[1, 3, 4]} />
            </Route>
            <Route path="/rq-parallel/:comboId">
              <DynamicParallelQueriesPage />
            </Route>
            <Route path="/rq-parallel">
              <ParalleQueriesPage />
            </Route>
            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;

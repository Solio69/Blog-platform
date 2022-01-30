import { useSelector } from 'react-redux';

const useStateUser = () => {
  const stateUserst = useSelector((state) => state.user);
  return stateUserst;
};

const useStateArticles = () => {
  const stateArticles = useSelector((state) => state.articles);
  return stateArticles;
};

export { useStateUser, useStateArticles };

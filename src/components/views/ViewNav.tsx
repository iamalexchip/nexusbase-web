import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import routes from '../../utils/routes';
import ViewSwitcher from '../ViewSwitcher';

const ViewNav = () => {
  const { collection } = useAppSelector(({ collections }) => ({
    collection: collections.data.collection,
  }));

  if (!collection) {
    return <p>loading views</p>;
  }

  return (
    <div className="flex p-3 space-x-1 border-t border-b border-black">
      <Link to={routes.collections.edit(collection.id)}>Edit</Link>
      <ViewSwitcher />
    </div>
  );
};

export default ViewNav;

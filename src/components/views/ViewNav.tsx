import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setSelectedId } from '../../store/slices/views';
import routes from '../../utils/routes';
import ViewSwitcher from '../ViewSwitcher';

const ViewNav = () => {
  const dispatch = useAppDispatch();
  const { collection, viewId } = useAppSelector(({ collections, views }) => ({
    collection: collections.data.collection,
    viewId: views.data.selectedId,
  }));

  if (!collection || !viewId) {
    return <p>loading views</p>;
  }

  return (
    <div className="flex p-3 space-x-1 border-t border-b border-black">
      <Link to={routes.collections.edit(collection.id)}>Edit</Link>
      <ViewSwitcher
        defaultValue={viewId}
        onChange={(id) => dispatch(setSelectedId(id))}
      />
    </div>
  );
};

export default ViewNav;

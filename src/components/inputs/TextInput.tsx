import { FC } from 'react';
import { useField } from 'formik';

const TextInput: FC<{ name: string }> = ({ name }) => {
  const [field, { error }] = useField(name);

  return (
    <div>
      <input {...field} />
      {error && <span>{error}</span>}
    </div>
  );
};

export default TextInput;

import {Checkbox} from 'reactstrap';

export default ({value, name, handleChange, label}) => {
  let control,
    checked = (value === true || value === '1' || value === 'true');

  return (<Checkbox
    checkeed={checked}
      value={value}
      onChange={e => handleChange(e, name)}>
        {label}
      </Checkbox>);
}
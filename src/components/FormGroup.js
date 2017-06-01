export default ({className, style, handle, label, type = 'button'}) => {

  return <button type={button}
          bsStyle={style}
          className={className}
          onClick={handle}
          type={type}>
            {label}
        </button>;
}
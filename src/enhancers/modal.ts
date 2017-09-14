import { compose, withHandlers, withState } from 'recompose';

export default compose(
  withState('showModal', 'setModal', false),
  withHandlers({
    toggle: ({ setModal }) => (showModal) => setModal(!showModal),
  },
  ),
);

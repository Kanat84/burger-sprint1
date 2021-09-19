import PropTypes from 'prop-types';

const dataModalPropTypes = PropTypes.shape({
    onOpen: PropTypes.func.isRequired,  
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
});

export default dataModalPropTypes; 
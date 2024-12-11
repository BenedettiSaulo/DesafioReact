import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const iconMapping = {
    success: <CheckIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />
};

const SimpleAlert = ({ severity = 'info', message, customIcon }) => {
    return (
        <Alert icon={customIcon || iconMapping[severity]} severity={severity}>
            {message}
        </Alert>
    );
};

SimpleAlert.propTypes = {
    severity: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    customIcon: PropTypes.element
};

export default SimpleAlert;

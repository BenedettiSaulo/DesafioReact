import { IMaskInput } from 'react-imask';

const TextMaskCustom = (props, ref) => {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#0) 0 0000-0000"
            definitions={{
                '#': /[1-10]/
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
};

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default TextMaskCustom;

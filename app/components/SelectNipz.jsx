const SelectNipz = ({ options, name, reff}) => {
    // console.log(options);
    return (
        <select name={name} className="form-select form-select-sm" ref={reff} readOnly>
            {options.map((option, i) => (
                <option
                    key={i}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
};

export default SelectNipz
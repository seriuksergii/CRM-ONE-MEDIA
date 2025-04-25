import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { BodyBase } from '../../components/Typography/Headlines&Texts';
import './RangeSlider.scss';

const RangeSlider = ({
  min = 0,
  max = 100,
  label = '',
  step = 1,
  minDistance = 1,
  initialValues = [0, 100],
  onChange,
}) => {
  const [values, setValues] = useState(() => [
    Math.max(initialValues[0], min),
    Math.min(initialValues[1], max),
  ]);
  const [inputValues, setInputValues] = useState(initialValues.map(String));

  const handleSliderChange = (newValues) => {
    setValues(newValues);
    setInputValues(newValues.map(String));
    onChange?.(newValues);
  };

  const handleInputChange = (index) => (e) => {
    const inputVal = e.target.value;
    const parsed = parseInt(inputVal);
    const newInputValues = [...inputValues];
    newInputValues[index] = inputVal;
    setInputValues(newInputValues);

    if (!isNaN(parsed)) {
      const newValues = [...values];
      let clamped = Math.min(Math.max(parsed, min), max);

      if (index === 0) {
        clamped = Math.min(clamped, newValues[1] - minDistance);
        newValues[0] = clamped;
      } else {
        clamped = Math.max(clamped, newValues[0] + minDistance);
        newValues[1] = clamped;
      }

      const updatedInputValues = [...inputValues];
      updatedInputValues[index] = String(clamped);
      setInputValues(updatedInputValues);

      setValues(newValues);
      onChange?.(newValues);
    }
  };

  const getTrackStyle = (index) => {
    switch (index) {
      case 0:
        return {
          left: '0%',
          right: `calc(100% - ${(values[0] / max) * 100}%)`,
        };
      case 1:
        return {
          background: '#0066cc',
          left: `${(values[0] / max) * 100}%`,
          right: `calc(100% - ${(values[1] / max) * 100}%)`,
        };
      case 2:
        return {
          left: `${(values[1] / max) * 100}%`,
          right: '0%',
        };
      default:
        return {};
    }
  };

  return (
    <div className="range-slider-wrapper">
      <BodyBase>{label}</BodyBase>

      <div className="slider-and-inputs">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={values}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          pearling
          minDistance={minDistance}
          renderTrack={(props, state) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className="example-track"
                style={getTrackStyle(state.index)}
              />
            );
          }}
        />

        <div className="input-fields">
          <input
            type="number"
            value={inputValues[0]}
            onChange={handleInputChange(0)}
            className="range-input"
            min={min}
            max={values[1] - minDistance}
          />
          <BodyBase>to</BodyBase>
          <input
            type="number"
            value={inputValues[1]}
            onChange={handleInputChange(1)}
            className="range-input"
            min={values[0] + minDistance}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

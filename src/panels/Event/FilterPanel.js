import React from "react";
import PropTypes from "prop-types";
import {
  Cell,
  Slider,
  FormLayout
} from "@vkontakte/vkui";

export const MAX_DISTANCE = 50 * 1000;
const EARTH_RADIUS = 45 * 1000 * 1000;

const FilterPanel = (props) => {

  const { filterValues, onUpdate } = props;

  return (
    <FormLayout style={{ zIndex: 1000 }}>
      <Slider
        min={500}
        max={MAX_DISTANCE}
        step={500}
        value={filterValues['location'] === null ? 1 : filterValues['location']}
        onChange={(value) => {
          onUpdate({ key: 'location', value: value >= MAX_DISTANCE ? null : value });
        }}
        top={`В радиусе ${filterValues['location']} м`}
      />
      <Cell></Cell><Cell></Cell>
    </FormLayout>
  )
};

FilterPanel.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default FilterPanel;

import React from "react";
import PropTypes from "prop-types";
import {
  Cell,
  Slider,
  FormLayout
} from "@vkontakte/vkui";

const FilterPanel = (props) => {

  const { filterValues, onUpdate } = props;  

  // TODO : check rerendering here

  return (
    <FormLayout>
      <Slider
        min={500}
        max={50 * 1000}
        step={500}
        value={filterValues['location'] === null ? 1 : filterValues['location']}
        onChange={(value) => onUpdate({ key: 'location', value: value })}
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

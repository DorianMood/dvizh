import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Cell,
  Div,
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
      <Cell asideContent={<Switch defaultChecked={filterValues['date']} onChange={(e) => onUpdate({ key: 'date', value: e.target.checked })} />}>Скоро</Cell>
      <Cell asideContent={<Switch defaultChecked={filterValues['friends']} onChange={(e) => onUpdate({ key: 'friends', value: e.target.checked })} />}>Друзья</Cell>
      <Cell></Cell><Cell></Cell>
    </FormLayout>
  )
};

FilterPanel.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired
};

export default FilterPanel;

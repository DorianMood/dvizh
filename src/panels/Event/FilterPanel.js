import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Cell,
  Div
} from "@vkontakte/vkui";

const FilterPanel = (props) => {

  const { filterValues, onUpdate } = props;

  return (
    <Div>
      <Cell asideContent={<Switch defaultChecked={filterValues['location']} onChange={(e) => onUpdate({ key: 'location', value: e.target.checked })} />}>Рядом</Cell>
      <Cell asideContent={<Switch defaultChecked={filterValues['date']} onChange={(e) => onUpdate({ key: 'date', value: e.target.checked })} />}>Скоро</Cell>
      <Cell></Cell><Cell></Cell>
    </Div>
  )
};

FilterPanel.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired
};

export default FilterPanel;

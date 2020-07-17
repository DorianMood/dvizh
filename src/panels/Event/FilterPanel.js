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
  
  
  useEffect(() => {
    onUpdate({key: 'location', value: 1});
  }, []);
  

  // TODO : check rerendering here
  //console.log('Filter pannel ', filterValues);

  return (
    <FormLayout>
      <Slider
        min={500}
        max={50 * 1000}
        step={500}
        value={filterValues['location']}
        onChange={(value) => onUpdate({ key: 'location', value: value })}
        top={`В радиусе ${filterValues['location']} м`}
      />
      <Cell asideContent={<Switch defaultChecked={filterValues['date']} onChange={(e) => onUpdate({ key: 'date', value: e.target.checked })} />}>Скоро</Cell>
      <Cell></Cell><Cell></Cell>
    </FormLayout>
  )
};

FilterPanel.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired
};

export default FilterPanel;

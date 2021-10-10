import './FilterGroup.css'

const FilterGroup = props => {
  const renderFilterEmploymentList = () => {
    const {employmentTypesList, changeemploymentTypesList} = props
    return employmentTypesList.map(eachItem => {
      const onclickchangeemploymentTypesList = () => {
        changeemploymentTypesList(eachItem.employmentTypeId)
      }
      return (
        <div>
          <li
            onChange={onclickchangeemploymentTypesList}
            key={eachItem.employmentTypeId}
            className="options"
          >
            <input
              className="input-checkbox"
              type="checkbox"
              value={eachItem.label}
              id={eachItem.label}
            />
            <label className="label-checkbox" For={eachItem.label}>
              {eachItem.label}
            </label>
          </li>
        </div>
      )
    })
  }

  const renderFilterSalaryList = () => {
    const {salaryRangesList, changeSalarayList} = props
    return salaryRangesList.map(eachItem => {
      const onclickSalaryRangeList = () => {
        changeSalarayList(eachItem.salaryRangeId)
      }
      return (
        <div>
          <li
            onChange={onclickSalaryRangeList}
            key={eachItem.salaryRangeId}
            className="options"
          >
            <input
              className="input-checkbox"
              type="radio"
              value={eachItem.label}
              id={eachItem.label}
            />
            <label className="label-checkbox" For={eachItem.label}>
              {eachItem.label}
            </label>
          </li>
        </div>
      )
    })
  }

  const renderEmploymentTypesList = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>{renderFilterEmploymentList()}</ul>
    </div>
  )

  const renderSalaryRangelist = () => (
    <div>
      <hr />
      <h1>Salary Range</h1>
      <ul>{renderFilterSalaryList()}</ul>
    </div>
  )

  return (
    <div>
      {renderEmploymentTypesList()}
      {renderSalaryRangelist()}
    </div>
  )
}

export default FilterGroup

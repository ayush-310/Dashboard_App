import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterControls = ({
    ageFilter,
    setAgeFilter,
    genderFilter,
    setGenderFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) => (
    <div className="filter-container">
        <h2 className="filter-title">Filters</h2>
        <div className="filter-controls">
            <div className='dd'>
                <div className="filter-group">
                    <label className="filter-label" htmlFor="age-filter">Age Group</label>
                    <select
                        id="age-filter"
                        className="filter-select"
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                    >
                        <option value="15-25">15-25</option>
                        <option value=">25">&gt;25</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label" htmlFor="gender-filter">Gender</label>
                    <select
                        id="gender-filter"
                        className="filter-select"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <div className='dd'>
                {/* Start Date Picker */}
                <div className="filter-group">
                    <label className="filter-label" htmlFor="start-date">Start Date</label>
                    <DatePicker
                        id="start-date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="filter-datepicker"
                    />
                </div>

                {/* End Date Picker */}
                <div className="filter-group">
                    <label className="filter-label" htmlFor="end-date">End Date</label>
                    <DatePicker
                        id="end-date"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="filter-datepicker"
                    />
                </div>
            </div>
        </div>
    </div>
);

export default FilterControls;

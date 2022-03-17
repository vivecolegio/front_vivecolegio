import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import { FormGroup, Input } from 'reactstrap';
import ApplicationMenu from '../AplicationsComponents/ApplicationMenu';

const SurveyDetailApplicationMenu = () => {
  return (
    <ApplicationMenu>
      <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
        <div className="p-4">
          <p className="text-muted text-small">Status</p>
          <ul className="list-unstyled mb-5">
            <li className="active">
              <NavLink to="#">
                <i className="simple-icon-refresh" />
                Active Surveys
                <span className="float-right">12</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <i className="simple-icon-check" />
                Completed Surveys
                <span className="float-right">24</span>{' '}
              </NavLink>
            </li>
          </ul>

          <p className="text-muted text-small">Categories</p>
          <FormGroup className="mb-5">
            <Input type="checkbox" id="developmentCheck" label="Development" className="mb-2" />
            <Input type="checkbox" id="workplaceCheck" className="mb-2" label="Workplace" />
            <Input type="checkbox" id="hardwareCheck" className="mb-2" label="Hardware" />
          </FormGroup>

          <p className="text-muted text-small">Labels</p>
          <div>
            <NavLink to="#">
              <span className="mb-1 badge badge-outline-primary rounded-pill">NEW FRAMEWORK</span>{' '}
            </NavLink>

            <NavLink to="#">
              <span className="mb-1 badge badge-outline-secondary rounded-pill">EDUCATION</span>{' '}
            </NavLink>
            <NavLink to="#">
              <span className="mb-1 badge badge-outline-info rounded-pill">PERSONAL</span>{' '}
            </NavLink>
          </div>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyDetailApplicationMenu;

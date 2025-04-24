import React, { useState } from 'react';
import SelectButtonGroup from '../../components/SelectButtonGroup/SelectButtonGroup';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { Formik, Form } from 'formik';
import './AccountsPage.scss';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import RangeSlider from '../../components/RangeSlider/RangeSlider';

const AccountsPage = () => {
  const [activeTab, setActiveTab] = useState('b');

  const handleSelectionChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="accounts-page">
      <HeaderTitle
        title="Ad Accounts"
        subtitle="Manage and monitor your Facebook ad campaigns"
      />
      <div className="select-buttons">
        <SelectButtonGroup
          defaultValue={activeTab}
          options={[
            { value: 'a', label: 'Первая' },
            { value: 'b', label: 'Вторая' },
            { value: 'c', label: 'Третья' },
            { value: 'd', label: 'Четвертая' },
            { value: 'e', label: 'Пятая' },
          ]}
          onChange={handleSelectionChange}
        />
        <div className="tab-content">
          {activeTab === 'a' && <div>Содержимое первой вкладки</div>}
          {activeTab === 'b' && <div>Содержимое второй вкладки</div>}
          {activeTab === 'c' && <div>Содержимое третьей вкладки</div>}
          {activeTab === 'd' && <div>Содержимое четвертой вкладки</div>}
          {activeTab === 'e' && <div>Содержимое пятой вкладки</div>}
        </div>
      </div>

      <Formik
        initialValues={{ isSubscribed: false }}
        onSubmit={(values) => {
          console.log('Submitted:', values);
        }}
      >
        {() => (
          <Form className="add-offer-form">
            <ToggleSwitch name="isSubscribed" disabled={false} />
            <button
              type="submit"
              style={{ padding: '10px', textAlign: 'center' }}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <RangeSlider
        label="ROAS Range"
        min={0}
        max={10}
        step={1}
        initialValues={[0, 10]}
      />
      <RangeSlider
        label="Budget Range"
        min={0}
        max={5000}
        step={10}
        initialValues={[0, 5000]}
      />
      <RangeSlider
        label="Range"
        min={0}
        max={200}
        step={5}
        initialValues={[0, 200]}
      />
    </div>
  );
};

export default AccountsPage;

import React, { useState } from 'react';
import SelectButtonGroup from '../../components/SelectButtonGroup/SelectButtonGroup';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { Formik, Form } from 'formik';
import './AccountsPage.scss';
import Select from '../../components/Select/Select';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import RangeSlider from '../../components/RangeSlider/RangeSlider';
import GraphicCard from '../../components/GraphicCard/GraphicCard';
import dataJson from '../../components/GraphicCard/data.json';
import dataJson2 from '../../components/GraphicCard/data2.json';
import dataJson3 from '../../components/GraphicCard/data3.json';
import Button from '../../components/Button/Button';
import InviteNewTeamMember from '../../components/Modals/InviteNewTeamMember/InviteNewTeamMember';
import PopUp from '../../components/PopUp/PopUp';
import ConnectFBAdAccount from '../../components/Modals/ConnectFBAdAccount/ConnectFBAdAccount';
import ChangeUserRole from '../../components/Modals/ChangeUserRole/ChangeUserRole';
import CreateNewPermission from '../../components/Modals/CreateNewPermission/CreateNewPermission';
import SendInvitation from '../../components/Modals/SendInvitation/SendInvitation';
import AddNewUser from '../../components/Modals/AddNewUser/AddNewUser';
import Calendar from '../../components/Calendar/Calendar';
import { MdMargin } from 'react-icons/md';

const AccountsPage = () => {
  const [activeTab, setActiveTab] = useState('b');
  const [isInviteTeamModalOpen, setInviteTeamModalOpen] = useState(false);
  const [isConnectAccountModalOpen, setConnectAccountModalOpen] =
    useState(false);
  const [isChangeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [isCreatePermissionModalOpen, setCreatePermissionModalOpen] =
    useState(false);
  const [isSendInvitationModalOpen, setSendInvitationModalOpen] =
    useState(false);
  const [isAddNewUserModalOpen, setAddNewUserModalOpen] = useState(false);

  const handleSelectionChange = (value) => {
    setActiveTab(value);
  };

  const handleInviteUser = () => {
    setInviteTeamModalOpen(true);
  };

  const handleSendInvitation = () => {
    setSendInvitationModalOpen(true);
  };

  const handleConnectAccount = () => {
    setConnectAccountModalOpen(true);
  };
  const handleAddNewUser = () => {
    setAddNewUserModalOpen(true);
  };

  const handleChangeRole = () => {
    setChangeRoleModalOpen(true);
  };

  const handleCreatePermission = () => {
    setCreatePermissionModalOpen(true);
  };

  const handleSaveAccount = (values) => {
    console.log('Save account:', values);
    setConnectAccountModalOpen(false);
  };

  const handleSaveRole = (values) => {
    console.log('Save role:', values);
    setChangeRoleModalOpen(false);
  };

  const handleSavePermission = (values) => {
    console.log('Save permission:', values);
    setCreatePermissionModalOpen(false);
  };

  const availableRoles = ['admin', 'head', 'team_lead', 'buyer'];
  const testUser = { name: 'John Doe', role: 'buyer' };

  return (
    <div className="accounts-page">
      <HeaderTitle
        title="Ad Accounts"
        subtitle="Manage and monitor your Facebook ad campaigns"
      />
      <div className="graphic-cards">
        <GraphicCard
          data={dataJson.data}
          name={dataJson.name}
          unit={dataJson.unit}
          interval={dataJson.interval}
        />
        <GraphicCard
          data={dataJson2.data}
          name={dataJson2.name}
          unit={dataJson2.unit}
          interval={dataJson2.interval}
        />
        <GraphicCard
          data={dataJson3.data}
          name={dataJson3.name}
          unit={dataJson3.unit}
          interval={dataJson3.interval}
        />
      </div>

      <Calendar />

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

      <div className="action-buttons">
        <Button
          className="btn-primary"
          text="Invite User"
          onClick={handleInviteUser}
          style={{ backgroundColor: '#0066CC' }}
        />
        <Button
          className="btn-primary"
          text="Connect Account"
          onClick={handleConnectAccount}
          style={{ backgroundColor: '#0066CC' }}
        />
        <Button
          className="btn-primary"
          text="Change User Role"
          onClick={handleChangeRole}
          style={{ backgroundColor: '#0066CC' }}
        />
        <Button
          className="btn-primary"
          text="Create Permission"
          onClick={handleCreatePermission}
          style={{ backgroundColor: '#0066CC' }}
        />
        <Button
          className="btn-primary"
          text="Send Invitation"
          onClick={handleSendInvitation}
          style={{ backgroundColor: '#0066CC' }}
        />
        <Button
          className="btn-primary"
          text="Add New User"
          onClick={handleAddNewUser}
          style={{ backgroundColor: '#0066CC' }}
        />
      </div>

      {isInviteTeamModalOpen && (
        <PopUp onClose={() => setInviteTeamModalOpen(false)}>
          <InviteNewTeamMember
            onSave={(values) => {
              console.log('Invite user:', values);
              setInviteTeamModalOpen(false);
            }}
            onClose={() => setInviteTeamModalOpen(false)}
            availableRoles={availableRoles}
          />
        </PopUp>
      )}

      {isSendInvitationModalOpen && (
        <PopUp onClose={() => setSendInvitationModalOpen(false)}>
          <SendInvitation
            onSave={(values) => {
              console.log('Send invitation:', values);
              setSendInvitationModalOpen(false);
            }}
            onClose={() => setSendInvitationModalOpen(false)}
            availableRoles={availableRoles}
          />
        </PopUp>
      )}

      {isConnectAccountModalOpen && (
        <PopUp onClose={() => setConnectAccountModalOpen(false)}>
          <ConnectFBAdAccount
            onSave={handleSaveAccount}
            onClose={() => setConnectAccountModalOpen(false)}
            initialValues={{ accessToken: '' }}
          />
        </PopUp>
      )}

      {isChangeRoleModalOpen && (
        <PopUp onClose={() => setChangeRoleModalOpen(false)}>
          <ChangeUserRole
            onSave={handleSaveRole}
            onClose={() => setChangeRoleModalOpen(false)}
            initialValues={{ role: testUser.role }}
            availableRoles={availableRoles}
            currentUserName={testUser.name}
          />
        </PopUp>
      )}

      {isCreatePermissionModalOpen && (
        <PopUp onClose={() => setCreatePermissionModalOpen(false)}>
          <CreateNewPermission
            onSave={handleSavePermission}
            onClose={() => setCreatePermissionModalOpen(false)}
            availableRoles={availableRoles}
          />
        </PopUp>
      )}

      {isAddNewUserModalOpen && (
        <PopUp onClose={() => setAddNewUserModalOpen(false)}>
          <AddNewUser
            isOpen={isAddNewUserModalOpen}
            onSave={(values) => {
              console.log('Add new user:', values);
              setAddNewUserModalOpen(false);
            }}
            onClose={() => setAddNewUserModalOpen(false)}
            availableRoles={availableRoles}
          />
        </PopUp>
      )}

      <Formik
        initialValues={{ role: '', team: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Select
            name="role"
            label="Role"
            options={['admin', 'buyer', 'team_lead']}
            required
            menuPlacement="auto"
            menuShouldScrollIntoView={false}
            menuPosition="fixed"
            menuShouldBlockScroll={true}
          />
          <Select
            name="team"
            label="Team"
            options={[
              { value: 'team-a', label: 'Team A' },
              { value: 'team-b', label: 'Team B' },
            ]}
            required
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      
    </div>
  );
};

export default AccountsPage;

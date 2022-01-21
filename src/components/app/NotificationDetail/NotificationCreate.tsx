import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as notificationActions from '../../../stores/actions/NotificationAction';

const NotificationCreate = ({ modalOpen, toggleModal, props }: any) => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(null);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control, reset, register, setValue } = methods;
  const { isValid } = useFormState({ control });

  useEffect(() => {
    getDropdowns();
  }, []);

  const cleanForm = async () => {
    reset();
  };

  const getDropdowns = async () => {
    props.getDropdownsNotification().then((data: any) => {
      setUsersList(
        data.dataUsers.edges.map((c: any) => {
          return { label: `${c.node.name} ${c.node.lastName}`, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const onSubmit = async (dataForm: any) => {
    props.saveNewNotification(dataForm).then((data: any) => { 
      // close modal
      props.toggleModal();
     });
  };

  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
    value: null,
  });
  const { ref: messageRef, ...messageRest } = register('message', {
    required: true,
    value: null,
  });
  register('dateSend', {
    required: false,
    value: new Date(),
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader
            toggle={toggleModal}
            close={
              <button type="button" className="close" onClick={toggleModal} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            }
          >
            <IntlMessages id="pages.newMessage" />
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.to" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}
                {...register('userId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={usersList}
                value={user}
                onChange={(selectedOption) => {
                  setValue('userId', selectedOption?.key);
                  setUser(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.subject" />
              </Label>
              <Input {...titleRest} innerRef={titleRef} className="form-control" />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.message" />
              </Label>
              <Input {...messageRest} innerRef={messageRef} className="form-control" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={toggleModal}>
              <IntlMessages id="pages.cancel" />
            </Button>
            <Button
              color="primary"
              onClick={() => {
                onSubmit(methods.getValues());
              }}
              disabled={!isValid}
            >
              <IntlMessages id="pages.submit" />
            </Button>
          </ModalFooter>
        </Modal>
      </form>
    </FormProvider>
  );
};

const mapDispatchToProps = { ...notificationActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCreate);

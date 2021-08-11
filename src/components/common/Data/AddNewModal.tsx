import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';


const AddNewModal = ({ modalOpen, toggleModal, children, onSubmit, isLg }: any) => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const {
    register,
    formState: { errors, isValid },
    getValues,
    trigger,
  } = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal                
          isOpen={modalOpen}
          toggle={toggleModal}
          className={isLg ? 'max-w-50' : ''}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={toggleModal}>
            <IntlMessages id="pages.add-new-modal-title" />
          </ModalHeader>
          {children}
          <ModalFooter>
            <Button color="secondary" outline onClick={toggleModal}>
              <IntlMessages id="pages.cancel" />
            </Button>
            <Button
              color="primary"
              onClick={() => {
                onSubmit(methods.getValues(), methods.formState);
              }}
            >
              <IntlMessages id="pages.submit" />
            </Button>
          </ModalFooter>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default AddNewModal;

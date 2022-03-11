import React from 'react';
import { FormProvider, useFormState } from 'react-hook-form';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  children,
  onSubmit,
  isLg,
  data,
  methods,
  control,
  handleSubmit,
  hideFooter
}: any, ) => {
  const { isValid, errors } = useFormState({ control });

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
          <ModalHeader
            toggle={toggleModal}
            close={
              <button type="button" className="close" onClick={toggleModal} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            }
          >
            <IntlMessages
              id={data?.id ? 'pages.add-edit-modal-title' : 'pages.add-new-modal-title'}
            />
          </ModalHeader>
          {children}
          {!hideFooter ? 
          <ModalFooter>
            <Button color="secondary" outline onClick={toggleModal}>
              <IntlMessages id="pages.cancel" />
            </Button>
            <Button
              color="primary"
              onClick={() => {
                onSubmit(methods.getValues());
              }}
              // disabled={!isValid}
            >
              <IntlMessages id="pages.submit" />
            </Button>
          </ModalFooter>
          : ''}
        </Modal>
      </form>
    </FormProvider>
  );
};

export default AddNewModal;

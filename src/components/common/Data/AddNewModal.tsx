import React from 'react';
import { FormProvider, useFormState } from 'react-hook-form';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import { DevTool } from '@hookform/devtools';

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
  hideFooter,
  formState,
  validateForm
}: any) => {
  const { isValid, errors } = useFormState({ control });
  console.log(methods?.formState?.errors)
  console.log(isValid)
  console.log(errors)
  console.log(methods?.formState)
  return (
    <FormProvider {...methods}>
      <DevTool control={control} />
      <form onSubmit={handleSubmit(onSubmit)} className="av-tooltip tooltip-label-right">
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
                disabled={validateForm ? !methods?.formState?.isValid : false}
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

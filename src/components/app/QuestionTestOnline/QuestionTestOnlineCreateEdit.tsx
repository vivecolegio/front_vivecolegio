import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as questionTestOnlineActions from '../../../stores/actions/QuestionTestOnlineActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const QuestionCategoryTestOnlineCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [questionCategoryTestOnline, setQuestionCategoryTestOnline] = useState(null);
  const [questionCategoryTestOnlineList, setQuestionCategoryTestOnlineList] = useState([]);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (
      props?.data?.questionCategoryTestOnline !== undefined &&
      props?.data?.questionCategoryTestOnline != null
    ) {
      setQuestionCategoryTestOnline({
        key: props?.data?.questionCategoryTestOnline?.id,
        label: props?.data?.questionCategoryTestOnline?.name,
        value: props?.data?.questionCategoryTestOnline?.id,
      });
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsQuestionTestOnline(props?.loginReducer?.campusId).then((data: any) => {
      setQuestionCategoryTestOnlineList(
        data.dataCategories.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  const { ref: statementRef, ...statementRest } = register('statement', {
    required: true,
    value: props?.data?.id ? props?.data?.statement : '',
  });
  const { ref: questionTypeRef, ...questionTypeRest } = register('questionType', {
    required: true,
    value: props?.data?.id ? props?.data?.questionType : '',
  });
  register('campusId', {
    required: true,
    value: props?.data?.id ? props?.data?.campusId : '',
  });
  register('questionCategoryTestOnlineId', {
    required: true,
    value: props?.data?.id ? props?.data?.questionCategoryTestOnlineId : '',
  });

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      ) : (
        <>
          <AddNewModal
            modalOpen={props.modalOpen}
            toggleModal={() => {
              cleanForm();
              props.toggleModal();
            }}
            onSubmit={props.onSubmit}
            data={props.data}
            methods={methods}
            control={control}
            handleSubmit={handleSubmit}
          >
            <ModalBody>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.name" />
                </Label>
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.type" />
                </Label>
                <Input {...questionTypeRest} innerRef={questionTypeRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.category" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicPeriodId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={questionCategoryTestOnlineList}
                  value={questionCategoryTestOnline}
                  onChange={(selectedOption) => {
                    setValue('questionCategoryTestOnlineId', selectedOption?.key);
                    setQuestionCategoryTestOnline(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.statement" />
                </Label>
                <Input
                  type="textarea"
                  rows={2}
                  {...statementRest}
                  innerRef={statementRef}
                  className="form-control"
                />
              </div>
            </ModalBody>
            {props?.data?.id ? (
              <ModalFooter className="p-3">
                <CreateEditAuditInformation loading={loading} auditInfo={auditInfo} />
              </ModalFooter>
            ) : (
              <></>
            )}
          </AddNewModal>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...questionTestOnlineActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCategoryTestOnlineCreateEdit);

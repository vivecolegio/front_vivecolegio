// import React, { useState, useEffect } from 'react';
// import { Colxx, Separator } from '../../../common/CustomBootstrap';
// import { useParams } from 'react-router-dom';
// import {
//   Row,
//   Card,
//   CardBody,
//   CardTitle,
//   Form,
//   Label,
//   Input,
//   Button,
//   FormGroup,
//   FormText,
// } from 'reactstrap';
// import IntlMessages from '../../../helpers/IntlMessages';
// import { connect } from 'react-redux';

// import * as userActions from '../../../../stores/actions/userActions';

// import Select from 'react-select';
// import CustomSelectInput from '../../../common/CustomSelectInput';
// import Loader from 'react-loader-spinner';
// import DatePicker from 'react-datepicker';
// import BreadcrumbContainer from '../../../common/navs/CustomBreadcrumb';
// import { useForm } from 'react-hook-form';
// import CreateEditAuditInformation from '../../../common/createEdit/CreateEditAuditInformation';
// import { loaderColor, loaderIcon } from '../../../../constants/DefaultValues';

// const UserCreateEdit = (props: any) => {
//   const { register, handleSubmit, errors, getValues, setValue } = useForm();

//   // const { id } = useParams();
//   const id = 0;

//   const [loading, setLoading] = useState(true);

//   const [dropdowns, setDropdowns] = useState(null);

//   const [birthdate, setBirthdate] = useState(null);

//   const [gender, setGender] = useState(null);

//   const [documentType, setDocumentType] = useState(null);

//   const [rol, setRol] = useState(null);

//   const [auditInfo, setAuditInfo] = useState({
//     createdAt: null,
//     createdBy: null,
//     updatedAt: null,
//     updatedBy: null,
//     version: 0,
//   });

//   const prepareDataApiGraphql = (data: any) => {
//     let user: any = {};
//     user.name = getValues('name').length > 0 ? getValues('name') : null;
//     user.lastName =
//       getValues('lastName').length > 0 ? getValues('lastName') : null;
//     user.username =
//       getValues('username').length > 0 ? getValues('username') : null;
//     user.gender = getValues('gender') != undefined ? getValues('gender') : null;
//     user.documentType =
//       getValues('documentType') != undefined ? getValues('documentType') : null;
//     user.documentNumber =
//       getValues('documentNumber').length > 0
//         ? getValues('documentNumber')
//         : null;
//     user.birthdate =
//       getValues('birthdate') != undefined ? getValues('birthdate') : null;
//     user.phone = getValues('phone').length > 0 ? getValues('phone') : null;
//     user.email = getValues('email').length > 0 ? getValues('email') : null;
//     user.password =
//       getValues('password').length > 0 ? getValues('password') : null;
//     user.avatar = null;
//     user.active = true;
//     user.roleId = getValues('rol') != undefined ? getValues('rol') : null;
//     if (id) {
//       props.updateUser(id, user);
//     } else {
//       props.createUser(user);
//     }
//   };

//   useEffect(() => {
//     if (props.UserReducer.user && props.UserReducer.user.id) {
//       onCancel();
//     }
//   }, [props.UserReducer.user]);

//   const onSubmit = (data: any) => {
//     prepareDataApiGraphql(data);
//   };

//   const onCancel = () => {
//     props.history.push('/administration/users');
//   };

//   const handleChangeDate = (date: Date) => {
//     setValue('birthdate', date);
//     setBirthdate(date);
//   };

//   const handleChangeDocumentType = (documentType: any) => {
//     setValue('documentType', documentType);
//     setDocumentType(documentType);
//   };

//   const handleChangeGender = (gender: any) => {
//     setValue('gender', gender);
//     setGender(gender);
//   };

//   const handleChangeRol = (rol: any) => {
//     setValue('rol', rol);
//     setRol(rol);
//   };

//   useEffect(() => {
//     register({ name: 'name' }, { required: true });
//     register({ name: 'lastName' }, { required: true });
//     register({ name: 'documentNumber' }, { required: true });
//     register({ name: 'username' }, { required: true });
//     register({ name: 'phone' }, { required: true });
//     register({ name: 'email' }, { required: true });
//     register({ name: 'password' }, { required: true });
//     register({ name: 'birthdate' }, { required: true });
//     register({ name: 'documentType' }, { required: true });
//     register({ name: 'gender' }, { required: true });
//     register({ name: 'rol' }, { required: true });
//     dataViewRender();
//   }, [register]);

//   const dataViewRender = () => {
//     props.getEnumTypes().then((dropdowns: any) => {
//       setDropdowns(dropdowns);
//       if (id) {
//         props.getUser(id).then((data: any) => {
//           setValue('name', data.name);
//           setValue('lastName', data.lastName);
//           setValue('documentNumber', data.documentNumber);
//           setValue('username', data.username);
//           setValue('phone', data.phone);
//           setValue('email', data.email);
//           if (data.birthdate != null) {
//             handleChangeDate(new Date(data.birthdate));
//           }
//           if (data.documentType != null) {
//             handleChangeDocumentType({
//               value: data.documentType,
//               label: data.documentType,
//             });
//           }
//           if (data.gender != null) {
//             handleChangeGender({
//               value: data.gender,
//               label: data.gender,
//             });
//           }
//           let rol = dropdowns?.roles?.filter(
//             (option: any) => option.value === data.role_id
//           );
//           if (rol.size > 0) {
//             handleChangeRol({
//               value: rol[0].value,
//               label: rol[0].label,
//             });
//           }
//           setAuditInfo({
//             createdAt: data.createdAt,
//             createdBy: null,
//             updatedAt: data.updatedAt,
//             updatedBy: null,
//             version: data.version,
//           });
//           setLoading(false);
//         });
//       } else {
//         setLoading(false);
//       }
//     });
//   };

//   return (
//     <>
//       <Row>
//         <Colxx xxs="12">
//           <BreadcrumbContainer heading="forms.user" match={props.match} />
//           <Separator className="mb-5" />
//         </Colxx>
//       </Row>
//       <Row className="mb-4">
//         <Colxx xxs="12">
//           <Card>
//             <CardBody>
//               <CardTitle>
//                 <IntlMessages id="forms.user.userDetails" />
//               </CardTitle>
//               <Form>
//                 <FormGroup row>
//                   {loading ? (
//                     <Colxx sm={12} className="d-flex justify-content-center">
//                       <Loader
//                         type={loaderIcon as any}
//                         color={loaderColor}
//                         height={30}
//                         width={30}
//                         // timeout={3000} //3 secs
//                       />
//                     </Colxx>
//                   ) : (
//                     <>
//                       {/* User Name */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.name" /> *
//                           </Label>
//                           <Input defaultValue={getValues('name')} />
//                           <FormText color="danger">
//                             {errors.name && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Last Name */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.lastName" /> *
//                           </Label>
//                           <Input defaultValue={getValues('lastName')} />
//                         </FormGroup>
//                         <FormText color="danger">
//                           {errors.lastName && (
//                             <IntlMessages id="forms.inputRequired" />
//                           )}
//                         </FormText>
//                       </Colxx>
//                       {/* User Gender */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.gender" /> *
//                           </Label>
//                           <Select
//                             components={{ Input: CustomSelectInput }}
//                             className="react-select"
//                             classNamePrefix="react-select"
//                             name="gender"
//                             value={gender}
//                             onChange={handleChangeGender}
//                             options={dropdowns?.gender}
//                             placeholder=""
//                           />
//                         </FormGroup>
//                         <FormText color="danger">
//                           {errors.gender && (
//                             <IntlMessages id="forms.inputRequired" />
//                           )}
//                         </FormText>
//                       </Colxx>
//                       {/* User Document Type */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.documentType" /> *
//                           </Label>
//                           <Select
//                             components={{ Input: CustomSelectInput }}
//                             className="react-select"
//                             classNamePrefix="react-select"
//                             name="documentType"
//                             value={documentType}
//                             onChange={handleChangeDocumentType}
//                             options={dropdowns?.documentType}
//                             placeholder=""
//                           />
//                           <FormText color="danger">
//                             {errors.documentType && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Document Number */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.documentNumber" /> *
//                           </Label>
//                           <Input defaultValue={getValues('documentNumber')} />
//                           <FormText color="danger">
//                             {errors.documentNumber && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Birthday */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.birthdate" /> *
//                           </Label>
//                           <DatePicker
//                             onChange={handleChangeDate}
//                             selected={birthdate}
//                           />
//                           <FormText color="danger">
//                             {errors.birthdate && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Phone */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.phone" /> *
//                           </Label>
//                           <Input defaultValue={getValues('phone')} />
//                           <FormText color="danger">
//                             {errors.phone && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Email */}
//                       <Colxx sm={8}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.email" /> *
//                           </Label>
//                           <Input defaultValue={getValues('email')} />
//                           <FormText color="danger">
//                             {errors.email && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* Username */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.username" /> *
//                           </Label>
//                           <Input defaultValue={getValues('username')} />
//                           <FormText color="danger">
//                             {errors.username && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Password */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.password" /> *
//                           </Label>
//                           <Input
//                             type="password"
//                             defaultValue={getValues('password')}
//                           />
//                           <FormText color="danger">
//                             {errors.password && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       {/* User Role */}
//                       <Colxx sm={4}>
//                         <FormGroup className="form-group has-float-label">
//                           <Label>
//                             <IntlMessages id="forms.user.role" /> *
//                           </Label>
//                           <Select
//                             components={{ Input: CustomSelectInput }}
//                             className="react-select"
//                             classNamePrefix="react-select"
//                             name="rol"
//                             value={rol}
//                             onChange={handleChangeRol}
//                             options={dropdowns?.roles}
//                             placeholder=""
//                           />
//                           <FormText color="danger">
//                             {errors.rol && (
//                               <IntlMessages id="forms.inputRequired" />
//                             )}
//                           </FormText>
//                         </FormGroup>
//                       </Colxx>
//                       <Colxx sm={1}>
//                         <Button
//                           color="primary"
//                           onClick={handleSubmit(onSubmit)}
//                         >
//                           <IntlMessages id="forms.submit" />
//                         </Button>
//                       </Colxx>
//                       <Colxx sm={1}>
//                         <Button color="danger" onClick={onCancel}>
//                           <IntlMessages id="forms.cancel" />
//                         </Button>
//                       </Colxx>
//                     </>
//                   )}
//                 </FormGroup>
//               </Form>
//             </CardBody>
//           </Card>
//         </Colxx>
//       </Row>
//       {id ? (
//         <CreateEditAuditInformation
//           auditInfo={auditInfo}
//           loading={loading}
//           loaderIcon={loaderIcon}
//           loaderColor={loaderColor}
//         />
//       ) : (
//         ''
//       )}
//     </>
//   );
// };

// const mapDispatchToProps = { ...userActions };

// const mapStateToProps = ({ LocaleReducer, LoginReducer, UserReducer }: any) => {
//   return { LoginReducer, LocaleReducer, UserReducer };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserCreateEdit);

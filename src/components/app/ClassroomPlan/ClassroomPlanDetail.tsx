import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, CardBody, Collapse, Row } from 'reactstrap';
import { COLUMN_LIST } from '../../../constants/AcademicAsignatureCourse/AcademicAsignatureCourseConstants';
import { createNotification } from '../../../helpers/Notification';
import * as classroomPlanActions from '../../../stores/actions/ClassroomPlanActions';
import * as academicAsignatureCourseActions from '../../../stores/actions/AcademicAsignatureCourseActions';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import EditorHTML from '../../common/EditorHTML';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';


const ClassroomPlanDetail = (props: any) => {
  const [academicPeriods, setAcademicPeriods] = useState(null);
  const [currentAcademicPeriod, setCurrentAcademicPeriod] = useState(null);
  const [cantStudents, setCantStudents] = useState(null);
  const [academicAsignatureCourse, setAcademicAsignatureCourse] = useState(null);
  const [classroomPlan, setClassroomPlan] = useState(null);
  const [showingIndex, setShowIndex] = useState(0);
  const [showInputDates, setShowInputDates] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const courseId = params.get('courseId');
  const id = params.get('id');

  const [data, setData] = useState(null);
  useEffect(() => {
    if(id) {
      getData(id);
    } else {
      props.saveNewClassroomPlan({academicAsignatureCourseId: academicAsignatureCourseId, campusId: props?.loginReducer?.campusId}).then((ncp: any) => {        
        getData(ncp);        
      });
    }
    props.getListAllAcademicPeriodOrder(props?.loginReducer?.schoolId).then((listData: any) => {
      setAcademicPeriods(listData.dataAcademicPeriods.edges);
    });
    props.dataCurrentAcademicPeriod(props?.loginReducer?.schoolId).then(async (period: any) => {
      await setCurrentAcademicPeriod(period);
    });
    props.dataCourse(courseId).then((course: any) => {
      setCantStudents(course?.data?.students?.length)
    });
    props.dataAcademicAsignatureCourse(academicAsignatureCourseId).then((resp: any) => {
      setAcademicAsignatureCourse(resp?.data);
    });
  }, []);

  const getData = async (idCp:string) => {
    props.dataClassroomPlan(idCp).then((cp: any) => {
      console.log(cp)
      setClassroomPlan(cp?.data);
    });
  };

  const saveNewClassroomPlan = async (data:any) => {
    props.updateClassroomPlan(data, classroomPlan?.id).then((resp: any) => {
      console.log(resp)
      setShowInputDates(false);
      getData(classroomPlan?.id);
    });
  };

  const goToChildren = async (url: string) => {
    navigate(url);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="font-bold mb-0 pb-0 d-flex align-items-center text-muted">
            <i className='simple-icon-book-open mr-2 '></i>
            <span>Plan de aula</span>
        </h1>     
        <div>
          {academicPeriods
            ? academicPeriods.map((item: any) => {
              return (
                <>
                  <button
                    // onClick={() => {
                    //   return filterByPeriod(item);
                    // }}
                    key={item?.node?.id}
                    className={`btn ${currentAcademicPeriod?.id === item?.node?.id
                      ? 'btn-info'
                      : 'btn-outline-info'
                      }`}
                    type="button"
                  >
                    <i className="iconsminds-pen-2"></i> {item?.node?.name}
                  </button>{'  '}
                </>
              );
            })
            : ''}
        </div>
      </div>
      
      <hr />
      <HeaderInfoAcademic asignature grade course modality goTitle="Regresar" academicAsignatureCourseId={academicAsignatureCourseId} />

      <hr />
      <Row>
        <Colxx lg="4" xl="4" className="mb-4 rounded">
          <Card>
            <CardBody className="text-center p-3 d-flex align-items-center justify-content-around">
              <i className={'iconsminds-business-man-woman lead'} />
              <div>
                <h3 className="card-text text-info font-weight-bold mb-0 mt-2">
                  {academicAsignatureCourse?.teacher?.user?.name}  {academicAsignatureCourse?.teacher?.user?.lastName}
                </h3>
                <p className="font-weight-semibold text-center mb-0">Docente</p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="4" xl="4" className="mb-4 rounded">
          <Card>
            <CardBody className="text-center p-3 d-flex align-items-center justify-content-around">
              <i className={'iconsminds-student-male-female lead'} />
              <div>
                <h3 className="card-text text-info font-weight-bold mb-0 mt-2">
                  {cantStudents}
                </h3>
                <p className="font-weight-semibold text-center mb-0">Cantidad de estudiantes</p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="4" xl="4" className="mb-4 rounded">
          <Card>
            <CardBody className="text-center p-3 d-flex align-items-center justify-content-around">
              <i className={'iconsminds-calendar-4 lead'} />
              <i onClick={() => setShowInputDates(!showInputDates)} className={'simple-icon-pencil text-green ml-2'} />
              <div className='p-3'>
                { !showInputDates ?
                <>
                <h3 className="card-text text-info font-weight-bold mb-0 mt-2">
                   {moment(classroomPlan?.startDate).format('YYYY-MM-DD')} - {moment(classroomPlan?.endDate).format('YYYY-MM-DD')}
                </h3>
                   <p className="text-center font-weight-semibold mb-0">Fecha de inicio y fin</p>
                   </>
                : <>
                  <div className=''>
                  <ReactDatePicker
                            selected={startDate}
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(dates) => {
                              const [start, end] = dates;
                              setStartDate(start);
                              setEndDate(end);
                            }}
                          />
                      <Button color="green" onClick={(dates) => {
                              let obj = {
                                startDate: startDate, 
                                endDate: endDate 
                                };
                              saveNewClassroomPlan(obj);
                            }} className='btn-xs ml-2 mt-2'>
                        Guardar
                      </Button>
                  </div>
                </>
                }
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="12" xl="12" className="mb-4 rounded">
          <Card>
            <CardBody className="p-2 pl-4">             
              <p className="font-weight-semibold mb-1 mt-1">Enfoque y/o modelo pedagógico institucional: {classroomPlan?.campus?.school?.pedagogicalModel}</p>           
              <p className="font-weight-semibold mb-1">Modelo educativo: {classroomPlan?.campus?.school?.educationalModel}</p>           
              <p className="font-weight-semibold mb-1">Componente curricular: {classroomPlan?.campus?.school?.curricularComponent}</p>           
            </CardBody>
          </Card>
        </Colxx>     
        <Colxx lg="12" xl="12" className="mb-4 rounded">
          <Card>
            <CardBody className="p-3 pl-4">             
              <table className='w-100'>
                <tr>
                  <td>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                      <i className={'iconsminds-books lead'} />
                      <Button color="green" className='btn-xs ml-2 mt-2'>
                        Asociar
                      </Button>
                    </div>
                  </td>
                  <td className='text-center border-l-blue'><p className="font-weight-semibold mb-3">Aprendizajes</p></td>
                  <td className='text-center border-l-blue'><p className="font-weight-semibold mb-3">Competencias</p></td>
                  <td className='text-center border-l-blue'><p className="font-weight-semibold mb-3">DBA asociado</p></td>
                  <td className='text-center border-l-blue'><p className="font-weight-semibold mb-3">Estándar y/o orientación curricular asociado</p></td>
                </tr>
                </table>        
            </CardBody>
          </Card>
        </Colxx>            
      </Row>
      <Colxx lg="12" xl="12" className="rounded p-0">
      <Card className="d-flex mb-3" key={`faqItem_${1}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <Button
            color="link"
            className="card-body d-flex justify-content-between btn-empty btn-link list-item-heading text-left text-one"
            onClick={() => setShowIndex(1)}
            aria-expanded={showingIndex === 1}
          >
            Desempeños esperados
            <Button color="green" className='btn-xs ml-2'>
              Registrar
            </Button>
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 1}>
          <div className="card-body accordion-content pt-0">
            <table className='table table-bordered'>
              <tr>
                <td className='table-cell-info' colSpan={3}>Saber conocer - COGNITIVO</td>
                <td className='table-cell-info' colSpan={4}>Saber hacer - PROCEDIMENTAL</td>
                <td className='table-cell-info' colSpan={3}>Saber Ser – ACTITUDINAL</td>
              </tr>
              <tr>
                <td colSpan={3}>
                      <EditorHTML></EditorHTML>  
                </td>
                <td colSpan={4}>
                <EditorHTML></EditorHTML> 
                </td>
                <td colSpan={3}>
                <EditorHTML></EditorHTML> 
                </td>
              </tr>
            </table>
          </div>
        </Collapse>
      </Card>

      <Card className="d-flex mb-3" key={`faqItem_${0}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <Button
            color="link"
            className="card-body d-flex justify-content-between btn-empty btn-link list-item-heading text-left text-one"
            onClick={() => setShowIndex(0)}
            aria-expanded={showingIndex === 0}
          >
            Recursos educativos disponibles para el aprendizaje            
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 0}>
          <div className="card-body accordion-content pt-0">
          </div>
        </Collapse>
      </Card>

      <Card className="d-flex mb-3" key={`faqItem_${2}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <Button
            color="link"
            className="card-body d-flex justify-content-between btn-empty btn-link list-item-heading text-left text-one"
            onClick={() => setShowIndex(2)}
            aria-expanded={showingIndex === 2}
          >
            Ruta Metodológica para el aprendizaje  
            <Button color="green" className='btn-xs ml-2'>
              Nuevo momento
            </Button>          
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 2}>
          <div className="card-body accordion-content pt-0">
            <table className='table table-bordered'>
              <tr>
                <td className='table-cell-info' colSpan={3}>
                <div className='d-flex justify-content-between align-items-center'>
                    <span>Exploración (Saberes Previos-indagación)</span>
                    <Button color="danger" className='btn-xs ml-2 d-flex align-items-center'>
                      <i className='simple-icon-trash'></i>
                    </Button> 
                  </div>
                </td>
                <td className='table-cell-info' colSpan={4}>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span>Estructuración (Conceptualización y Práctica)</span>
                    <Button color="danger" className='btn-xs ml-2 d-flex align-items-center'>
                      <i className='simple-icon-trash'></i>
                    </Button>
                  </div>
                </td>
                <td className='table-cell-info' colSpan={3}>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span>Transferencia (aplicación-Valoración)</span>
                    <Button color="danger" className='btn-xs ml-2 d-flex align-items-center'>
                      <i className='simple-icon-trash'></i>
                    </Button>
                    </div>
                </td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td colSpan={4}></td>
                <td colSpan={3}></td>
              </tr>
            </table>
          </div>
        </Collapse>
      </Card>

      <Card className="d-flex mb-3" key={`faqItem_${3}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <Button
            color="link"
            className="card-body d-flex justify-content-between btn-empty btn-link list-item-heading text-left text-one"
            onClick={() => setShowIndex(3)}
            aria-expanded={showingIndex === 3}
          >
            Estrategias de valoración de los Desempeños           
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 3}>
          <div className="card-body accordion-content pt-0">
            <table className='table table-bordered'>
              <tr>
                <td className='table-cell-info' colSpan={3}>Saber conocer - COGNITIVO </td>
                <td className='table-cell-info' colSpan={4}>Saber hacer - PROCEDIMENTAL</td>
                <td className='table-cell-info' colSpan={3}>Saber Ser – ACTITUDINAL</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td colSpan={4}></td>
                <td colSpan={3}></td>
              </tr>
              <tr>
                <td className='table-cell-info' colSpan={3}>Actividades pedagógicas Transversales</td>
                <td colSpan={7}></td>
              </tr>
            </table>
          </div>
        </Collapse>
      </Card>

      <Card className="d-flex mb-3" key={`faqItem_${4}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <Button
            color="link"
            className="card-body d-flex justify-content-between btn-empty btn-link list-item-heading text-left text-one"
            onClick={() => setShowIndex(4)}
            aria-expanded={showingIndex === 4}
          >
            Actividades de valoración de los Desempeños
            <Button color="green" className='btn-xs ml-2'>
              Agregar actividad
            </Button>
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 4}>
          <div className="card-body accordion-content pt-0">
            <table className='table table-bordered'>
              <tr>
                <td className='table-cell-info' colSpan={3}>Saber conocer - COGNITIVO </td>
                <td className='table-cell-info' colSpan={4}>Saber hacer - PROCEDIMENTAL</td>
                <td className='table-cell-info' colSpan={3}>Saber Ser – ACTITUDINAL</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td colSpan={4}></td>
                <td colSpan={3}></td>
              </tr>             
            </table>
          </div>
        </Collapse>
      </Card>
      </Colxx>
    </>
  );
};
const mapDispatchToProps = { ...classroomPlanActions, ...academicPeriodActions, ...courseActions, ...academicAsignatureCourseActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPlanDetail);

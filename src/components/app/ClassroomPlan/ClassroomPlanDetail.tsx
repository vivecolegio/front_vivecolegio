import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, CardBody, Collapse, Row } from 'reactstrap';
import { COLUMN_LIST } from '../../../constants/AcademicAsignatureCourse/AcademicAsignatureCourseConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicAsignatureCourseActions from '../../../stores/actions/AcademicAsignatureCourseActions';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import EditorHTML from '../../common/EditorHTML';


const ClassroomPlanDetail = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [academicPeriods, setAcademicPeriods] = useState(null);
  const [currentAcademicPeriod, setCurrentAcademicPeriod] = useState(null);
  const [cantStudents, setCantStudents] = useState(null);
  const [academicAsignatureCourse, setAcademicAsignatureCourse] = useState(null);
  const [showingIndex, setShowIndex] = useState(0);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const courseId = params.get('courseId');

  const [data, setData] = useState(null);
  useEffect(() => {
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

  const getDataTable = async () => {
    props
      .getListAllAcademicAsignatureCourse(props?.loginReducer?.campusId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.course_format = c.node.course ? c.node.course.name : '';
            c.node.grade_format = c?.node?.course?.academicGrade?.name;
            c.node.asignature_format = c.node.academicAsignature
              ? c.node.academicAsignature.name
              : '';
            return c;
          }),
        );
      });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    console.log(dataForm);
    if (data === null) {
      await props.saveNewAcademicAsignatureCourse(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAcademicAsignatureCourse(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAcademicAsignatureCourse(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAcademicAsignatureCourse(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteAcademicAsignatureCourse(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteUser(item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.changeActiveUser(!item.active, item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const additionalFunction = async (item: any, btn: any) => {
    switch (btn?.action) {
      case 'goToChildren':
        goToChildren(
          `/standardAcademic?gradeId=${item?.course?.academicGradeId}&asignatureId=${item.academicAsignatureId}&academicAsignatureCourseId=${item?.id}`,
        );
        break;
      default:
        break;
    }
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
              <div>
                <h3 className="card-text text-info font-weight-bold mb-0 mt-2">
                  28/04/2022 - 01/05/2022
                </h3>
                <p className="text-center font-weight-semibold mb-0">Fecha de inicio y fin</p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="12" xl="12" className="mb-4 rounded">
          <Card>
            <CardBody className="p-2 pl-4">             
              <p className="font-weight-semibold mb-1 mt-1">Enfoque y/o modelo pedagógico institucional:</p>           
              <p className="font-weight-semibold mb-1">Modelo educativo:</p>           
              <p className="font-weight-semibold mb-1">Componente curricular:</p>           
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
          </Button>
        </div>
        <Collapse isOpen={showingIndex === 2}>
          <div className="card-body accordion-content pt-0">
            <table className='table table-bordered'>
              <tr>
                <td className='table-cell-info' colSpan={3}>Exploración (Saberes Previos-indagación)</td>
                <td className='table-cell-info' colSpan={4}>Estructuración (Conceptualización y Práctica)</td>
                <td className='table-cell-info' colSpan={3}>Transferencia (aplicación-Valoración)</td>
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
const mapDispatchToProps = { ...academicAsignatureCourseActions, ...academicPeriodActions, ...courseActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPlanDetail);

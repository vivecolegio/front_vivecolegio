import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import * as academicAsignatureCourseActions from '../../../stores/actions/AcademicAsignatureCourseActions';
import * as studentActions from '../../../stores/actions/StudentActions';
import * as learningActions from '../../../stores/actions/LearningActions';
import * as experienceLearningActions from '../../../stores/actions/ExperienceLearningActions';

const HeaderInfoAcademic = (props: any) => {
  const [data, setData] = useState(null);
  const [studentData, setStudent] = useState(null);
  const [experienceLearningData, setExperienceLearning] = useState(null);
  const [learningData, setLearning] = useState(null);
  const { asignature, asignatureGeneral, grade, course, modality, cicle, experienceLearnig, learning, student, academicAsignatureCourseId, experienceLearnigId, learningId, studentId, goTitle } = props;

  let navigate = useNavigate();

  useEffect(() => {
    viewData();
  }, []);

  const viewData = async () => {
    await props.dataAcademicAsignatureCourse(academicAsignatureCourseId).then((resp: any) => {
      setData(resp?.data)
    });
    if(studentId) {
      await props.dataStudent(studentId).then((resp: any) => {
        setStudent(resp?.data);
      });
    }
    if(experienceLearnigId) {
      await props.dataExperienceLearning(experienceLearnigId).then((resp: any) => {
        setExperienceLearning(resp?.data)
      });
    }
    if(learningId) {
      await props.dataLearning(learningId).then((resp: any) => {
        setLearning(resp?.data);
      });
    }
  };

  const goTo = async () => {
    navigate(-1);
  };

  return (
    <>
     <div className="mt-4">
          <div className="d-flex flex-row">
            {asignature ? 
            <span className="mb-0 text-muted mr-4 border-b-info">
              <span>Área:</span> <h2 className="text-info font-bold">{data?.academicAsignature?.name}</h2>
            </span>
            : ''}
            {asignatureGeneral ? 
            <span className="mb-0 text-muted mr-4 border-b-info">
              <span>Área:</span> <h2 className="text-info font-bold">{data?.academicAsignature?.generalAcademicAsignature?.name}</h2>
            </span>
            : ''}
            {cicle ? 
            <span className="mb-0 text-muted border-b-green">
                      Ciclo académico: <h2 className="text-green font-bold">{data?.course?.academicGrade?.generalAcademicCycle?.name}</h2>
                    </span>
                    : ''}
            {grade ? 
            <span className="mb-0 text-muted mr-4 border-b-green">
              Grado: <h2 className="text-green font-bold">{data?.course?.academicGrade?.name}</h2>
            </span>
            : ''}
            { course ? 
            <span className="mb-0 text-muted mr-4 border-b-orange">
              Grupo: <h2 className="text-orange font-bold">{data?.course?.name}</h2>
            </span>
            : ''}
            { modality ? 
            <span className="mb-0 text-muted border-b-warning">
              Jornada: <h2 className="text-warning font-bold">{data?.course?.academicDay?.name}</h2>
            </span>
            : ''}
          </div>
          {experienceLearnig ? 
          <div className="d-flex flex-row mt-4">
            <span className="mb-0 mr-4">
              <span className="text-muted">Experiencia de aprendizaje:</span>{' '}
              <h4 className="font-bold text-blue">{experienceLearningData?.title}</h4>
            </span>
          </div>
          : ''}
          {learning ? 
          <div className="d-flex flex-row mt-4">
            <span className="mb-0 mr-4">
              <span className="text-muted">Aprendizaje:</span>{' '}
              <h4 className="font-bold text-blue">{learningData?.statement}</h4>
            </span>
          </div>
          : ''}
          {student ? 
          <div className="d-flex flex-row">
            <span className="mb-0 mr-4">
              <span className="text-muted">Estudiante:</span>{' '}
              <h4 className="font-bold text-orange">{studentData?.code} - {studentData?.user?.name} {studentData?.user?.lastName}</h4>
            </span>
          </div>
          : ''}
          <p
            className="text-muted mt-2 d-flex align-items-center cursor-pointer"
            onClick={() => {
              return goTo();
            }}
          >
            <i className="simple-icon-arrow-left-circle mr-2"></i>
             {goTitle}
          </p>
        </div>
    </>
  );
};

const mapDispatchToProps = { ...academicAsignatureCourseActions, ...studentActions, ...experienceLearningActions, ...learningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfoAcademic);

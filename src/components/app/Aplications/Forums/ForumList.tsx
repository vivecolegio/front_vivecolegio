import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from '../../../common/CustomBootstrap';
import Pagination from '../../../common/Data/List/Pagination';

const ForumListApp = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setItems([
      {id:'foro-detalle',title: 'Foro de aprendizaje', date: '2022-03-17', category:'Asignatura', description:'Matemáticas'},
      {id:'foro-detalle',title: 'Foro de aprendizaje', date: '2022-06-17', category:'Asignatura', description:'Inglés'},
      {id:'foro-detalle',title: 'Foro de aprendizaje', date: '2022-10-17', category:'Asignatura', description:'Ciencias Naturales'},
    ]);
    setTotalPage(15);
    setIsLoading(false);
  }, [pageSize, currentPage]);

 

  return (
    <>
     <Row>
        <Colxx xxs="12">
          <p className='lead font-bold mb-0'>Mis foros</p>
          <p className='text-muted'>Sección de foros participativos</p>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className='rounded-card'>
            <CardBody>
              {!isLoading ? (
                items.map((item, i) => {
                  return (
                    <div
                      key={`item_${i}`}
                      className={`${items.length !== i + 1 ? 'mb-3' : ''}`}
                    >
                      <NavLink to={`/${item.id}`} className="w-40 w-sm-100">
                        <p className="list-item-heading mb-1 color-theme-1">
                          {item.title}
                        </p>
                        <p className="mb-1 text-muted text-small">
                          Asignatura | {item.description}
                        </p>
                        <p className="mb-4 text-small">{item.date}</p>
                      </NavLink>
                      {items.length !== i + 1 && <Separator />}
                    </div>
                  );
                })
              ) : (
                <div className="loading" />
              )}
            </CardBody>
          </Card>
        </Colxx>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i: any) => setCurrentPage(i)}
        />
      </Row>
    </>
  );
};
const mapDispatchToProps = {  };

const mapStateToProps = ({  }: any) => {
  return {  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumListApp);

import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import { Colxx } from '../../common/CustomBootstrap';

const SchoolSchedule = (props: any) => {
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // getUser();
    setLoading(false);
  }, [props?.data]);

  // const getUser = async () => {
  //   props.dataUser(props?.loginReducer?.userId).then((resp: any) => {
  //     setUser(resp.data);
  //     console.log(resp);
  //   });
  // };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
          </Colxx>
        </>
      ) : (
        <>
          <Colxx xxs="12" className="mb-5">
            <Card className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Horario</th>
                    <th className="text-center">Lunes</th>
                    <th className="text-center">Martes</th>
                    <th className="text-center">Miércoles</th>
                    <th className="text-center">Jueves</th>
                    <th className="text-center">Viernes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>8:00 am a 9:00 am</td>
                    <td>
                      <h5>
                        <span className="w-100 badge badge-secondary">Matemáticas</span>
                      </h5>
                    </td>
                    <td>
                      <h5>
                        <span className="w-100 badge badge-primary">Español</span>
                      </h5>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>9:00 am a 10:00 am</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10:00 am a 11:00 am</td>
                    <td></td>
                    <td>
                      <h5>
                        <span className="w-100 badge badge-danger">Español</span>
                      </h5>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>11:00 am a 12:00 am</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Colxx>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolSchedule);

import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import { Colxx } from '../../common/CustomBootstrap';

const OfficeSchedule = (props: any) => {
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
                    <th className="text-center">Dia</th>
                    <th className="text-center">Inicio</th>
                    <th className="text-center">Fin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">Lunes</td>
                    <td className="text-center">                   
                        8:00 am
                    </td>
                    <td className="text-center">
                        10:00 am
                    </td>                   
                  </tr>
                  <tr>
                    <td className="text-center">Martes</td>
                    <td className="text-center">
                        8:00 am
                    </td>
                    <td className="text-center">
                        10:00 am
                    </td>    
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

export default connect(mapStateToProps, mapDispatchToProps)(OfficeSchedule);

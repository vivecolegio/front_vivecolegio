import React from 'react';
import { useClearCache } from 'react-clear-cache';
import { connect } from 'react-redux';
import { Colxx } from './common/CustomBootstrap';
import { Loader } from './common/Loader';

const Home = () => {
  const { isLatestVersion, emptyCacheStorage, latestVersion } = useClearCache();
  return (
    <>
      <Colxx sm={12} className="d-flex justify-content-center">
        <Loader />
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              emptyCacheStorage();
            }}
          >
            Update version {latestVersion}
          </a>
        </p>
      </Colxx>
    </>
  );
};
const mapDispatchToProps = {};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

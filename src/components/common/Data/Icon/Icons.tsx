/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../CustomBootstrap';
import  { iconsmind }  from "./iconsJson";


const IconGroup = ({ iconSet, setIndex } : any) => {
  return (
    <div className="mb-5">
      <h6 className="mb-4">  <IntlMessages id={iconSet.title} /></h6>
      {iconSet.icons.map((icon:any, index:any) => {
        return (
          <div className="glyph" key={setIndex + index} >
            <div className={`glyph-icon ${icon}`} />
            <div className="class-name">{icon}</div>
          </div>
        );
      })}
      <div className="clearfix" />
    </div>
  );
};

const IconsComponent = ({ modalOpen, toggleModal }: any) => {
  
  return (
    <>
      <Modal       
       isOpen={modalOpen}
       toggle={toggleModal}
       size="lg"
       >
        <ModalHeader> 
          <IntlMessages id="forms.icons" />
          <br/>
          <small><IntlMessages id="forms.clickToSelect" /></small>
          </ModalHeader>
        <ModalBody>
        <Row>
        <Colxx xxs="12">      
          <Card className="mb-4">
            <CardBody>             
              <div className="mind-icons">
                {iconsmind.map((iconSet, setIndex) => {
                  return (
                    <IconGroup                    
                      iconSet={iconSet}
                      setIndex={setIndex}
                      key={setIndex}
                    />
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>     
        </ModalBody>
        <ModalFooter>         
          <Button color="secondary" onClick={toggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapDispatchToProps = { };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IconsComponent);

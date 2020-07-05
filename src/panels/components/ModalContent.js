import React, { useState } from "react";
import {
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Title
} from "@vkontakte/vkui";

const ADD_MODAL = "add-modal";

const ModalContent = (props) => {
  const {currentModal, setCurrentModal} = useState(null);

  return (
    <ModalRoot
      activeModal={currentModal}
      onClose={() => {
        setCurrentModal(null);
      }}
    >
      <ModalPage
        id={ADD_MODAL}
        header={<ModalPageHeader><Title level="2">Добавить элемент</Title></ModalPageHeader>}
        dynamicContentHeight
      >
        <p>
          hello
        </p>
        {props.children}
      </ModalPage>
    </ModalRoot>
  );
};

export default ModalContent;

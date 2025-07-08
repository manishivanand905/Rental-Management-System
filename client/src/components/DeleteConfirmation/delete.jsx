import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
  Button,
  ButtonGroup,
  DeleteMessage,
} from "./deleteStyles";

const DeleteConfirmation = ({ tenant, onConfirm, onCancel }) => {
  return (
    <Modal>
      <ModalOverlay onClick={onCancel} />
      <ModalContent className="scale-in" style={{ maxWidth: "400px" }}>
        <ModalHeader>
          <ModalTitle>Delete Tenant</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <DeleteMessage>
            Are you sure you want to delete tenant "{tenant.name}" (Room No:{" "}
            {tenant.roomNo})? This action cannot be undone.
          </DeleteMessage>
        </ModalBody>

        <ModalActions>
          <ButtonGroup>
            <Button type="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="error" onClick={onConfirm}>
              Confirm
            </Button>
          </ButtonGroup>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmation;

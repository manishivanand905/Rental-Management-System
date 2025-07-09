import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Required,
  FormGrid, // Added FormGrid
} from "./tenantFormStyles";

const TenantForm = ({ tenant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    roomNo: "",
    name: "",
    phoneNo: "",
    occupation: "",
    aadharCard: "",
    rentAmount: "",
    startDate: "",
    vacateDate: "",
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        roomNo: tenant.roomNo || "",
        name: tenant.name || "",
        phoneNo: tenant.phoneNo || "",
        occupation: tenant.occupation || "",
        aadharCard: tenant.aadharCard || "",
        rentAmount: tenant.rentAmount || "",
        startDate: tenant.startDate || "",
        vacateDate: tenant.vacateDate || "",
      });
    }
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.roomNo ||
      !formData.name ||
      !formData.phoneNo ||
      !formData.rentAmount ||
      !formData.startDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const tenantData = {
      ...formData,
      rentAmount: parseInt(formData.rentAmount),
      _id: tenant ? tenant._id : undefined,
    };

    onSave(tenantData);
  };

  return (
    <Modal>
      <ModalOverlay onClick={onCancel} />
      <ModalContent className="scale-in">
        <ModalHeader>
          <ModalTitle>{tenant ? "Edit Tenant" : "Add New Tenant"}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>
                  Room No. <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleChange}
                  placeholder="Enter room number"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Name <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Phone No. <Required>*</Required>
                </Label>
                <Input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Occupation/Company</Label>
                <Input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                />
              </FormGroup>

              <FormGroup>
                <Label>Aadhar Card</Label>
                <Input
                  type="text"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Rent Amount <Required>*</Required>
                </Label>
                <Input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  placeholder="Enter rent amount"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Start Date <Required>*</Required>
                </Label>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Vacate Date (Optional)</Label>
                <Input
                  type="date"
                  name="vacateDate"
                  value={formData.vacateDate}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormGrid>
          </form>
        </ModalBody>

        <ModalActions>
          <ButtonGroup>
            <Button type="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              {tenant ? "Update Tenant" : "Add Tenant"}
            </Button>
          </ButtonGroup>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default TenantForm;

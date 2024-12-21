import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../UI/Modal";
import classes from './AddProduct.module.css';
import Button from '@mui/material/Button';

// Componente stilizate cu Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #00A082;
  font-family: "Arial", sans-serif;
`;

const FormWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #5a67d8;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  resize: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #5a67d8;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    border-color: #5a67d8;
  }
`;

const Buttons = styled.button`
  width: 100%;
  background-color: #75571d;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFC244;
  }
`;

const ProductForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Product successfully added!");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert availability to boolean
    const formDataToSubmit = {
      ...formData,
      availability: formData.availability === "true",
    };

    // Salvare date in baza de date
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/food.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        });

        if (response.ok) {
          setFormData({
            name: "",
            description: "",
            price: "",
            availability: "",
          });
          setIsModalOpen(true);
          setSuccessMessage("Product successfully added!");
        } else {
            throw new Error("Something went wrong!");
        }
      } catch (error) {
        setIsModalOpen(true);
        setSuccessMessage(error.message);
      }
    }

    fetchData();
    
  };

  return (
    <>
     { (isModalOpen) && 
    <div className={classes.overlayConainer}>      
      <Modal > 
        <div className={classes.modalContent}>
          {successMessage}       
            <Button 
            style={{ backgroundColor: '#FFC244' }}
            variant="contained"  
            onClick={() => setIsModalOpen(false)}> 
                close
            </Button>
          </div>
       </Modal>
      </div>}
    <Container>
      <FormWrapper>
        <Title>Create a New Product</Title>
        <form onSubmit={handleSubmit}>
          {/* Input Nume */}
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Input Descriere */}
          <Textarea
            name="description"
            rows="4"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></Textarea>

          {/* Input Preț */}
          <Input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />

        {/* Input Disponibilitate */}
        <Select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
        >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
        </Select>
          <Buttons type="submit">Create Product</Buttons>
        </form>
      </FormWrapper>
    </Container>
    </>

  );
};

export default ProductForm;

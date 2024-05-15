import React, { useState } from 'react';

interface FormData {
  name: string;
  age: string;
  married: boolean;
  dob: string;
}

const FormComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    married: false,
    dob: '',
  });
  const [errors, setErrors] = useState<{
    name: string;
    age: string;
    married: string;
    dob: string;
  }>({
    name: '',
    age: '',
    married: '',
    dob: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Reset errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (formData.name.length < 5 || formData.name.length > 50) {
      newErrors.name = 'Name must be between 5 and 50 characters';
      formIsValid = false;
    }

    // Validate age
    const age = parseInt(formData.age);
    const isMarried = formData.married;
    if (isNaN(age) || age < 1 || age > 150) {
      newErrors.age = 'Age must be a number between 1 and 150';
      formIsValid = false;
      
    }  else if ( isMarried && age <= 18) {
      // Validate married status (mandatory for ages above 18)  
        newErrors.married = 'Married status is mandatory for ages above 18';
        formIsValid = false;
    }
 

    // Validate date of birth (valid date and coherent with age)
    const dob = new Date(formData.dob);
    if (isNaN(dob.getTime())) {
      newErrors.dob = 'Invalid date of birth';
      formIsValid = false;
    } else {
      const today = new Date();
      const ageFromDate = today.getFullYear() - dob.getFullYear();
      if (ageFromDate !== age) {
        newErrors.dob = 'Date of birth does not match age';
        formIsValid = false;
      }
    }

    // Update errors state
    setErrors(newErrors);

    // If form is valid, submit the data
    if (formIsValid) {
      // Your submission logic here
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {submitted ? (
        <div className="px-4 py-3 mb-8 bg-green-100 text-green-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Submitted Details:</h2>
          <p>Name: {formData.name}</p>
          <p>Age: {formData.age}</p>
          <p>Married: {formData.married ? 'Yes' : 'No'}</p>
          <p>Date of Birth: {formData.dob}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          {/* Age field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </label>
            {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
          </div>

          {/* Married field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="married">
              Married:&nbsp;
              <input
                className="mr-2 leading-tight"
                id="married"
                type="checkbox"
                name="married"
                checked={formData.married}
                onChange={handleChange}
              />
              <span className="text-sm">Yes, I am married</span>
            </label>
            {errors.married && <p className="text-red-500 text-xs italic">{errors.married}</p>}
          </div>

          {/* Date of Birth field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>
            {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit 
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormComponent;

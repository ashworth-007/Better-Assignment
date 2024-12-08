import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const getPasswordStrength = (password) => {
  if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(password)) {
    return { strength: 'Strong', color: 'bg-green-500' };
  } else if (/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
    return { strength: 'Medium', color: 'bg-yellow-500' };
  } else if (/^.{6,}$/.test(password)) {
    return { strength: 'Weak', color: 'bg-red-500' };
  }
  return { strength: 'Too Short', color: 'bg-gray-300' };
};

const SignUpForm = () => {
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 'Too Short',
    color: 'bg-gray-300',
  });

  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
    formik.setFieldValue('password', password);
  };

  const handleAlertDismiss = () => {
    setAlert({ ...alert, visible: false });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      // Save email and password to localStorage
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPassword', values.password); // Storing password as plain text for simplicity

      // Simulate sign-up success
      setAlert({
        message: 'Sign Up Successful!',
        type: 'success',
        visible: true,
      });
    },
  });

  return (
    <div className="relative">
      {/* Alert */}
      {alert.visible && (
        <div
          className={`absolute top-0 left-0 right-0 bg-${alert.type === 'success' ? 'green' : 'red'}-500 text-white p-4 flex justify-between items-center`}
        >
          <span>{alert.message}</span>
          <button
            onClick={handleAlertDismiss}
            className="bg-transparent text-white font-bold"
          >
            &times;
          </button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold">Sign Up</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handlePasswordChange}
            value={formik.values.password}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${passwordStrength.color} transition-all duration-300`}
            />
          </div>
          <p className="mt-1 text-sm">{passwordStrength.strength}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

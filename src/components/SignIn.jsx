import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignInForm = () => {
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (storedEmail === values.email && storedPassword === values.password) {
        setAlert({
          message: 'Login Successful!',
          type: 'success',
          visible: true,
        });
      } else {
        setAlert({
          message: 'Invalid email or password.',
          type: 'error',
          visible: true,
        });
      }
    },
  });

  const handleAlertDismiss = () => {
    setAlert({ ...alert, visible: false });
  };

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
        <h2 className="text-2xl font-bold">Sign In</h2>

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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

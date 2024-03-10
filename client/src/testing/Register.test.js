import React from 'react';
import { render, screen, fireEvent, waitFor, getAllByLabelText } from '@testing-library/react';
import Register from "../page/Register";
import { Route, BrowserRouter as Router } from "react-router-dom";


jest.mock('axios');

describe('Register Component', () => {
    test('renders without crashing', () => {
        render(
            <Router><Register /></Router>
        );
    });

    test('displays required fields', () => {
        const { getByText } = render(<Router><Register /></Router>);
        expect(getByText('Email')).toBeInTheDocument();
        expect(getByText('เบอร์โทรศัพท์')).toBeInTheDocument();
        expect(getByText('ชื่อ')).toBeInTheDocument();
        expect(getByText('นามสกุล')).toBeInTheDocument();
        expect(getByText('รหัสผ่าน')).toBeInTheDocument();
        expect(getByText('ยืนยันรหัสผ่าน')).toBeInTheDocument();
        expect(getByText(/ยอมรับ/)).toBeInTheDocument();
        expect(getByText(/เงื่อนไข/)).toBeInTheDocument();
        expect(getByText(/บัญชี/)).toBeInTheDocument();

    });

    test('change location to login page', () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        const loginLink = screen.getByTestId('login-link');
        expect(loginLink).toBeInTheDocument();
        fireEvent.click(loginLink);
        expect(window.location.pathname).toBe("/login");

    });



    test('if password less than 6 character show the error message', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const passwordInput = screen.getByTestId('password-in');
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        const errorMessage = screen.getByText('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        expect(errorMessage).toBeInTheDocument();
    });


    test('if password equal or more than 6 character do not show error massage', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const passwordInput = screen.getByTestId('password-in');
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        const errorMessage = screen.queryByText('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('displays toast message when firstname is less than 3 characters', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        const firstnameInput = screen.getByTestId('name-in');
        fireEvent.change(firstnameInput, { target: { value: 'ab' } });
        fireEvent.click(screen.getByTestId('regis-button'));
        await waitFor(() => {
            expect(screen.getByText('กรุณาตั้งชื่ออย่างน้อย 3 ตัวอักษร')).toBeInTheDocument();
        });
    });

    test('when you key the phone number field, the message "เบอร์โทรศัพท์" must disappear', () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        const phoneInput = screen.getByTestId('phone-in');
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        expect(screen.queryByText('เบอร์โทรศัพท์')).toBeNull();
    });

    test('when the phone number field is empty, the message "เบอร์โทรศัพท์" must appear', () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        const phoneInput = screen.getByTestId('phone-in');
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        expect(screen.queryByText('เบอร์โทรศัพท์')).toBeNull();
    });




});
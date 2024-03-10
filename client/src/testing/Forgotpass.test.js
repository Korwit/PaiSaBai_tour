import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Forgotpass from './Forgotpass';

jest.mock('axios');

describe('Forgotpass Component', () => {
  test('renders the component', () => {
    render(<Forgotpass />);
    expect(screen.getByText('ตั้งรหัสผ่านใหม่')).toBeInTheDocument();
  });

  test('handles password change', () => {
    render(<Forgotpass />);
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    expect(passwordInput.value).toBe('newPassword');
  });

  test('handles password confirmation change', () => {
    render(<Forgotpass />);
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(passwordConfirmInput, { target: { value: 'newPassword' } });

    expect(passwordConfirmInput.value).toBe('newPassword');
  });

  test('toggles password visibility', () => {
    render(<Forgotpass />);
    const toggleButton = screen.getByAltText('Show');

    fireEvent.click(toggleButton);
    expect(screen.getByPlaceholderText('Password').type).toBe('text');
  });

  test('handles form submission with matching passwords', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<Forgotpass />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('ยืนยัน');

    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'newPassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(screen.getByText('ตั้งรหัสผ่านใหม่')).toBeInTheDocument();
  });

  test('handles form submission with non-matching passwords', () => {
    render(<Forgotpass />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByText('ยืนยัน');

    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'wrongPassword' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('รหัสผ่านทั้งสองช่องไม่ตรงกัน กรุณาพิมพ์ใหม่')).toBeInTheDocument();
  });
});

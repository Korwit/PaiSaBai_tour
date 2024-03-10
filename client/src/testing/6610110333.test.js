import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Payment from '../src/page/Payment.js';

describe('Payment Page', () => {
  it('should upload an image successfully', async () => {
    render(<Payment />);

    const uploadButton = screen.getByText('เลือกไฟล์');
    expect(uploadButton).toBeInTheDocument();

    const jpegImage = new File(['(binary content)'], 'test-image.jpg', { type: 'image/jpeg' });

    const inputElement = screen.getByLabelText('Image Upload');
    userEvent.upload(inputElement, jpegImage);

    await waitFor(() => {
      const uploadedImage = screen.getByAltText(imgfile);
      expect(uploadedImage).toBeInTheDocument();
      expect(uploadedImage.src).toContain('test-image.jpg');
    });
  });
});

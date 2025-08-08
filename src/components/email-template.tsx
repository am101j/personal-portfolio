
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6' }}>
    <h1 style={{ fontSize: '24px', color: '#333' }}>New Message from Portfolio Contact Form</h1>
    <p>You have received a new message from your portfolio website.</p>
    <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
    <h2 style={{ fontSize: '20px', color: '#555' }}>Message Details:</h2>
    <ul>
      <li><strong>From:</strong> {name}</li>
      <li><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
    </ul>
    <h3 style={{ fontSize: '18px', color: '#555' }}>Message:</h3>
    <div style={{
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '15px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    }}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', marginTop: '20px' }} />
    <p style={{ fontSize: '12px', color: '#999' }}>This email was sent from your personal portfolio website.</p>
  </div>
);

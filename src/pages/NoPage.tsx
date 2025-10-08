import React from 'react';

const NoPage: React.FC = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        color: '#333'
    }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v7c0 5 5 8 10 8s10-3 10-8V7l-10-5z" stroke="#888" strokeWidth="2" fill="#e0e0e0"/>
            <path d="M9 12h6M12 9v6" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h1 style={{ marginTop: 24, fontSize: '2rem' }}>Work Under Development</h1>
        <p style={{ marginTop: 12, fontSize: '1.1rem', color: '#666', maxWidth: 400, textAlign: 'center' }}>
            This page is currently being built. Please check back soon!
        </p>
    </div>
);

export default NoPage;
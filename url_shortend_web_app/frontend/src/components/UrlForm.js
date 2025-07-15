import React, { useState } from 'react';
import axios from 'axios';

function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validityMinutes, setValidityMinutes] = useState(30);
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/url/shorten', {
      originalUrl,
      customCode,
      validityMinutes
    });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} placeholder="Original URL" required />
      <input type="text" value={customCode} onChange={(e) => setCustomCode(e.target.value)} placeholder="Custom Code (optional)" />
      <input type="number" value={validityMinutes} onChange={(e) => setValidityMinutes(e.target.value)} placeholder="Validity (min)" />
      <button type="submit">Shorten</button>
      {shortUrl && <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
    </form>
  );
}

export default UrlForm;

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('collection.json', 'utf8'));

let html = `<html><head><title>${data.collectionName}</title></head><body>`;
html += `<h1>${data.collectionName}</h1>`;

data.requests.forEach(req => {
    html += `<h2>${req.name}</h2>`;
    html += `<p><strong>Method:</strong> ${req.method}</p>`;
    html += `<p><strong>URL:</strong> ${req.url}</p>`;

    if (req.headers.length) {
        html += `<h3>Headers:</h3><ul>`;
        req.headers.forEach(h => {
            html += `<li><strong>${h.name}:</strong> ${h.value}</li>`;
        });
        html += `</ul>`;
    }

    if (req.body?.raw) {
        html += `<h3>Body:</h3><pre>${req.body.raw}</pre>`;
    }
});

html += `</body></html>`;

fs.writeFileSync('thunder-docs.html', html);
console.log('HTML documentation generated: thunder-docs.html');

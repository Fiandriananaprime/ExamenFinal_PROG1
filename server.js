import http from 'http';
import path from 'path';
import fs from 'fs';


const startServer = (port = 3000) => {
    const distDir = './dist';


    // Création du serveur
    const server = http.createServer((request, response) => {
        let filePath = request.url === '/' ? '/index.html' : request.url;
        const fullPath = path.join(process.cwd(), distDir, filePath);


        fs.readFile(fullPath, (err, content) => {
            if (err) {
                response.writeHead(404);
                response.end('Erreur 404 : Page introuvable !');
                return;
            }
            // Détection extension
            const ext = path.extname(fullPath);


            response.writeHead(200, { 'Content-Type': ext === '.html' ? 'text/html' : 'text/plain' });


             // Envoi du contenu
            response.end(content);
        });
    });


// Démarrage du serveur
    server.listen(port, () => {
        console.log(`🌍 Serveur démarré sur http://localhost:${port}`);
        console.log(`💡 Appuyez sur Ctrl+C pour arrêter.`);
    });
};

export default startServer;